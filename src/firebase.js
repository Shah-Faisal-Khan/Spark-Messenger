import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCTlLuItcDIZtjfSmUdHZbK9lU2eaHJHbI",
  authDomain: "spark-f2ded.firebaseapp.com",
  projectId: "spark-f2ded",
  storageBucket: "spark-f2ded.appspot.com",
  messagingSenderId: "64882691089",
  appId: "1:64882691089:web:17b29caf7d6f183fbb75b0",
  measurementId: "G-71959CT8KF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage(app);
export const db = getFirestore(app);
