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
            <Nav user={user} />
            <div className="flex justify-center items-center flex-1 w-full">
                <div className="bg-sky-blue rounded-2xl p-5 sm:w-[600px] w-full">{user ? <RoomSelector /> : <SignIn />}</div>
            </div>
        </div>
    );
}
