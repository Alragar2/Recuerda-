import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Switch, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../../constants/colors';

//Components
import MainText from '../components/MainText';
import Profile from '../components/Profile';
import { Ionicons } from '@expo/vector-icons';
import ToggleProfile from '../components/ToggleProfile';
import NextPageProfile from '../components/NextPageProfile';

//Hooks
import useDarkMode from '../hooks/useDarkMode';
import LoginRegisterScreen from './LoginRegisterScreen';

export default function PerfilScreen({ onLogout }) {
  const [darkMode, setDarkMode] = useDarkMode();
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return <LoginRegisterScreen />;
  }

  return (
    <View style={styles.container}>
      <MainText title="Perfil" />
      <Profile
        name="John Doe"
        email="johndoe@gmail.com"
        profileImage="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyZmlsfGVufDB8fDB8fHww"
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
        onToggle={setNotifications}
        iconName="notifications-outline"
      />
      <ToggleProfile
        title="Modo oscuro"
        value={darkMode}
        onToggle={setDarkMode}
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
      <TouchableHighlight
        onPress={() => {
          if (onLogout) {
            onLogout();
          } else {
            setShowLogin(true);
          }
        }}>
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