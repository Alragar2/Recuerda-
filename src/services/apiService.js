const API_BASE_URL = 'http://192.168.0.231:3000/api';

class ApiService {
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    console.log('🌐 API Request:', {
      url,
      method: config.method,
      headers: config.headers,
      body: config.body
    });

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      console.log('📡 API Response:', {
        status: response.status,
        ok: response.ok,
        data
      });
      
      if (!response.ok) {
        // Si hay errores de validación específicos, mostrarlos
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map(err => err.message).join('\n');
          throw new Error(errorMessages);
        }
        throw new Error(data.message || 'Error en la petición');
      }
      
      return data;
    } catch (error) {
      console.error('❌ API Error:', error);
      // Si es un error de red
      if (error.message === 'Network request failed' || error instanceof TypeError) {
        throw new Error('No se puede conectar al servidor. Verifica tu conexión.');
      }
      throw error;
    }
  }

  static async get(endpoint, token = null) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return this.request(endpoint, {
      method: 'GET',
      headers,
    });
  }

  static async post(endpoint, data, token = null) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return this.request(endpoint, {
      method: 'POST',
      headers,
      body: data,
    });
  }

  static async put(endpoint, data, token = null) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return this.request(endpoint, {
      method: 'PUT',
      headers,
      body: data,
    });
  }

  static async delete(endpoint, token = null) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return this.request(endpoint, {
      method: 'DELETE',
      headers,
    });
  }
}

export default ApiService;
