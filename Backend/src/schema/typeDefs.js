const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar DateTime

  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    shifts: [Shift!]!
  }

  type Shift {
    id: ID!
    user: User!
    clockInTime: DateTime!
    clockInLat: Float!
    clockInLng: Float!
    clockInNote: String
    clockOutTime: DateTime
    clockOutLat: Float
    clockOutLng: Float
    clockOutNote: String
  }

  type DashboardStats {
    avgHoursPerDay: Float
    numClockInsToday: Int
    totalHoursLastWeek: [UserTotalHours!]!
  }

  type UserTotalHours {
    userId: ID!
    totalHours: Float
  }

  type Query {
    me: User
    shifts: [Shift!]!
    activeShifts: [Shift!]!
    dashboardStats: DashboardStats
  }

  type Mutation {
    register(username: String!, email: String!, password: String!, role: String!): User
    login(username: String!, password: String!): String
    clockIn(clockInLat: Float!, clockInLng: Float!, clockInNote: String): Shift
    clockOut(shiftId: ID!, clockOutLat: Float!, clockOutLng: Float!, clockOutNote: String): Shift
  }
`;

module.exports = typeDefs;
