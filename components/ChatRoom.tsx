import { db, auth } from "@/config/firebase";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useCollection, useCollectionData, useCollectionDataOnce } from "react-firebase-hooks/firestore";
import Message from "./Message";

interface Props {
    roomId: string;
}

export default function ChatRoom({ roomId }: Props) {
    const [rooms, load, err, snapshot] = useCollectionDataOnce(collection(db, "rooms"));
    const [text, setText] = useState("");
    const [messages, loading, error] = useCollectionData(collection(db, `rooms/${roomId}/messages`));
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

    let exists: boolean | undefined = rooms?.some((room) => room.roomId == roomId);

    return (
        <div>
            {exists ? (
                <div>
                    <h1>Chat</h1>
                    <form onSubmit={sendMessage}>
                        <input type="text" name="text" placeholder="message" value={text} onChange={(e) => setText(e.target.value)} />
                        <button>Send</button>
                    </form>
                    {messages && messages.map((msg) => <Message key={msg.id} msg={msg} />)}
                </div>
            ) : (
                <h1>Room doesn't exist</h1>
            )}
        </div>
    );
}
