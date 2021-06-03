import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLocalStorage = async (storeKey, method, value, bool) => {
  try {
    if (method == 'SET') {
      await AsyncStorage.setItem(storeKey, value);
    } else if (method == 'GET') {
      const getValue = await AsyncStorage.getItem(storeKey);
      if (getValue !== null) {
        return getValue;
      } else {
        return bool ? '' : false;
      }
    }
  } catch (error) {
    console.log(err);
  }
};
