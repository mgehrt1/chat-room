import { db, auth } from "@/config/firebase";
import { addDoc, collection, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import Link from "next/link";
import NoRoom from "./NoRoom";

interface Props {
    roomId: string;
}

export default function ChatRoom({ roomId }: Props) {
    const [rooms] = useCollection(collection(db, "rooms"));
    const [text, setText] = useState("");
    const [messages] = useCollection(query(collection(db, `rooms/${roomId}/messages`), orderBy("createdAt"), limit(50)));
    const dummy = useRef();
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

        dummy.current.scrollIntoView({ beavior: "smooth" });
    };

    let exists: boolean | undefined = rooms?.docs.some((doc) => doc.id == roomId);

    return (
        <>
            {exists ? (
                <>
                    <div className="sticky flex md:flex-row flex-col justify-center items-center bg-green-400 text-lg w-full p-2">
                        <h1>
                            Let others join with code <span className="text-red-500">{roomId}</span> or with this link
                        </h1>
                        <Link href={`/room/${roomId}`} className="text-blue-500 ml-1">
                            {window.location.href}
                        </Link>
                    </div>
                    <div className="flex flex-col w-full h-full overflow-y-scroll xl:px-48 lg:px-24 pb-16">
                        <div className="flex-grow w-full px-5">{messages && messages.docs.map((doc) => <Message key={doc.id} msg={doc.data()} />)}</div>
                        <div ref={dummy}></div>
                    </div>
                    <div className="sticky flex items-center bg-sky-blue h-24 w-full xl:px-48 lg:px-24">
                        <form onSubmit={sendMessage} className="flex gap-2 w-full px-9">
                            <input type="text" name="text" placeholder="Message" value={text} onChange={(e) => setText(e.target.value)} autoComplete="off" className="outline-0 border-2 rounded-3xl placeholder:text-xl w-full py-2 px-4" />
                            <button className="bg-green-500 rounded-3xl text-xl py-2 px-14">Send</button>
                        </form>
                    </div>
                </>
            ) : (
                <NoRoom />
            )}
        </>
    );
}
