// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "auth2-57105.firebaseapp.com",
//   projectId: "auth2-57105",
//   storageBucket: "auth2-57105.appspot.com",
//   messagingSenderId: "461383576128",
//   appId: "1:461383576128:web:56c12a3b42259207830da5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const imageDb = getStorage(app)
/////////////////////////////////////////////////


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
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

