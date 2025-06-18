import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";



const CustomSearchBar = (onSearch) => {
    const [query, setQuery] = useState("");

    const handleChange = (text) => {
        setQuery(text);
        onSearch && onSearch(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <View style={styles.iconContainer}>
                    <Ionicons name="search" size={20} color={colors.textSecondary} />
                </View>
                <TextInput
                    placeholder="Search..."
                    placeholderTextColor={colors.textSecondary}
                    value={query}
                    onChangeText={handleChange}

                />
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    input: {
        flexDirection: "row",
        flex: 1,
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: colors.backgroundSecondary,
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
});

export default CustomSearchBar;
