//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyBeZeQW2FfoxYKraBawiGzaTM4dgluNCbQ",
  authDomain: "dbms-project-1b4bc.firebaseapp.com",
  projectId: "dbms-project-1b4bc",
  storageBucket: "dbms-project-1b4bc.appspot.com",
  messagingSenderId: "893231424376",
  appId: "1:893231424376:web:c8df3ba1c6940fa5ad9e8d"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

