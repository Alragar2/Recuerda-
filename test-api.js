// Script de prueba simple para verificar la conectividad con el backend
const API_BASE_URL = 'http://192.168.0.231:3000/api';

async function testConnection() {
  console.log('🔍 Probando conexión al backend...');
  
  try {
    // Probar registro
    const registerData = {
      name: 'Test Frontend User',
      email: 'frontend@test.com',
      password: 'Test123456',
      confirmPassword: 'Test123456'
    };
    
    console.log('📤 Enviando datos de registro:', registerData);
    
    const registerResponse = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData)
    });
    
    const registerResult = await registerResponse.json();
    console.log('📥 Respuesta de registro:', {
      status: registerResponse.status,
      ok: registerResponse.ok,
      data: registerResult
    });
    
    if (registerResponse.ok) {
      console.log('✅ Registro exitoso!');
      
      // Probar login
      const loginData = {
        email: 'frontend@test.com',
        password: 'Test123456'
      };
      
      console.log('📤 Enviando datos de login:', loginData);
      
      const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });
      
      const loginResult = await loginResponse.json();
      console.log('📥 Respuesta de login:', {
        status: loginResponse.status,
        ok: loginResponse.ok,
        data: loginResult
      });
      
      if (loginResponse.ok) {
        console.log('✅ Login exitoso!');
      } else {
        console.log('❌ Error en login:', loginResult);
      }
    } else {
      console.log('❌ Error en registro:', registerResult);
    }
    
  } catch (error) {
    console.error('❌ Error de conexión:', error);
  }
}

// Ejecutar la prueba
testConnection();
