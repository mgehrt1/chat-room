import { db, auth } from "@/config/firebase";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useCollection, useCollectionOnce, useCollectionDataOnce } from "react-firebase-hooks/firestore";
import Message from "./Message";

interface Props {
    roomId: string;
}

export default function ChatRoom({ roomId }: Props) {
    const [rooms] = useCollectionOnce(collection(db, "rooms"));
    const [text, setText] = useState("");
    const [messages] = useCollection(collection(db, `rooms/${roomId}/messages`));
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
        <div>
            {exists ? (
                <div>
                    <h1>Chat</h1>
                    <form onSubmit={sendMessage}>
                        <input type="text" name="text" placeholder="message" value={text} onChange={(e) => setText(e.target.value)} />
                        <button>Send</button>
                    </form>
                    {messages && messages.docs.map((doc) => <Message key={doc.id} msg={doc} />)}
                </div>
            ) : (
                <h1>Room doesn't exist</h1>
            )}
        </div>
    );
}
