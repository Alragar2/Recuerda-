import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../../constants/colors';

// Components
import CustomSearchBar from '../components/CustomSearchBar';
import MainText from '../components/MainText';
import BlockDeck from '../components/BlockDeck';

// Data
import mockData from '../data/mockData.json';

export default function DecksScreen() {

  const recentData = mockData.recentCards;

  const renderBlockDeck = (item) => (
    <BlockDeck
      urlimage={item.image}
      title={item.title}
      description={item.subtitle}
      key={item.id}
    />
  );
  return (
    <View style={styles.container}>
      <MainText title="Mazos" />
      <CustomSearchBar onSearch={(text) => console.log("Searching for:", text)} />
      <MainText
        title="Mis mazos"
        titleSize={20}
        alignItems="flex-start"
        marginTop={0}
      />
      <View style={{ paddingHorizontal: 16 }}>
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          {recentData.map(renderBlockDeck)}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
