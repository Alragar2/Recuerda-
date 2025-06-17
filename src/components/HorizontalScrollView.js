import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import colors from "../../constants/colors";


export default function HorizontalScrollView({
    children }) {
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                {children}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        paddingHorizontal: 24,
        marginTop: 8,
        marginBottom: 8,
        paddingBottom: 2,
        paddingTop: 2,
    },
    viewTitle: {
        // alignItems se aplica dinámicamente como prop
    },
    title: {
        fontWeight: "bold",
        color: colors.text,
        // fontSize se aplica dinámicamente como prop
    },
    scrollView: {
        flexDirection: "row",
        alignItems: "center",
    },
});