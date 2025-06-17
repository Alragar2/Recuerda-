import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainText from '../components/MainText';
import colors from '../../constants/colors';

export default function EstadisticasScreen() {
  return (
    <View style={styles.container}>
      <MainText title="Estadísticas"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
