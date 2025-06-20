import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import AsyncStorageService from '../services/asyncStorageServiceAlt';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let unsubscribe;
      const initializeAuth = async () => {
      try {
        // Test AsyncStorage functionality
        const isAsyncStorageWorking = await AsyncStorageService.testConnection();
        
        // Verificar si hay datos guardados en AsyncStorage
        const savedUserData = await AsyncStorageService.getUserData();
        const isLoggedIn = await AsyncStorageService.getLoginStatus();
        
        if (savedUserData && isLoggedIn) {
          setUser(savedUserData);
        }
        
        // Importación dinámica para asegurar que Firebase esté inicializado
        const { auth } = await import('../../firebase-config');
        
        // Pequeño delay para asegurar que Firebase esté completamente inicializado
        await new Promise(resolve => setTimeout(resolve, 100));
        
        unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            // Usuario autenticado, guardar en AsyncStorage
            const userData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              emailVerified: firebaseUser.emailVerified
            };
            
            await AsyncStorageService.saveUserData(userData);
            await AsyncStorageService.saveLoginStatus(true);
            
            if (firebaseUser.accessToken) {
              await AsyncStorageService.saveAuthToken(firebaseUser.accessToken);
            }
            
            setUser(firebaseUser);
          } else {
            // Usuario no autenticado, limpiar AsyncStorage
            await AsyncStorageService.clearAuthData();
            setUser(null);
          }
          
          setInitializing(false);
          setError(null);
        }, (authError) => {
          console.error('Error en onAuthStateChanged:', authError);
          setError(authError);
          setInitializing(false);
        });
      } catch (initError) {
        console.error('Error al inicializar auth:', initError);
        setError(initError);
        setInitializing(false);
      }
    };

    initializeAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const { auth } = await import('../../firebase-config');
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Guardar datos en AsyncStorage
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        emailVerified: result.user.emailVerified
      };
      
      await AsyncStorageService.saveUserData(userData);
      await AsyncStorageService.saveLoginStatus(true);
      
      if (result.user.accessToken) {
        await AsyncStorageService.saveAuthToken(result.user.accessToken);
      }
      
      setUser(result.user);
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };
  const signUp = async (email, password, name) => {
    setLoading(true);
    try {
      const { auth } = await import('../../firebase-config');
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Guardar datos en AsyncStorage incluyendo el nombre
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: name || result.user.displayName,
        photoURL: result.user.photoURL,
        emailVerified: result.user.emailVerified
      };
      
      await AsyncStorageService.saveUserData(userData);
      await AsyncStorageService.saveLoginStatus(true);
      
      if (result.user.accessToken) {
        await AsyncStorageService.saveAuthToken(result.user.accessToken);
      }
      
      setUser(result.user);
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };
  const signOut = async () => {
    setLoading(true);
    try {
      const { auth } = await import('../../firebase-config');
      await firebaseSignOut(auth);
      
      // Limpiar datos de AsyncStorage
      await AsyncStorageService.clearAuthData();
      
      setUser(null);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };
  return {
    user,
    loading,
    initializing,
    error,
    signIn,
    signUp,
    signOut
  };
};
