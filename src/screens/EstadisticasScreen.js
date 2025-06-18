import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../../constants/colors';

// Components
import BarChartStats from '../components/BarChartStats';
import MainText from '../components/MainText';

// Data
import mockData from '../data/mockData.json';

export default function EstadisticasScreen() {
  // Extraer datos del mockData
  const labels = mockData.recentCards.map(card => card.title);
  const errorsData = mockData.recentCards.map(card => card.errors);

  const data = {
    labels: labels,
    datasets: [
      {
        data: errorsData
      }]
  };

  return (
    <View style={styles.container}>
      <MainText title="Estadísticas" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <BarChartStats
          data={data}
          width={380}
          height={250} chartConfig={{
            backgroundGradientFrom: colors.background,
            backgroundGradientTo: colors.background,
            color: (opacity = 1) => colors.secondary,
            labelColor: (opacity = 1) => colors.text,
          }}
          title={"Errores por mazo"}
        />
        <BarChartStats
          data={data}
          width={380}
          height={250} chartConfig={{
            backgroundGradientFrom: colors.background,
            backgroundGradientTo: colors.background,
            color: (opacity = 1) => colors.secondary,
            labelColor: (opacity = 1) => colors.text,
          }}
          title={"Repeticion de preguntas por mazo"}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  errorText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginVertical: 4,
    paddingHorizontal: 16,
  },
});
