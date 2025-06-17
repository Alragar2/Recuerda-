import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from "../../constants/colors";

export default function Card({ title, description, imageUrl, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.cardBackground,
        borderRadius: 10,
        marginBottom: 16,
        marginRight: 16,
        width: 250,
    },
    image: {
        width: "100%",
        height: 200,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    textContainer: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        color: colors.textSecondary,
    },
});