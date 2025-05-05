// Import the functions you need from the SDKs you need
// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnQwH4vXui-ChcRcNBO4wvR-dj-ImCjSU",
  authDomain: "my-vision-board-aa93b.firebaseapp.com",
  projectId: "my-vision-board-aa93b",
  storageBucket: "my-vision-board-aa93b.firebasestorage.app",
  messagingSenderId: "474778261714",
  appId: "1:474778261714:web:958cc284c6f9a94b44b50b",
  measurementId: "G-4LCK3X2KW4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and export the auth object
export const auth = getAuth(app); // Export the auth object
export default app; // Optionally export app for future use (e.g., Firestore, Analytics)
export const db = getFirestore(app); 