import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function NextPageProfile({ title, iconName }) {
    return (
        <View style={styles.container}>
            <View style={styles.iconView}>
                <Ionicons name={iconName} size={24} color={colors.textSecondary} />
            </View>
            <Text style={styles.text}>{title}</Text>
            <Ionicons name="chevron-forward-outline" size={24} color={colors.textSecondary} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10
    },
    iconView: {
        marginRight: 10, 
        backgroundColor: colors.backgroundSecondary, 
        borderRadius: 8, 
        padding: 5
    },
    text: {
        flex: 1, 
        fontSize: 16
    }
});