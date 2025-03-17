import { gql } from '@apollo/client';

export const GET_DASHBOARD_STATS = gql`
  query GetDashboardStats {
    dashboardStats {
      avgHoursPerDay
      numClockInsToday
      totalHoursLastWeek {
        userId
        totalHours
      }
    }
  }
`;

export const GET_ACTIVE_SHIFTS = gql`
  query GetActiveShifts {
    activeShifts {
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
