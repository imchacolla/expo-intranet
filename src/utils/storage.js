import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async value => {
  try {
    await AsyncStorage.setItem ('@storage_Key', value);
  } catch (e) {
    // saving error
  }
};

export const getUser = async () => {
  try {
    const value = await AsyncStorage.getItem ('user');
    console.log (value);
    // if (value !== null) {
    //   console.log ('login page');
    // }
  } catch (e) {
    console.log (e + 'erro login page');
  }
};
