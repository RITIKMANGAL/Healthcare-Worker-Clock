import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!, $role: String!) {
    register(username: $username, email: $email, password: $password, role: $role) {
      id
      username
      email
      role
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export const CLOCK_IN = gql`
  mutation ClockIn($clockInLat: Float!, $clockInLng: Float!, $clockInNote: String) {
    clockIn(clockInLat: $clockInLat, clockInLng: $clockInLng, clockInNote: $clockInNote) {
      id
      clockInTime
      clockInLat
      clockInLng
      clockInNote
      user {
        username
      }
    }
  }
`;

export const CLOCK_OUT = gql`
  mutation ClockOut($shiftId: ID!, $clockOutLat: Float!, $clockOutLng: Float!, $clockOutNote: String) {
    clockOut(shiftId: $shiftId, clockOutLat: $clockOutLat, clockOutLng: $clockOutLng, clockOutNote: $clockOutNote) {
      id
      clockInTime
      clockOutTime
      clockOutLat
      clockOutLng
      clockOutNote
      user {
        username
      }
    }
  }
`;
