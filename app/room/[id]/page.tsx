"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

import ChatRoom from "@/components/ChatRoom";
import Nav from "@/components/Nav";
import NotLoggedIn from "@/components/NotLoggedIn";

export default function Room({ params }: { params: { id: string } }) {
    const [user] = useAuthState(auth);

    return (
        <div className="flex flex-col items-center h-screen">
            <Nav user={user} />
            {user ? <ChatRoom roomId={params.id} /> : <NotLoggedIn />}
        </div>
    );
}
