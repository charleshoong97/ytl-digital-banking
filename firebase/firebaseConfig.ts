import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
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
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
