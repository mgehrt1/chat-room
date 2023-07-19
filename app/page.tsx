"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

import RoomSelector from "@/components/RoomSelector";
import SignIn from "@/components/SignIn";
import SignOut from "@/components/SignOut";

export default function App() {
    const [user] = useAuthState(auth);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen min-w-screen">
            <div className="flex flex-col border-2 rounded-2xl p-5">
                {user ? <RoomSelector /> : <SignIn />}
                <SignOut />
            </div>
        </div>
    );
}
