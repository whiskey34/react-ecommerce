// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeqf5yrmb6WcoxnHnR9MxeDBxm8hagJzE",
  authDomain: "ecommerce-react-aea1a.firebaseapp.com",
  projectId: "ecommerce-react-aea1a",
  storageBucket: "ecommerce-react-aea1a.appspot.com",
  // storageBucket: "ecommerce-react-aea1a.firebasestorage.app",
  messagingSenderId: "737313449147",
  appId: "1:737313449147:web:d298bec5c7d2258ad1f59e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth for use in components
export const auth = getAuth(app);
export const db = getFirestore(app);