"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

import RoomSelector from "@/components/RoomSelector";
import SignIn from "@/components/SignIn";
import SignOut from "@/components/SignOut";

export default function App() {
    const [user] = useAuthState(auth);

    return (
        <div className="min-h-screen min-w-screen">
            {user ? <RoomSelector /> : <SignIn />}
            <SignOut />
        </div>
    );
}
