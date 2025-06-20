import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Alert } from "react-native";
import colors from "../../../constants/colors";
import { useAuth } from "../../hooks/useAuth";

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { signUp, loading } = useAuth();

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    const handleEmailSignUp = async () => {
        if (!name || !email || !password) {
            Alert.alert("Error", "Todos los campos son obligatorios");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden");
            return;
        }
        
        const result = await signUp(email, password, name);
        
        if (result.success) {
            Alert.alert("Éxito", "Usuario registrado correctamente");
            // Limpiar los campos del formulario
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } else {
            Alert.alert("Error", result.error || "No se pudo registrar");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
                keyboardType="default"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current.focus()}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current.focus()}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                ref={passwordInputRef}
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordInputRef.current.focus()}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                ref={confirmPasswordInputRef}
                returnKeyType="done"
            />

            <TouchableHighlight
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleEmailSignUp}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Creando cuenta...' : 'Registrarse'}
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
        fontWeight: "bold", marginBottom: 24,
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
        borderRadius: 8, marginBottom: 16,
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

export default RegisterForm;
