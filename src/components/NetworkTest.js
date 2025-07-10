import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';

const NetworkTest = () => {
  const [testResults, setTestResults] = useState([]);

  const API_BASE_URL = 'http://192.168.0.231:3000/api';

  const addTestResult = (test, success, result) => {
    setTestResults(prev => [...prev, {
      test,
      success,
      result,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const testBasicFetch = async () => {
    try {
      console.log('🔍 Testing basic fetch...');
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'Test123456'
        })
      });

      const data = await response.json();
      console.log('📡 Basic fetch response:', { status: response.status, data });
      
      addTestResult('Basic Fetch', response.ok, `Status: ${response.status}, Data: ${JSON.stringify(data, null, 2)}`);
      
      if (response.ok) {
        Alert.alert('Éxito', 'Conexión básica funciona!');
      } else {
        Alert.alert('Error', `Status: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Basic fetch error:', error);
      addTestResult('Basic Fetch', false, `Error: ${error.message}`);
      Alert.alert('Error', error.message);
    }
  };

  const testRegister = async () => {
    try {
      console.log('🔍 Testing register...');
      const userData = {
        name: 'Test Mobile User',
        email: `mobile${Date.now()}@test.com`,
        password: 'Test123456',
        confirmPassword: 'Test123456'
      };

      console.log('📤 Sending register data:', userData);

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      console.log('📡 Register response:', { status: response.status, data });
      
      addTestResult('Register', response.ok, `Status: ${response.status}, Data: ${JSON.stringify(data, null, 2)}`);
      
      if (response.ok) {
        Alert.alert('Éxito', 'Registro funciona!');
      } else {
        Alert.alert('Error', data.message || `Status: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Register error:', error);
      addTestResult('Register', false, `Error: ${error.message}`);
      Alert.alert('Error', error.message);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Network Test</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={testBasicFetch}>
          <Text style={styles.buttonText}>Test Basic Fetch</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={testRegister}>
          <Text style={styles.buttonText}>Test Register</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearResults}>
          <Text style={styles.buttonText}>Clear Results</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Test Results:</Text>
        {testResults.map((result, index) => (
          <View key={index} style={[styles.result, result.success ? styles.success : styles.error]}>
            <Text style={styles.resultTitle}>{result.test} - {result.timestamp}</Text>
            <Text style={styles.resultText}>{result.result}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  result: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  success: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    borderWidth: 1,
  },
  error: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
  },
  resultTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
});

export default NetworkTest;
