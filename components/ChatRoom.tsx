import { db, auth } from "@/config/firebase";
import { addDoc, collection, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import Link from "next/link";

interface Props {
    roomId: string;
}

export default function ChatRoom({ roomId }: Props) {
    const [rooms] = useCollection(collection(db, "rooms"));
    const [text, setText] = useState("");
    const [messages] = useCollection(query(collection(db, `rooms/${roomId}/messages`), orderBy("createdAt"), limit(50)));
    const currentUser = auth.currentUser;

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await addDoc(collection(db, `rooms/${roomId}/messages`), {
            text: text,
            createdAt: serverTimestamp(),
            uid: currentUser?.uid,
            photoURL: currentUser?.photoURL,
        });

        setText("");
    };

    let exists: boolean | undefined = rooms?.docs.some((doc) => doc.id == roomId);

    return (
        <>
            {exists ? (
                <>
                    <div className="flex justify-center items-center bg-green-400 text-lg w-full h-10">
                        <h1>
                            Let others join with code <span className="text-red-500">{roomId}</span> or with this link{" "}
                            <Link href={`/room/${roomId}`} className="text-blue-500">
                                {window.location.href}
                            </Link>
                        </h1>
                    </div>
                    <div className="w-full h-full xl:px-[12rem] lg:px-[6rem]">
                        <div className="w-full h-full px-5">{messages && messages.docs.map((doc) => <Message key={doc.id} msg={doc.data()} />)}</div>
                        <form onSubmit={sendMessage} className="flex gap-2 w-full mt-10 px-5">
                            <input type="text" name="text" placeholder="Message" value={text} onChange={(e) => setText(e.target.value)} className="outline-0 border-2 rounded-3xl placeholder:text-xl w-full py-2 px-4" />
                            <button className="bg-green-500 rounded-3xl text-xl py-2 px-14">Send</button>
                        </form>
                    </div>
                </>
            ) : (
                <h1>Room doesn't exist</h1>
            )}
        </>
    );
}
