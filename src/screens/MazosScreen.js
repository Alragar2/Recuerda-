import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainText from '../components/MainText';
import colors from '../../constants/colors';

// Data
import mockData from '../data/mockData.json';

export default function MazosScreen() {
  return (
    <View style={styles.container}>
      <MainText title="Mazos"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
