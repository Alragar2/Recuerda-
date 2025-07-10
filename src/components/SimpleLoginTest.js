import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';

const SimpleLoginTest = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const testLogin = async () => {
    try {
      console.log('🔍 Probando login con:', { email, password });
      
      const response = await fetch('http://192.168.0.231:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      console.log('📡 Respuesta:', { status: response.status, data });
      
      if (response.ok) {
        Alert.alert('Éxito', 'Login funcionó!');
      } else {
        Alert.alert('Error', data.message || 'Error en login');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      Alert.alert('Error', error.message);
    }
  };

  const testRegister = async () => {
    try {
      const userData = {
        name: 'Test Simple',
        email: `test${Date.now()}@example.com`,
        password: 'Test123456',
        confirmPassword: 'Test123456'
      };
      
      console.log('🔍 Probando registro con:', userData);
      
      const response = await fetch('http://192.168.0.231:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      
      console.log('📡 Respuesta:', { status: response.status, data });
      
      if (response.ok) {
        Alert.alert('Éxito', 'Registro funcionó!');
      } else {
        Alert.alert('Error', data.message || 'Error en registro');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Simple de Autenticación</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={testLogin}>
        <Text style={styles.buttonText}>Test Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={testRegister}>
        <Text style={styles.buttonText}>Test Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SimpleLoginTest;
