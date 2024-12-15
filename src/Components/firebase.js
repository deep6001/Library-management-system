import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVB-T61AeOyZfK38bcuRhqq34oD-x-svs",
  authDomain: "se-project-b28da.firebaseapp.com",
  projectId: "se-project-b28da",
  storageBucket: "se-project-b28da.appspot.com",
  messagingSenderId: "482981187716",
  appId: "1:482981187716:web:73f4d1988e41f0e33f32d1",
  measurementId: "G-LNQ62S1LGV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { app, db };
