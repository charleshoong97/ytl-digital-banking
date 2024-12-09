import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ytl-digital-banking.firebaseapp.com",
  //   databaseURL: "https://project-id.firebaseio.com",
  projectId: "ytl-digital-banking",
  storageBucket: "ytl-digital-banking.firebasestorage.app",
  messagingSenderId: "471018437711",
  appId: "1:471018437711:web:8495d850f13c45100f7e3a",
  //   measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
