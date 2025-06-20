import AsyncStorage from '@react-native-async-storage/async-storage';

// Claves para almacenamiento
const STORAGE_KEYS = {
  USER_DATA: '@user_data',
  AUTH_TOKEN: '@auth_token',
  USER_PREFERENCES: '@user_preferences',
  IS_LOGGED_IN: '@is_logged_in'
};

class AsyncStorageService {
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
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error obteniendo datos del usuario:', error);
      return null;
    }
  }

  // Guardar token de autenticación
  static async saveAuthToken(token) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      return true;
    } catch (error) {
      console.error('Error guardando token de auth:', error);
      return false;
    }
  }

  // Obtener token de autenticación
  static async getAuthToken() {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
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
      return value != null ? JSON.parse(value) : false;
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
      return jsonValue != null ? JSON.parse(jsonValue) : {};
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
      return true;
    } catch (error) {
      console.error('Error limpiando todos los datos:', error);
      return false;
    }
  }

  // Obtener todas las claves almacenadas
  static async getAllKeys() {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error obteniendo todas las claves:', error);
      return [];
    }
  }
}

export default AsyncStorageService;
export { STORAGE_KEYS };
