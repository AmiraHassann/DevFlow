import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdWBy0buT1YJ3UoLi8wUecOYijG448ciE",
  authDomain: "devflow-c444d.firebaseapp.com",
  projectId: "devflow-c444d",
  storageBucket: "devflow-c444d.firebasestorage.app",
  messagingSenderId: "210773295008",
  appId: "1:210773295008:web:bf31a6a9ff6fdbea766ec5",
  measurementId: "G-WEF50HDVC8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;