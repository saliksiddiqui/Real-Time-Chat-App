
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDsyHET3vutmoIHJO2hRz3b4pP9KlowodQ",
  authDomain: "chat-93019.firebaseapp.com",
  projectId: "chat-93019",
  storageBucket: "chat-93019.firebasestorage.app",
  messagingSenderId: "832703695424",
  appId: "1:832703695424:web:0142ab06910c75698a2da5"
};


export const app = initializeApp(firebaseConfig);
export const auth= getAuth();
export const db= getFirestore();