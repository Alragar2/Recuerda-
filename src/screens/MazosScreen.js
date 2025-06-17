import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MazosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mazos</Text>
      <Text style={styles.subtitle}>Aquí verás todos tus mazos de tarjetas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
