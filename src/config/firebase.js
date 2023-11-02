import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC9IOa5pd1LTNzKewkhRDnAHW3xfEvAZ5k",
  authDomain: "social-media-project-7c026.firebaseapp.com",
  projectId: "social-media-project-7c026",
  storageBucket: "social-media-project-7c026.appspot.com",
  messagingSenderId: "785764144846",
  appId: "1:785764144846:web:17687daf40db0fef7fe29f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
