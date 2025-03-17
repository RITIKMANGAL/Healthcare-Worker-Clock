import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { CLOCK_IN } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

function ClockIn() {
  const [form] = Form.useForm();
  const [clockInMutation, { loading }] = useMutation(CLOCK_IN, {
    onError: (error) => {
      notification.error({ message: 'Error clocking in', description: error.message });
    },
    onCompleted: () => {
      notification.success({ message: 'Clocked in successfully!' });
      form.resetFields();
    }
  });
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  // Attempt to get real geolocation from the browser
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }),
        (error) => notification.error({ message: 'Geolocation error', description: error.message })
      );
    }
  }, []);

  const onFinish = (values) => {
    const variables = {
      clockInLat: location.lat,
      clockInLng: location.lng,
      clockInNote: values.clockInNote || ''
    };
    clockInMutation({ variables });
  };

  return (
    <div>
      <h2>Clock In</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Note (optional)" name="clockInNote">
          <Input placeholder="Add a note (optional)" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Clock In
          </Button>
        </Form.Item>
      </Form>
      <p>Your location: Latitude: {location.lat}, Longitude: {location.lng}</p>
    </div>
  );
}

export default ClockIn;
