// Versión alternativa de AsyncStorage Service
// Esta versión usa una implementación más robusta para resolver problemas de importación

import getAsyncStorage, { isAsyncStorageAvailable, testAsyncStorage } from '../utils/asyncStorageUtils';

// Obtener AsyncStorage de manera centralizada
const AsyncStorage = getAsyncStorage();

// Claves para almacenamiento
const STORAGE_KEYS = {
  USER_DATA: '@user_data',
  AUTH_TOKEN: '@auth_token',
  USER_PREFERENCES: '@user_preferences',
  IS_LOGGED_IN: '@is_logged_in'
};

class AsyncStorageServiceAlt {
  // Guardar datos del usuario
  static async saveUserData(userData) {
    try {
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, jsonValue);
      return true;
    } catch (error) {
      console.error('Error guardando datos del usuario:', error);
      return false;
    }
  }

  // Obtener datos del usuario
  static async getUserData() {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      const result = jsonValue != null ? JSON.parse(jsonValue) : null;
      return result;
    } catch (error) {
      console.error('Error obteniendo datos del usuario:', error);
      return null;
    }
  }

  // Guardar token de autenticación
  static async saveAuthToken(token) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      console.log('Token de auth guardado correctamente');
      return true;
    } catch (error) {
      console.error('Error guardando token de auth:', error);
      return false;
    }
  }

  // Obtener token de autenticación
  static async getAuthToken() {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      console.log('Token de auth obtenido:', token ? 'Token encontrado' : 'No hay token');
      return token;
    } catch (error) {
      console.error('Error obteniendo token de auth:', error);
      return null;
    }
  }

  // Guardar estado de login
  static async saveLoginStatus(isLoggedIn) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, JSON.stringify(isLoggedIn));
      return true;
    } catch (error) {
      console.error('Error guardando estado de login:', error);
      return false;
    }
  }

  // Obtener estado de login
  static async getLoginStatus() {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
      const result = value != null ? JSON.parse(value) : false;
      return result;
    } catch (error) {
      console.error('Error obteniendo estado de login:', error);
      return false;
    }
  }

  // Guardar preferencias del usuario
  static async saveUserPreferences(preferences) {
    try {
      const jsonValue = JSON.stringify(preferences);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, jsonValue);
      return true;
    } catch (error) {
      console.error('Error guardando preferencias:', error);
      return false;
    }
  }

  // Obtener preferencias del usuario
  static async getUserPreferences() {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      const result = jsonValue != null ? JSON.parse(jsonValue) : {};
      console.log('Preferencias obtenidas:', Object.keys(result).length > 0 ? 'Preferencias encontradas' : 'Preferencias por defecto');
      return result;
    } catch (error) {
      console.error('Error obteniendo preferencias:', error);
      return {};
    }
  }

  // Limpiar todos los datos de autenticación
  static async clearAuthData() {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USER_DATA,
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.IS_LOGGED_IN
      ]);
      return true;
    } catch (error) {
      console.error('Error limpiando datos de auth:', error);
      return false;
    }
  }

  // Limpiar todos los datos
  static async clearAllData() {
    try {
      await AsyncStorage.clear();
      console.log('Todos los datos limpiados correctamente');
      return true;
    } catch (error) {
      console.error('Error limpiando todos los datos:', error);
      return false;
    }
  }

  // Obtener todas las claves almacenadas
  static async getAllKeys() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log('Claves obtenidas:', keys.length);
      return keys;
    } catch (error) {
      console.error('Error obteniendo todas las claves:', error);
      return [];
    }
  }
  // Método de prueba para verificar que AsyncStorage funciona
  static async testConnection() {
    return await testAsyncStorage();
  }

  // Verificar si AsyncStorage está disponible
  static isAvailable() {
    return isAsyncStorageAvailable();
  }
}

export default AsyncStorageServiceAlt;
export { STORAGE_KEYS };
