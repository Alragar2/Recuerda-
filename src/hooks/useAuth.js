import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe;
    
    const initializeAuth = async () => {
      try {
        // Importación dinámica para asegurar que Firebase esté inicializado
        const { auth } = await import('../../firebase-config');
        
        // Pequeño delay para asegurar que Firebase esté completamente inicializado
        await new Promise(resolve => setTimeout(resolve, 100));
        
        unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          setUser(firebaseUser);
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
  }, []);
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const { auth } = await import('../../firebase-config');
      const result = await signInWithEmailAndPassword(auth, email, password);
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
