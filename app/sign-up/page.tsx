"use client";

import Nav from "@/components/Nav";
import SignUp from "@/components/SignUp";
import { auth } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Page() {
    const [user] = useAuthState(auth);

    return (
        <div className="flex flex-col items-center min-w-screen min-h-screen">
            <Nav user={user} />
            <div className="flex justify-center items-center flex-1">
                <div className="bg-sky-blue rounded-2xl p-5 w-[600px]">
                    <SignUp />
                </div>
            </div>
        </div>
    );
}
