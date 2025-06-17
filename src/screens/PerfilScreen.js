import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainText from '../components/MainText';
import colors from '../../constants/colors';

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <MainText title="Perfil"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
