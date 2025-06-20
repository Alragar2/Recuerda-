// firebase.js

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import getAsyncStorage, { isAsyncStorageAvailable } from "./src/utils/asyncStorageUtils";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCE2n-u0Px-agGuPTXRVKbyiGGqeOPyjgk",
  authDomain: "recuerdamas-fd8d7.firebaseapp.com",
  projectId: "recuerdamas-fd8d7",
  storageBucket: "recuerdamas-fd8d7.firebasestorage.com",
  messagingSenderId: "525013445421",
  appId: "1:525013445421:web:874808fd8ab19fcf3401a4",
  measurementId: "G-T99LGR5LTM"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth con persistencia AsyncStorage para React Native
let auth;
try {
  if (isAsyncStorageAvailable()) {
    // Inicializar con persistencia AsyncStorage
    const AsyncStorage = getAsyncStorage();
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
    console.log('✅ Firebase Auth inicializado con AsyncStorage persistence');
  } else {
    // Fallback a auth simple si AsyncStorage no está disponible
    auth = getAuth(app);
    console.warn('⚠️ Firebase Auth inicializado sin AsyncStorage persistence');
  }
} catch (error) {
  console.warn('❌ Error inicializando Firebase Auth con AsyncStorage, usando fallback:', error);
  auth = getAuth(app);
}

const db = getFirestore(app);

export { app, auth, db };