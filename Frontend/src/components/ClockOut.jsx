import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { CLOCK_OUT } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

function ClockOut() {
  const [form] = Form.useForm();
  const [clockOutMutation, { loading }] = useMutation(CLOCK_OUT, {
    onError: (error) => {
      notification.error({ message: 'Error clocking out', description: error.message });
    },
    onCompleted: () => {
      notification.success({ message: 'Clocked out successfully!' });
      form.resetFields();
    }
  });
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

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
      shiftId: values.shiftId,
      clockOutLat: location.lat,
      clockOutLng: location.lng,
      clockOutNote: values.clockOutNote || ''
    };
    clockOutMutation({ variables });
  };

  return (
    <div>
      <h2>Clock Out</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="shiftId" label="Shift ID" rules={[{ required: true, message: 'Please enter your shift ID' }]}>
          <Input placeholder="Enter your shift ID" />
        </Form.Item>
        <Form.Item label="Note (optional)" name="clockOutNote">
          <Input placeholder="Add a note (optional)" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Clock Out
          </Button>
        </Form.Item>
      </Form>
      <p>Your location: Latitude: {location.lat}, Longitude: {location.lng}</p>
    </div>
  );
}

export default ClockOut;
