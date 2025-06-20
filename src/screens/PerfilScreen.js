import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

import colors from '../../constants/colors';

//Components
import MainText from '../components/MainText';
import Profile from '../components/Profile';
import { Ionicons } from '@expo/vector-icons';
import ToggleProfile from '../components/ToggleProfile';
import NextPageProfile from '../components/NextPageProfile';

//Hooks
import useDarkMode from '../hooks/useDarkMode';
import { useAuth } from '../hooks/useAuth';
import AsyncStorageService from '../services/asyncStorageServiceAlt';

export default function PerfilScreen() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { signOut, loading, user } = useAuth();

  const handleSignOut = async () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: async () => {
            const result = await signOut();
            if (result.success) {
              Alert.alert("Éxito", "Sesión cerrada correctamente");
            } else {
              Alert.alert("Error", "No se pudo cerrar la sesión");
            }
          }
        }
      ]
    );
  };
  const handleDeleteAccount = async () => {
    Alert.alert(
      "⚠️ Eliminar cuenta",
      "¿Estás completamente seguro de que quieres eliminar tu cuenta?\n\n• Se eliminarán todos tus datos\n• Esta acción NO se puede deshacer\n• Perderás acceso permanentemente",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sí, eliminar",
          style: "destructive",
          onPress: () => {
            // Segunda confirmación para mayor seguridad
            Alert.alert(
              "🚨 Confirmación final",
              "Esta es tu última oportunidad para cancelar. ¿Realmente quieres eliminar tu cuenta de forma permanente?",
              [
                {
                  text: "Cancelar",
                  style: "cancel"
                },
                {
                  text: "Eliminar definitivamente",
                  style: "destructive",
                  onPress: executeDeleteAccount
                }
              ]
            );
          }
        }
      ]
    );
  };  const executeDeleteAccount = async () => {
    try {
      if (!user) {
        Alert.alert("Error", "No hay usuario autenticado para eliminar");
        return;
      }

      // Mostrar loading
      const loadingAlert = Alert.alert("Eliminando cuenta", "Por favor espera...", [], { cancelable: false });

      // 1. Obtener la instancia actual de Firebase Auth
      const { auth } = await import('../../firebase-config');
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        Alert.alert("Error", "No hay usuario autenticado en Firebase");
        return;
      }

      console.log("🗑️ Iniciando eliminación de cuenta para usuario:", currentUser.email);

      // 2. Eliminar el usuario de Firebase Auth usando la instancia actual
      await deleteUser(currentUser);
      console.log("✅ Usuario eliminado de Firebase Auth");

      // 3. Limpiar todos los datos de AsyncStorage
      await AsyncStorageService.clearAllData();
      console.log("✅ Datos de AsyncStorage limpiados");      // 4. Mostrar confirmación de éxito
      Alert.alert(
        "✅ Cuenta eliminada",
        "Tu cuenta ha sido eliminada exitosamente. Serás redirigido al inicio de sesión.",
        [
          {
            text: "OK",
            onPress: () => {
              // El usuario será redirigido automáticamente al login 
              // porque Firebase Auth detectará que no hay usuario autenticado
              console.log("Cuenta eliminada exitosamente");
            }
          }
        ]
      );    } catch (error) {
      console.error("❌ Error eliminando cuenta:", error);
      console.error("❌ Error code:", error.code);
      console.error("❌ Error message:", error.message);
      
      // Cerrar cualquier alert anterior primero
      if (Alert.dismissAll) {
        Alert.dismissAll();
      }
      
      // Si requiere autenticación reciente, solicitar contraseña
      if (error.code === 'auth/requires-recent-login') {
        console.log("🔐 Error de autenticación reciente detectado, iniciando re-autenticación");
        // Dar un pequeño delay para que se cierre el alert anterior
        setTimeout(() => {
          handleReauthentication();
        }, 100);
        return;
      }
      
      let errorMessage = "No se pudo eliminar la cuenta. ";
      
      // Manejar otros errores específicos de Firebase
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage += "Usuario no encontrado.";
          break;
        case 'auth/network-request-failed':
          errorMessage += "Error de conexión. Verifica tu internet.";
          break;
        default:
          errorMessage += `Error: ${error.message}`;
      }
      
      Alert.alert("❌ Error", errorMessage);
    }
  };
  const handleReauthentication = () => {
    console.log("🔐 Iniciando proceso de re-autenticación");
    Alert.alert(
      "🔐 Verificación de seguridad",
      "Por seguridad, necesitas confirmar tu contraseña antes de eliminar tu cuenta.",
      [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => console.log("❌ Re-autenticación cancelada por el usuario")
        },
        {
          text: "Continuar",
          onPress: () => {
            console.log("✅ Usuario decidió continuar con re-autenticación");
            promptForPassword();
          }
        }
      ]
    );
  };  const promptForPassword = () => {
    console.log("📝 Solicitando contraseña al usuario");
    setPassword('');
    setPasswordError('');
    setShowPasswordModal(true);
  };  const reauthenticateAndDelete = async (password) => {
    try {
      console.log("🔐 Iniciando proceso de re-autenticación y eliminación avanzado");
      
      // Mostrar loading
      Alert.alert("Verificando...", "Por favor espera...", [], { cancelable: false });

      // 1. Obtener la instancia actual de Firebase Auth
      const { auth } = await import('../../firebase-config');
      
      // 2. Verificar que hay un usuario autenticado
      const currentUser = auth.currentUser;
      if (!currentUser || !currentUser.email) {
        Alert.dismissAll?.();
        Alert.alert("Error", "No hay usuario autenticado o email no disponible");
        return;
      }

      console.log("� Estado ANTES de re-autenticación:");
      console.log("- Email:", currentUser.email);
      console.log("- UID:", currentUser.uid);
      console.log("- Última autenticación:", currentUser.metadata?.lastSignInTime);
      console.log("- Timestamp actual:", new Date().toISOString());

      // 3. Crear credenciales para re-autenticación
      const credential = EmailAuthProvider.credential(currentUser.email, password);
      console.log("🔑 Credenciales creadas para re-autenticación");

      // 4. Re-autenticar al usuario
      console.log("🔐 Iniciando re-autenticación...");
      const reauthResult = await reauthenticateWithCredential(currentUser, credential);
      console.log("✅ Re-autenticación exitosa. Resultado:", reauthResult?.user?.uid);

      // 5. Forzar refresh del token ID para asegurar validez
      console.log("🔄 Forzando refresh del token de autenticación...");
      const freshToken = await currentUser.getIdToken(true);
      console.log("🔑 Token refrescado exitosamente:", !!freshToken);

      // 6. Obtener el usuario fresco después de re-autenticación
      const freshUser = auth.currentUser;
      if (!freshUser) {
        Alert.dismissAll?.();
        Alert.alert("Error", "Error obteniendo usuario actualizado después de re-autenticación");
        return;
      }

      console.log("� Estado DESPUÉS de re-autenticación:");
      console.log("- Email:", freshUser.email);
      console.log("- UID:", freshUser.uid);
      console.log("- Última autenticación:", freshUser.metadata?.lastSignInTime);
      console.log("- Token válido:", !!freshToken);

      // 7. Pequeño delay para asegurar que Firebase procese la re-autenticación
      console.log("⏰ Esperando 1 segundo para asegurar sincronización...");
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log("🗑️ Procediendo a eliminar la cuenta del usuario re-autenticado...");

      // 8. Eliminar la cuenta usando el usuario re-autenticado
      await deleteUser(freshUser);
      console.log("✅ Usuario eliminado de Firebase Auth exitosamente");

      // 9. Limpiar datos de AsyncStorage
      await AsyncStorageService.clearAllData();
      console.log("✅ Datos de AsyncStorage limpiados");

      // 10. Cerrar loading y mostrar éxito
      Alert.dismissAll?.();
      setTimeout(() => {
        Alert.alert(
          "✅ Cuenta eliminada",
          "Tu cuenta ha sido eliminada exitosamente. Serás redirigido al inicio de sesión.",
          [
            {
              text: "OK",
              onPress: () => {
                console.log("✅ Cuenta eliminada exitosamente después de re-autenticación avanzada");
              }
            }
          ]
        );
      }, 100);

    } catch (error) {
      console.error("❌ Error en re-autenticación o eliminación avanzada:", error);
      console.error("❌ Error code:", error.code);
      console.error("❌ Error message:", error.message);
      console.error("❌ Stack trace:", error.stack);
      
      // Cerrar loading
      Alert.dismissAll?.();
      
      let errorMessage = "No se pudo completar la operación. ";
      
      switch (error.code) {
        case 'auth/wrong-password':
          errorMessage += "Contraseña incorrecta. Intenta nuevamente.";
          // Permitir reintentar
          setTimeout(() => {
            promptForPassword();
          }, 500);
          return;
        case 'auth/too-many-requests':
          errorMessage += "Demasiados intentos fallidos. Intenta más tarde.";
          break;
        case 'auth/network-request-failed':
          errorMessage += "Error de conexión. Verifica tu internet.";
          break;
        case 'auth/user-mismatch':
          errorMessage += "Error de validación de usuario. Intenta cerrar sesión e iniciar nuevamente.";
          break;
        case 'auth/requires-recent-login':
          errorMessage += "Aún se requiere autenticación reciente. Esto podría ser un problema de configuración. Intenta cerrar sesión, iniciar nuevamente y eliminar la cuenta inmediatamente.";
          break;
        default:
          errorMessage += `Error técnico: ${error.message}`;
      }
      
      setTimeout(() => {
        Alert.alert("❌ Error", errorMessage);
      }, 100);
    } finally {
      // Limpiar estado del modal
      setPassword('');
      setPasswordError('');
    }
  };

  const handlePasswordSubmit = async () => {
    if (!password.trim()) {
      setPasswordError("La contraseña es requerida");
      return;
    }
    
    console.log("🔑 Contraseña ingresada, iniciando re-autenticación");
    setShowPasswordModal(false);
    await reauthenticateAndDelete(password);
  };

  const handlePasswordCancel = () => {
    console.log("❌ Usuario canceló ingreso de contraseña");
    setShowPasswordModal(false);
    setPassword('');
    setPasswordError('');
  };

  return (
    <View style={styles.container}>
      <MainText title="Perfil" />
      <Profile
        name={user?.displayName || user?.email?.split('@')[0] || "Usuario"}
        email={user?.email || "email@ejemplo.com"}
        profileImage={user?.photoURL || "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyZmlsfGVufDB8fDB8fHww"}
      />
      <MainText
        title="General"
        titleSize={20}
        alignItems="flex-start"
        marginTop={0}
      />
      <ToggleProfile
        title="Notificaciones"
        value={notifications}
        onToggle={setNotifications}
        iconName="notifications-outline"
      />
      <ToggleProfile
        title="Modo oscuro"
        value={darkMode}
        onToggle={setDarkMode}
        iconName="moon-outline"
      />
      <MainText
        title="Ayuda"
        titleSize={20}
        alignItems="flex-start"
        marginTop={0}
      />
      <NextPageProfile
        title="Preguntas frecuentes"
        iconName="help-circle-outline"
      />
      <NextPageProfile
        title="Contactar soporte"
        iconName="mail-outline"
      />      
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleSignOut}
        disabled={loading}
      >
        <Text style={styles.logoutText}>
          {loading ? 'Cerrando...' : 'Cerrar sesión'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={handleDeleteAccount}
      >
        <Text style={styles.deleteText}>Eliminar cuenta</Text>
      </TouchableOpacity>

      {/* Modal para solicitar contraseña */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPasswordModal}
        onRequestClose={handlePasswordCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar contraseña</Text>
            <TextInput
              style={styles.passwordInput}
              placeholder="Ingresa tu contraseña"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={handlePasswordSubmit}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={handlePasswordCancel}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  logoutButton: {
    marginTop: 12,
    marginLeft: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  logoutText: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'left',
  },  deleteButton: {
    marginTop: 12,
    marginLeft: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 4,
  },  deleteText: {
    color: '#FF6B6B', // Color rojo para indicar acción destructiva
    fontSize: 16,
    textAlign: 'left',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },  modalContent: {
    width: '80%',
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.text,
  },
  passwordInput: {
    height: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 12,
    color: colors.text,
    backgroundColor: colors.background,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingVertical: 10,
    marginRight: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F44336',
    borderRadius: 4,
    paddingVertical: 10,
  },  buttonText: {
    color: colors.cardBackground,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginBottom: 12,
  },
});
