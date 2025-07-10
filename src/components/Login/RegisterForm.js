import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Alert } from "react-native";
import colors from "../../../constants/colors";
import { useAuth } from "../../context/AuthContextClean";

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const { register, loading } = useAuth();

    // Referencias para los inputs
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);

    const handleRegister = async () => {
        console.log('🔍 RegisterForm - handling register with:', { name, email, password: '***', confirmPassword: '***' });
        
        // Validaciones básicas
        if (!name || name.trim() === '') {
            Alert.alert('Error', 'El nombre es obligatorio');
            return;
        }
        
        if (!email || email.trim() === '') {
            Alert.alert('Error', 'El email es obligatorio');
            return;
        }
        
        if (!password || password.trim() === '') {
            Alert.alert('Error', 'La contraseña es obligatoria');
            return;
        }
        
        if (!confirmPassword || confirmPassword.trim() === '') {
            Alert.alert('Error', 'Debes confirmar la contraseña');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        const userData = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: password,
            confirmPassword: confirmPassword
        };
        
        console.log('✅ RegisterForm - validated data, calling register function...');

        try {
            await register(userData);
            console.log('RegisterForm - registration successful');
            Alert.alert('Éxito', 'Usuario registrado correctamente');
        } catch (error) {
            console.error('RegisterForm error:', error);
            Alert.alert('Error', error.message || 'Error al registrar usuario');
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
                onSubmitEditing={() => emailInputRef.current && emailInputRef.current.focus()}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                ref={emailInputRef}
                onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                ref={passwordInputRef}
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordInputRef.current && confirmPasswordInputRef.current.focus()}
            />            
            <TextInput
                style={styles.input}
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                ref={confirmPasswordInputRef}
                returnKeyType="done"
                onSubmitEditing={handleRegister}
            />
            <TouchableHighlight
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Registrando...' : 'Registrarse'}
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

export default RegisterForm;
