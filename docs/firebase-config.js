// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-storage.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCQBM2lJabF0jiQeBp0R5RAA0BnGDjZuLY",
    authDomain: "articlex-f2b8f.firebaseapp.com",
    projectId: "articlex-f2b8f",
    storageBucket: "articlex-f2b8f.appspot.com",
    messagingSenderId: "392539639323",
    appId: "1:392539639323:web:2dfbf35b2b4adfa70ef2be",
    measurementId: "G-5E5TYNZJQ9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
