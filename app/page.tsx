"use client";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAl-wJQkOgpAN0SdElFosJ8iwN56J7ZKH8",
    authDomain: "chat-app-f86ee.firebaseapp.com",
    projectId: "chat-app-f86ee",
    storageBucket: "chat-app-f86ee.appspot.com",
    messagingSenderId: "432987509374",
    appId: "1:432987509374:web:22e74eb5cf0d0c12c87e2f",
    measurementId: "G-13FCPZY8RS",
};

import RoomSelector from "../components/RoomSelector";
import SignIn from "../components/SignIn";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App() {
    const [user] = useAuthState(auth);

    return <section>{user ? <RoomSelector /> : <SignIn />}</section>;
}
