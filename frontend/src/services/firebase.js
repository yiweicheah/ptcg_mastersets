import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "pokedexmaster-fc4da.firebaseapp.com",
  projectId: "pokedexmaster-fc4da",
  storageBucket: "pokedexmaster-fc4da.firebasestorage.app",
  messagingSenderId: "51919899994",
  appId: "1:51919899994:web:ced47a2d71fc368774b763",
  measurementId: "G-QKV4JJ2HD1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
