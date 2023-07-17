import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAl-wJQkOgpAN0SdElFosJ8iwN56J7ZKH8",
    authDomain: "chat-app-f86ee.firebaseapp.com",
    projectId: "chat-app-f86ee",
    storageBucket: "chat-app-f86ee.appspot.com",
    messagingSenderId: "432987509374",
    appId: "1:432987509374:web:22e74eb5cf0d0c12c87e2f",
    measurementId: "G-13FCPZY8RS",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
