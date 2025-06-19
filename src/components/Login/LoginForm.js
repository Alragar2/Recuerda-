import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Alert } from "react-native";
import colors from "../../../constants/colors";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase-config";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const passwordInputRef = useRef();

    const handleEmailSignIn = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Introduce un email y una contraseña");
            return;
        }

        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                // El usuario ha iniciado sesión correctamente
                const user = userCredential.user;   
                console.log("Usuario autenticado:", user);
            });
            Alert.alert("Éxito", "Inicio de sesión exitoso");
            // Aquí podrías redirigir a la pantalla principal, resetear inputs, etc.
        } catch (error) {
            console.log("Error al iniciar sesión:", error);
            Alert.alert("Error", error.message || "No se pudo iniciar sesión");
        } finally {
            setLoading(false);
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
                onSubmitEditing={() => passwordInputRef.current.focus()}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                ref={passwordInputRef}
                returnKeyType="done"
            />

            <TouchableHighlight
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleEmailSignIn}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Iniciando...' : 'Iniciar Sesión'}
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
