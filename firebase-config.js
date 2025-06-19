// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

// Inicializar Auth de forma simple
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };