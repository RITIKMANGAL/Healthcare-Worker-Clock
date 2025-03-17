const bcrypt = require('bcryptjs');
const { GraphQLScalarType, Kind } = require('graphql');
const prisma = require('../prismaClient');
const { generateToken } = require('../utils/auth');
require('dotenv').config();

// Define a fixed geofence (for example, the hospital's location)
const GEOFENCE_CENTER = { lat: 40.7128, lng: -74.0060 }; // Example: New York City coordinates
const ALLOWED_RADIUS_KM = 2; // 2 km perimeter

// Haversine formula to calculate distance between two lat/lng points in kilometers
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const deg2rad = (deg) => deg * (Math.PI / 180);
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const resolvers = {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'DateTime scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null;
    }
  }),
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      try {
        return await prisma.user.findUnique({
          where: { id: user.id },
          include: { shifts: true }
        });
      } catch (error) {
        throw new Error('Error fetching user data');
      }
    },
    shifts: async () => {
      try {
        return await prisma.shift.findMany({
          include: { user: true }
        });
      } catch (error) {
        throw new Error('Error fetching shifts');
      }
    },
    activeShifts: async () => {
      try {
        return await prisma.shift.findMany({
          where: { clockOutTime: null },
          include: { user: true }
        });
      } catch (error) {
        throw new Error('Error fetching active shifts');
      }
    },
    dashboardStats: async () => {
      // For simplicity, dummy implementation.
      return {
        avgHoursPerDay: 8.0,
        numClockInsToday: 10,
        totalHoursLastWeek: [
          { userId: "1", totalHours: 40 },
          { userId: "2", totalHours: 35 }
        ]
      };
    }
  },
  Mutation: {
    register: async (_, { username, email, password, role }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await prisma.user.create({
          data: { username, email, password: hashedPassword, role }
        });
      } catch (error) {
        throw new Error('Error registering user: ' + error.message);
      }
    },
    login: async (_, { username, password }) => {
      try {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) throw new Error('User not found');
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error('Incorrect password');
        return generateToken(user);
      } catch (error) {
        throw new Error('Login failed: ' + error.message);
      }
    },
    clockIn: async (_, { clockInLat, clockInLng, clockInNote }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      try {
        // Check if the user is within the allowed geofence
        const distance = getDistanceFromLatLonInKm(
          clockInLat,
          clockInLng,
          GEOFENCE_CENTER.lat,
          GEOFENCE_CENTER.lng
        );
        if (distance > ALLOWED_RADIUS_KM) {
          throw new Error('You are not within the allowed clock in perimeter.');
        }
        return await prisma.shift.create({
          data: {
            userId: user.id,
            clockInTime: new Date(),
            clockInLat,
            clockInLng,
            clockInNote
          },
          include: { user: true }
        });
      } catch (error) {
        throw new Error('Error during clock in: ' + error.message);
      }
    },
    clockOut: async (_, { shiftId, clockOutLat, clockOutLng, clockOutNote }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      try {
        const shift = await prisma.shift.findUnique({ where: { id: shiftId } });
        if (!shift || shift.userId !== user.id) {
          throw new Error('Shift not found or unauthorized');
        }
        return await prisma.shift.update({
          where: { id: shiftId },
          data: {
            clockOutTime: new Date(),
            clockOutLat,
            clockOutLng,
            clockOutNote
          },
          include: { user: true }
        });
      } catch (error) {
        throw new Error('Error during clock out: ' + error.message);
      }
    }
  }
};

module.exports = resolvers;
