import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { useAuth } from './context/AuthContext';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ClockIn from './components/ClockIn';
import ClockOut from './components/ClockOut';
import GeoNotifier from './components/GeoNotifier';
import './App.css';

const { Header, Content } = Layout;

function App() {
  const { user, logout } = useAuth();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const baseItems = [
    { key: 'dashboard', label: <Link to="/">Dashboard</Link> }
  ];

  const authItems = isAuthenticated || user ? [
    { key: 'clockin', label: <Link to="/clockin">Clock In</Link> },
    { key: 'clockout', label: <Link to="/clockout">Clock Out</Link> },
    { key: 'logout', label: <Button onClick={() => logout()} type="primary">Logout</Button> }
  ] : [
    { key: 'login', label: <Link to="/login">Login</Link> },
    { key: 'register', label: <Link to="/register">Register</Link> },
    { key: 'auth0', label: <Button onClick={() => loginWithRedirect()} type="primary">Login with Auth0</Button> }
  ];

  const menuItems = [...baseItems, ...authItems];

  return (
    <>
      {/* GeoNotifier monitors location changes in the background */}
      <GeoNotifier />
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" items={menuItems} />
        </Header>
        <Content style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clockin" element={<ClockIn />} />
            <Route path="/clockout" element={<ClockOut />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Content>
      </Layout>
    </>
  );
}

export default App;
