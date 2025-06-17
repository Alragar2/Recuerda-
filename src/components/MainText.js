import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../constants/colors";


export default function MainText({ 
    title, 
    subtitle, 
    titleSize = 24, 
    subtitleSize = 16, 
    alignItems = "center",
    marginTop = 50
}) {
    return (
        <View style={styles.container}>
            <View style={{ marginTop }} />
            <View style={[styles.viewTitle, { alignItems }]}>
                <Text style={[styles.title, { fontSize: titleSize }]}>{title}</Text>
            </View>
            {subtitle && <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>{subtitle}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 12,
        paddingHorizontal: 16,
    },    viewTitle: {
        // alignItems se aplica dinámicamente como prop
    },
    title: {
        fontWeight: "bold",
        color: colors.text,
        // fontSize se aplica dinámicamente como prop
    },
    subtitle: {
        color: colors.textSecondary,
        // fontSize se aplica dinámicamente como prop
    },
});
