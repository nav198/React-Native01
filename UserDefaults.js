import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAccessToken = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    console.log('Retrieved AccessToken:', token);
    return token;
  };