// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChc1u4f_vxJ9hsWp2SbGSxnTNULIPIW7E",
  authDomain: "project04-itviec.firebaseapp.com",
  projectId: "project04-itviec",
  storageBucket: "project04-itviec.appspot.com",
  messagingSenderId: "7757497190",
  appId: "1:7757497190:web:b88771b91f059419d93ea7",
  measurementId: "G-SNL38VD69M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
const timestamp = serverTimestamp();
export { app, db, auth, timestamp, provider };
export const storage = getStorage(app);
export default app;
