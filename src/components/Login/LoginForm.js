import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Alert } from "react-native";
import colors from "../../../constants/colors";
import { useAuth } from "../../context/AuthContextClean";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const passwordInputRef = useRef(null);
    
    const { login, loading } = useAuth();

    const handleLogin = async () => {
        console.log('🔍 LoginForm - handling login with:', { email, password: '***' });
        
        // Validaciones básicas
        if (!email || email.trim() === '') {
            Alert.alert('Error', 'El email es obligatorio');
            return;
        }
        
        if (!password || password.trim() === '') {
            Alert.alert('Error', 'La contraseña es obligatoria');
            return;
        }
        
        try {
            console.log('LoginForm - calling login function...');
            await login(email.trim().toLowerCase(), password);
            console.log('LoginForm - login successful');
            Alert.alert('Éxito', 'Sesión iniciada correctamente');
        } catch (error) {
            console.error('LoginForm error:', error);
            Alert.alert('Error', error.message || 'Error al iniciar sesión');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                ref={passwordInputRef}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
            />

            <TouchableHighlight
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Iniciando...' : 'Iniciar sesión'}
                </Text>
            </TouchableHighlight>

            {/* Separador */}
            <View style={styles.separatorContainer}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>o</Text>
                <View style={styles.separatorLine} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
        marginTop: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 24,
    },
    input: {
        width: "80%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 10,
    },
    button: {
        width: "80%",
        height: 40,
        backgroundColor: colors.secondary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginBottom: 16,
    },
    buttonText: {
        color: colors.background,
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonDisabled: {
        backgroundColor: colors.textSecondary,
        opacity: 0.6,
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        marginVertical: 20,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.textSecondary,
        opacity: 0.3,
    },
    separatorText: {
        marginHorizontal: 15,
        color: colors.textSecondary,
        fontSize: 14,
    },
});

export default LoginForm;
