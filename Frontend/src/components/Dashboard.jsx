import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_DASHBOARD_STATS, GET_ACTIVE_SHIFTS } from '../graphql/queries';
import { Card, Table, Spin, Alert } from 'antd';

function Dashboard() {
  const { loading, error, data } = useQuery(GET_DASHBOARD_STATS);
  const { loading: loadingShifts, error: errorShifts, data: shiftsData } = useQuery(GET_ACTIVE_SHIFTS);

  if (loading || loadingShifts) return <Spin />;
  if (error || errorShifts) return <Alert message="Error loading dashboard" type="error" />;

  const columns = [
    { title: 'Username', dataIndex: ['user', 'username'], key: 'username' },
    { title: 'Clock In Time', dataIndex: 'clockInTime', key: 'clockInTime', render: (time) => new Date(time).toLocaleTimeString() }
  ];

  return (
    <div>
      <h2>Dashboard</h2>
      <Card style={{ marginBottom: '20px' }}>
        <p>Average Hours Per Day: {data.dashboardStats.avgHoursPerDay}</p>
        <p>Number of Clock Ins Today: {data.dashboardStats.numClockInsToday}</p>
        <h3>Total Hours Last Week:</h3>
        <ul>
          {data.dashboardStats.totalHoursLastWeek.map((item) => (
            <li key={item.userId}>
              User {item.userId}: {item.totalHours} hours
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Active Shifts">
        <Table dataSource={shiftsData.activeShifts} columns={columns} rowKey="id" />
      </Card>
    </div>
  );
}

export default Dashboard;
