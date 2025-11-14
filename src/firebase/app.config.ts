// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9kRBIarz_S4qfYgjJkH9WwU373jKziXk",
  authDomain: "etherbill-82e27.firebaseapp.com",
  projectId: "etherbill-82e27",
  storageBucket: "etherbill-82e27.firebasestorage.app",
  messagingSenderId: "853334583474",
  appId: "1:853334583474:web:492b1f493e5fb0a66e81ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const roomsRef = collection(db, "rooms");
