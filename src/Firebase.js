import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_APP_KEY}`,
  authDomain: "authentication-test-e9163.firebaseapp.com",
  projectId: "authentication-test-e9163",
  storageBucket: "authentication-test-e9163.appspot.com",
  messagingSenderId: "908207409533",
  appId: "1:908207409533:web:a934d63cab40b8e6c2a414",
  measurementId: `${process.env.REACT_APP_ID}`,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
