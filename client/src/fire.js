// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_Y,
    authDomain: "uplaod-6c6c3.firebaseapp.com",
    projectId: "uplaod-6c6c3",
    storageBucket: "uplaod-6c6c3.appspot.com",
    messagingSenderId: "1053388282308",
    appId: "1:1053388282308:web:d03f19c1e070cb15696c91"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);