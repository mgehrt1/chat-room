"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

import ChatRoom from "@/components/ChatRoom";
import Nav from "@/components/Nav";
import SignIn from "@/components/SignIn";

interface Props {
    roomId: string;
}

export default function Room({ roomId }: Props) {
    const [user] = useAuthState(auth);

    return (
        <div className="flex flex-col items-center h-screen">
            <Nav user={user} />
            {user ? (
                <ChatRoom roomId={roomId} />
            ) : (
                <div className="flex justify-center items-center flex-1 w-full">
                    <div className="bg-sky-blue rounded-2xl p-5 sm:w-[600px] w-full">
                        <SignIn />
                    </div>
                </div>
            )}
        </div>
    );
}
