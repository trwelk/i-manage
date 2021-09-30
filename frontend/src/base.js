import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
import "firebase/storage"
  
const firebaseConfig = {
    apiKey: "AIzaSyCejLncelL7bbFWSfjl5DCsL7sZbE1M4CM",
    authDomain: "af-proj.firebaseapp.com",
    projectId: "af-proj",
    storageBucket: "af-proj.appspot.com",
    messagingSenderId: "918207507796",
    appId: "1:918207507796:web:61c5693501826f92916cc1"
};

// Initialize Firebase
const firebaseCon = initializeApp(firebaseConfig);
export const storageRef = getStorage(firebaseCon);