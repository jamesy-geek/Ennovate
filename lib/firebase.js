import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCuLN0g8bQt5htAI9naibnU6g5luttTK7I",
  authDomain: "ennovate-admin-portal-2026.firebaseapp.com",
  projectId: "ennovate-admin-portal-2026",
  storageBucket: "ennovate-admin-portal-2026.firebasestorage.app",
  messagingSenderId: "295840633110",
  appId: "1:295840633110:web:d0553b469560b43bc9c037"
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
