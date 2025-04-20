// src/firebase/config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Use Realtime Database instead of Firestore

const firebaseConfig = {
    apiKey: "AIzaSyDvFlGnIgO35Xabf4CDkRdO2A2AvZrXC9c",
    authDomain: "launchpad-b3cc3.firebaseapp.com",
    projectId: "launchpad-b3cc3",
    storageBucket: "launchpad-b3cc3.firebasestorage.app",
    messagingSenderId: "281009258400",
    appId: "1:281009258400:web:eee513b9508d977f3baec5",
    measurementId: "G-BV0CET1SXG",
    databaseURL: "https://launchpad-b3cc3-default-rtdb.firebaseio.com" // Add this line
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app); // Initialize Realtime Database

export { auth, db };
