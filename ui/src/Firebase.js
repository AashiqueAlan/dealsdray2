// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth,GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCu3KztzDXqWSRkKTJQb0k0cPK5WgYtFuE",
  authDomain: "park-it-35aa8.firebaseapp.com",
  databaseURL: "https://park-it-35aa8-default-rtdb.firebaseio.com",
  projectId: "park-it-35aa8",
  storageBucket: "park-it-35aa8.appspot.com",
  messagingSenderId: "145271158950",
  appId: "1:145271158950:web:872eb8e419a309f190dc67",
  measurementId: "G-0TGJ3K37EK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const AuthProvider = new GoogleAuthProvider();
export { storage };

export default app;
