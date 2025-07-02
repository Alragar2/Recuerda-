import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform, UIManager, Dimensions } from "react-native";
import colors from "../../constants/colors";

// Components
import LoginForm from "../components/Login/LoginForm";
import RegisterForm from "../components/Login/RegisterForm";
import PerfilScreen from "./PerfilScreen";

export default function LoginRegisterScreen() {
    const [isLogin, setIsLogin] = React.useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const slideAnim = React.useRef(new Animated.Value(0)).current;
    const [switchWidth, setSwitchWidth] = React.useState(0);

    const handleSwitch = (loginSelected) => {
        if (isLogin !== loginSelected) {
            Animated.timing(slideAnim, {
                toValue: loginSelected ? 0 : 1,
                duration: 400,
                useNativeDriver: true,
            }).start();

            setIsLogin(loginSelected);
        }
    };

    // Calcular la distancia dinámicamente basada en el ancho del contenedor
    const indicatorWidth = switchWidth * 0.45;
    const padding = 8;
    const maxTranslate = switchWidth - indicatorWidth - (padding * 2);

    const indicatorTranslateX = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [12, maxTranslate > 0 ? maxTranslate : 180],
    });

    if (loggedIn) {
        // Pasa una función para cerrar sesión
        return <PerfilScreen onLogout={() => setLoggedIn(false)} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.switchContainer}>
                <View
                    style={styles.switchBackground}
                    onLayout={(event) => {
                        const { width } = event.nativeEvent.layout;
                        setSwitchWidth(width);
                    }}
                >
                    <Animated.View style={[
                        styles.switchIndicator,
                        {
                            transform: [{ translateX: indicatorTranslateX }]
                        }
                    ]} />

                    <TouchableOpacity
                        style={styles.switchOption}
                        onPress={() => handleSwitch(true)}
                        activeOpacity={0.8}
                    >
                        <Text style={[
                            styles.tabText,
                            isLogin && styles.activeText
                        ]}>Inicio sesión</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.switchOption}
                        onPress={() => handleSwitch(false)}
                        activeOpacity={0.8}
                    >
                        <Text style={[
                            styles.tabText,
                            !isLogin && styles.activeText
                        ]}>Registro</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {isLogin 
                ? <LoginForm onLogin={() => setLoggedIn(true)} /> 
                : <RegisterForm onRegister={() => setLoggedIn(true)} />}
        </View>
    );
}

const styles = StyleSheet.create({    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
    },
    switchContainer: {
        alignItems: 'center',
        marginTop: 70,
    },
    switchBackground: {
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: colors.backgroundSecondary,
        borderRadius: 30,
        padding: 8,
        height: 50,
        width: '98%',
        maxWidth: 350,
        minWidth: 250,
    },
    switchIndicator: {
        position: 'absolute',
        top: 8,
        width: '48%',
        height: 34,
        backgroundColor: colors.textSecondary,
        borderRadius: 26,
        zIndex: 1,
    },
    indicatorLeft: {
        left: 8,
    },
    indicatorRight: {
        right: 8,
    },
    switchOption: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    switchButton: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    activeTab: {
        backgroundColor: colors.primary,
    },
    tabText: {
        color: colors.textPrimary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    activeText: {
        color: colors.background,
    },
});
