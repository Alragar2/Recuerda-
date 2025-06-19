import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import TabNavigator from './navigation/TabNavigator';
import LoginRegisterScreen from './screens/LoginRegisterScreen';
import colors from '../constants/colors';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { user, initializing, error } = useAuth();

  // Mostrar pantalla de error si hay problemas con Firebase
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error de autenticación</Text>
        <Text style={styles.errorDetailText}>{error.message}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  // Mostrar pantalla de carga mientras se verifica el estado de autenticación
  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <>
      {user ? <TabNavigator /> : <LoginRegisterScreen />}
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 18,
    color: colors.textPrimary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  errorText: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorDetailText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
