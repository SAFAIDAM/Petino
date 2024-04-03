// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "auth2-57105.firebaseapp.com",
  projectId: "auth2-57105",
  storageBucket: "auth2-57105.appspot.com",
  messagingSenderId: "461383576128",
  appId: "1:461383576128:web:56c12a3b42259207830da5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);