// Test simple para verificar que AsyncStorage funciona
import AsyncStorage from '@react-native-async-storage/async-storage';

export const testAsyncStorage = async () => {
  try {
    await AsyncStorage.setItem('test', 'funcionando');
    const value = await AsyncStorage.getItem('test');
    console.log('AsyncStorage test:', value);
    await AsyncStorage.removeItem('test');
    return true;
  } catch (error) {
    console.error('Error en test AsyncStorage:', error);
    return false;
  }
};
