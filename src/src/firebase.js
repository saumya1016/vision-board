// Import the functions you need from the SDKs you need
// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and export the auth object
export const auth = getAuth(app); // Export the auth object
export default app; // Optionally export app for future use (e.g., Firestore, Analytics)
export const db = getFirestore(app); 