import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import colors from '../../constants/colors';

//Components
import MainText from '../components/MainText';
import Profile from '../components/Profile';

export default function PerfilScreen() {
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
