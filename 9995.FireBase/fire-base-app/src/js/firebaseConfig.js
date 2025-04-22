import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDNm4dDHAzc4tNBxEXrG83zqmpzd6EwjvQ",
    authDomain: "my-first-app-6018f.firebaseapp.com",
    projectId: "my-first-app-6018f",
    storageBucket: "my-first-app-6018f.firebasestorage.app",
    messagingSenderId: "38739528676",
    appId: "1:38739528676:web:e892507c102876f99715f1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

