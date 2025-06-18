import React from "react";
import { View, StyleSheet, Image, Text, TouchableHighlight } from "react-native";
import colors from "../../constants/colors";

const BlockDeck = ({ urlimage, title, description }) => {
    return (
        <View style={styles.container}>
            <TouchableHighlight
                style={styles.input}
                underlayColor={colors.backgroundSecondary}
                onPress={() => console.log({ title, description })}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                        source={{ uri: urlimage }}
                        style={{ width: 60, height: 60, borderRadius: 8 }}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundSecondary,
        paddingVertical: 8,
    },
    input: {
        borderRadius: 8,
    },
    textContainer: {
        flex: 1,
        marginLeft: 12,
        paddingHorizontal: 12,
    }, title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    description: {
        fontSize: 12,
        color: colors.textSecondary,
    },
});

export default BlockDeck;
