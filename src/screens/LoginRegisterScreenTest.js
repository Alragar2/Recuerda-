import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../constants/colors";

// Solo importamos LoginForm para probar
import LoginForm from "../components/Login/LoginForm";

export default function LoginRegisterScreenTest() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <View style={styles.container}>
            {/* Header simple */}
            <View style={styles.header}>
                <Text style={styles.title}>RecuerdaMas</Text>
                <Text style={styles.subtitle}>
                    {isLogin ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}
                </Text>
            </View>

            {/* Switch simple */}
            <View style={styles.switchContainer}>
                <TouchableOpacity
                    style={[styles.switchButton, isLogin && styles.activeButton]}
                    onPress={() => setIsLogin(true)}
                >
                    <Text style={[styles.switchText, isLogin && styles.activeText]}>
                        Iniciar Sesión
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.switchButton, !isLogin && styles.activeButton]}
                    onPress={() => setIsLogin(false)}
                >
                    <Text style={[styles.switchText, !isLogin && styles.activeText]}>
                        Registrarse
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Formulario de prueba */}
            <View style={styles.formContainer}>
                {isLogin ? (
                    <LoginForm />
                ) : (
                    <Text style={{ textAlign: 'center', fontSize: 16 }}>
                        RegisterForm deshabilitado para debugging
                    </Text>
                )}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    switchContainer: {
        flexDirection: 'row',
        backgroundColor: colors.backgroundSecondary,
        borderRadius: 25,
        padding: 4,
        marginBottom: 30,
    },
    switchButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 21,
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: colors.secondary,
    },
    switchText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textSecondary,
    },
    activeText: {
        color: colors.background,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
    },
});
