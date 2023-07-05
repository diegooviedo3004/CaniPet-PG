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

const removeElement = async () => {
  try {
    const value = await AsyncStorage.removeItem('code');
  
  } catch (e) {
  }
}

  export default { getData, removeElement}
