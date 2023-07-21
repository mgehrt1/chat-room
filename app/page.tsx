"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

import RoomSelector from "@/components/RoomSelector";
import SignIn from "@/components/SignIn";
import SignOut from "@/components/SignOut";
import Nav from "@/components/Nav";

export default function App() {
    const [user] = useAuthState(auth);

    return (
        <div className="flex flex-col items-center min-w-screen min-h-screen">
            <Nav />
            <div className="flex flex-col bg-sky-blue rounded-2xl w-1/3 mt-52 p-5">
                {user ? <RoomSelector /> : <SignIn />}
                <SignOut />
            </div>
        </div>
    );
}
