import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY_Hassna,
  authDomain: "test-ece28.firebaseapp.com",
  projectId: "test-ece28",
  storageBucket: "test-ece28.appspot.com",
  messagingSenderId: "906112058753",
  appId: "1:906112058753:web:22da83373a5e210dff5480"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imageDb = getStorage(app);

export {app, imageDb}  ;

