import NetInfo from '@react-native-community/netinfo';

export const checkNetwork = async () => {
  const response = await NetInfo.fetch();
  return response.isConnected;
};
