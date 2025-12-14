// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDpyOLOZGN0M15NdwbtyyAAJ8nmdMmpeMg",
  authDomain: "curease-c5978.firebaseapp.com",
  projectId: "curease-c5978",
  storageBucket: "curease-c5978.firebasestorage.app",
  messagingSenderId: "718939265344",
  appId: "1:718939265344:web:a099c5727d3fef38d642a5",
  measurementId: "G-0TG1FNKS28"
};

// Initialize
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firebaseDb = getFirestore(app);
export const storage = getStorage(app);


