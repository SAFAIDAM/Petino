// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "petinoo-2fa6d.firebaseapp.com",
  projectId: "petinoo-2fa6d",
  storageBucket: "petinoo-2fa6d.appspot.com",
  messagingSenderId: "100434471315",
  appId: "1:100434471315:web:185cc7277da889ef156066"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);