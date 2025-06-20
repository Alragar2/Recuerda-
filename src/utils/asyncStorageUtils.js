// Módulo centralizado para AsyncStorage
// Este módulo maneja la importación de AsyncStorage de manera robusta
// y puede ser usado tanto por Firebase como por nuestros servicios personalizados

let AsyncStorage;

// Función para obtener AsyncStorage de manera robusta
const getAsyncStorage = () => {
  if (AsyncStorage) {
    return AsyncStorage;
  }

  // Intentar importar AsyncStorage de diferentes maneras
  try {
    AsyncStorage = require('@react-native-async-storage/async-storage').default;
    if (AsyncStorage) {
      console.log('AsyncStorage importado exitosamente (método .default)');
      return AsyncStorage;
    }
  } catch (error) {
    console.warn('Error importando AsyncStorage método 1:', error);
  }

  try {
    AsyncStorage = require('@react-native-async-storage/async-storage');
    if (AsyncStorage) {
      console.log('AsyncStorage importado exitosamente (método directo)');
      return AsyncStorage;
    }
  } catch (error) {
    console.warn('Error importando AsyncStorage método 2:', error);
  }

  // Si no se puede importar AsyncStorage, crear un fallback
  console.warn('AsyncStorage no disponible, usando fallback básico');
  AsyncStorage = {
    setItem: async (key, value) => {
      console.warn('AsyncStorage fallback - setItem:', key);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, value);
      }
    },
    getItem: async (key) => {
      console.warn('AsyncStorage fallback - getItem:', key);
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(key);
      }
      return null;
    },
    removeItem: async (key) => {
      console.warn('AsyncStorage fallback - removeItem:', key);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(key);
      }
    },
    multiRemove: async (keys) => {
      console.warn('AsyncStorage fallback - multiRemove:', keys);
      if (typeof window !== 'undefined' && window.localStorage) {
        keys.forEach(key => localStorage.removeItem(key));
      }
    },
    clear: async () => {
      console.warn('AsyncStorage fallback - clear');
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.clear();
      }
    },
    getAllKeys: async () => {
      console.warn('AsyncStorage fallback - getAllKeys');
      if (typeof window !== 'undefined' && window.localStorage) {
        return Object.keys(localStorage);
      }
      return [];
    }
  };

  return AsyncStorage;
};

// Función para verificar si AsyncStorage está disponible
const isAsyncStorageAvailable = () => {
  try {
    const storage = getAsyncStorage();
    return storage && typeof storage.setItem === 'function';
  } catch (error) {
    return false;
  }
};

// Función de test para verificar funcionalidad
const testAsyncStorage = async () => {
  try {
    const storage = getAsyncStorage();
    const testKey = '@async_storage_test';
    const testValue = 'test_value';
    
    await storage.setItem(testKey, testValue);
    const retrievedValue = await storage.getItem(testKey);
    await storage.removeItem(testKey);
    
    const isWorking = retrievedValue === testValue;
    console.log('AsyncStorage test result:', isWorking ? 'WORKING' : 'NOT WORKING');
    return isWorking;
  } catch (error) {
    console.error('AsyncStorage test failed:', error);
    return false;
  }
};

export default getAsyncStorage;
export { isAsyncStorageAvailable, testAsyncStorage };
