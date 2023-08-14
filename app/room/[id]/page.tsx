"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "@/config/firebase";

import ChatRoom from "@/components/ChatRoom";
import Nav from "@/components/Nav";
import SignIn from "@/components/SignIn";
import { GetStaticPaths, GetStaticProps } from "next";
import { collection, getDocs } from "firebase/firestore";

export default function Room({ room }: { room: { id: string } }) {
    const [user] = useAuthState(auth);

    return (
        <div className="flex flex-col items-center h-screen">
            <Nav user={user} />
            {user ? (
                <ChatRoom roomId={room.id} />
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

export const getStaticPaths: GetStaticPaths = async () => {
    const querySnapshot = await getDocs(collection(db, "rooms"));

    const paths = querySnapshot.docs.map((doc) => ({
        params: { id: doc.id },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const roomId = context.params?.id || "";
    // Get post detail via API, file, etc.
    const room = { id: roomId }; // Example
    return { props: { room } };
};
