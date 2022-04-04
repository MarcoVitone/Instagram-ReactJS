import { initializeApp } from "firebase/app";
import{ getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyBh4tU3XowDZViy77Sna6pRRxN6IRcsBVk",
    authDomain: "instagram-8a4cf.firebaseapp.com",
    databaseURL: "https://instagram-8a4cf-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "instagram-8a4cf",
    storageBucket: "instagram-8a4cf.appspot.com",
    messagingSenderId: "444564296897",
    appId: "1:444564296897:web:a9dcdba7d7ed606067b040"
  };

  const app = initializeApp(firebaseConfig);
  
  export const storage = getStorage(app);
  export const auth = getAuth(app);
  export const database = getDatabase(app);