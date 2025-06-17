import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Components
import MainText from '../components/MainText';
import HorizontalScrollView from '../components/HorizontalScrollView';
import Card from '../components/Card';

// Constants
import colors from '../../constants/colors';

// Data
import mockData from '../data/mockData.json';

export default function HomeScreen() {

    const recentData = mockData.recentCards;

    const renderCard = (item) => (
        <Card
            title={item.title}
            description={item.subtitle}
            imageUrl={item.image}
            onPress={() => console.log("Card pressed:", item.id)}
        />
    );

    return (
        <View style={styles.container}>
            <MainText title="Inicio"/>
            <MainText
                title="Recientes"
                titleSize={20}
                alignItems="flex-start"
                marginTop={0}
            />
            <HorizontalScrollView>
                {recentData.map(renderCard)}
            </HorizontalScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
});
