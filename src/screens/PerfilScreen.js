import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Switch, TouchableHighlight, Alert } from 'react-native';

import colors from '../../constants/colors';

//Components
import MainText from '../components/MainText';
import Profile from '../components/Profile';
import { Ionicons } from '@expo/vector-icons';
import ToggleProfile from '../components/ToggleProfile';
import NextPageProfile from '../components/NextPageProfile';
import LoadingScreen from '../components/LoadingScreen';

//Hooks
import useDarkMode from '../hooks/useDarkMode';
import { useAuth } from '../context/AuthContextClean';

export default function PerfilScreen() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [notifications, setNotifications] = useState(true);
  
  const { user, logout, updateProfile, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (user) {
      setNotifications(user.notifications || true);
    }
  }, [user]);

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sí', 
          onPress: async () => {
            await logout();
            // No necesitamos hacer nada más, App.js manejará la navegación
          }
        }
      ]
    );
  };

  const handleToggleNotifications = async (value) => {
    setNotifications(value);
    try {
      await updateProfile({ notifications: value });
    } catch (error) {
      Alert.alert('Error', 'No se pudieron actualizar las notificaciones');
      setNotifications(!value); // Revertir cambio
    }
  };

  const handleToggleDarkMode = async (value) => {
    setDarkMode(value);
    try {
      await updateProfile({ darkMode: value });
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el modo oscuro');
      setDarkMode(!value); // Revertir cambio
    }
  };

  if (loading) {
    return <LoadingScreen message="Cargando perfil..." />;
  }

  return (
    <View style={styles.container}>
      <MainText title="Perfil" />
      <Profile
        name={user?.name || "Usuario"}
        email={user?.email || "email@ejemplo.com"}
        profileImage={user?.profileImage || "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyZmlsfGVufDB8fDB8fHww"}
      />
      <MainText
        title="General"
        titleSize={20}
        alignItems="flex-start"
        marginTop={0}
      />
      <ToggleProfile
        title="Notificaciones"
        value={notifications}
        onToggle={handleToggleNotifications}
        iconName="notifications-outline"
      />
      <ToggleProfile
        title="Modo oscuro"
        value={darkMode}
        onToggle={handleToggleDarkMode}
        iconName="moon-outline"
      />
      <MainText
        title="Ayuda"
        titleSize={20}
        alignItems="flex-start"
        marginTop={0}
      />
      <NextPageProfile
        title="Preguntas frecuentes"
        iconName="help-circle-outline"
      />
      <NextPageProfile
        title="Contactar soporte"
        iconName="mail-outline"
      />
      <TouchableHighlight onPress={handleLogout}>
        <MainText
          title="Cerrar sesión"
          titleSize={12}
          alignItems="flex-start"
          marginTop={0}
          textColor={colors.textSecondary}
        />
      </TouchableHighlight>
      <MainText
        title="Eliminar cuenta"
        titleSize={12}
        alignItems="flex-start"
        marginTop={0}
        textColor={colors.textSecondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});