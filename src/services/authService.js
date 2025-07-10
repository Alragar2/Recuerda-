import ApiService from './apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
  static async login(email, password) {
    try {
      const loginData = {
        email,
        password,
      };
      
      console.log('🔍 Login data being sent:', loginData);
      
      const response = await ApiService.post('/auth/login', loginData);

      if (response.token) {
        await AsyncStorage.setItem('userToken', response.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.user));
      }

      return response;
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  }

  static async register(userData) {
    try {
      console.log('🔍 Register data being sent:', userData);
      
      const response = await ApiService.post('/auth/register', userData);

      if (response.token) {
        await AsyncStorage.setItem('userToken', response.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.user));
      }

      return response;
    } catch (error) {
      console.error('❌ Register error:', error);
      throw error;
    }
  }

  static async logout() {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  static async getToken() {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      return null;
    }
  }

  static async getCurrentUser() {
    try {
      const userData = await AsyncStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }

  static async getUserProfile() {
    try {
      const token = await this.getToken();
      if (!token) throw new Error('No hay token de autenticación');

      const response = await ApiService.get('/auth/profile', token);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async updateProfile(userData) {
    try {
      const token = await this.getToken();
      if (!token) throw new Error('No hay token de autenticación');

      const response = await ApiService.put('/auth/profile', userData, token);
      
      // Actualizar datos locales
      if (response.user) {
        await AsyncStorage.setItem('userData', JSON.stringify(response.user));
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async checkAuthStatus() {
    try {
      const token = await this.getToken();
      const user = await this.getCurrentUser();
      
      if (token && user) {
        // Verificar que el token sigue siendo válido
        const profile = await this.getUserProfile();
        return { isAuthenticated: true, user: profile.user, token };
      }
      
      return { isAuthenticated: false, user: null, token: null };
    } catch (error) {
      // Si hay error, limpiar datos locales
      await this.logout();
      return { isAuthenticated: false, user: null, token: null };
    }
  }
}

export default AuthService;
