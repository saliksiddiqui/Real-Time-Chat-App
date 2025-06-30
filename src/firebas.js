// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsyHET3vutmoIHJO2hRz3b4pP9KlowodQ",
  authDomain: "chat-93019.firebaseapp.com",
  projectId: "chat-93019",
  storageBucket: "chat-93019.firebasestorage.app",
  messagingSenderId: "832703695424",
  appId: "1:832703695424:web:0142ab06910c75698a2da5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth= getAuth();
export const db= getFirestore();