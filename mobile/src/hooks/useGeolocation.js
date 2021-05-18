import Geolocation from 'react-native-geolocation-service';

export const useGeolocation = async () => {
  const data = Geolocation.getCurrentPosition(
    position => {
      data = position;
    },
    {
      accuracy: {
        android: 'high',
        ios: 'best',
      },
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
      distanceFilter: 0,
      forceRequestLocation: true,
      showLocationDialog: true,
    },
  );

  return data;
};
