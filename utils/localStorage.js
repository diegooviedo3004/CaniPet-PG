import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('code');
      if (value !== null) {
        return value
      }
    } catch (e) {
    }
  };

  export default { getData }
