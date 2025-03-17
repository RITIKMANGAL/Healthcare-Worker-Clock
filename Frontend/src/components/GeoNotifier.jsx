import { useEffect, useState } from 'react';
import { notification } from 'antd';

const GEOFENCE_CENTER = { lat: 40.7128, lng: -74.0060 }; // Example: New York City coordinates
const ALLOWED_RADIUS_KM = 2;

function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const GeoNotifier = () => {
  const [inside, setInside] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser.');
      return;
    }
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const distance = haversineDistance(
          latitude,
          longitude,
          GEOFENCE_CENTER.lat,
          GEOFENCE_CENTER.lng
        );
        const currentlyInside = distance <= ALLOWED_RADIUS_KM;
        if (inside === null) {
          setInside(currentlyInside);
        } else if (currentlyInside !== inside) {
          setInside(currentlyInside);
          if (currentlyInside) {
            notification.info({
              message: 'Entered area',
              description: 'You have entered the clock-in area. Please clock in.',
            });
          } else {
            notification.info({
              message: 'Left area',
              description: 'You have left the clock-in area. Please clock out.',
            });
          }
        }
      },
      (error) => {
        console.error('Error watching position:', error);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [inside]);

  return null; // This component renders nothing visible
};

export default GeoNotifier;
