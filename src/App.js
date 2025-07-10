import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text } from 'react-native';

import { AuthProvider, useAuth } from './context/AuthContextClean';
import LoginRegisterScreenTest from './screens/LoginRegisterScreenTest';
import TabNavigator from './navigation/TabNavigator';

function AppContent() {
  const { isAuthenticated, loading, user } = useAuth();

  if (isAuthenticated) {
    return <TabNavigator />;
  }

  return <LoginRegisterScreenTest />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
