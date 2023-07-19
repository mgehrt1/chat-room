import { db, auth } from "@/config/firebase";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

interface Props {
    roomId: string;
}

export default function ChatRoom({ roomId }: Props) {
    const [text, setText] = useState("");
    const [messages, loading, error] = useCollection(collection(db, `rooms/${roomId}/messages`));
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

    return (
        <div>
            <h1>Chat</h1>
            <form onSubmit={sendMessage}>
                <input type="text" name="text" placeholder="message" onChange={(e) => setText(e.target.value)} />
                <button>Send</button>
            </form>

            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {messages && (
                <div>
                    {messages.docs.map((doc) => (
                        <p key={doc.id}>{doc.data().text}</p>
                    ))}
                </div>
            )}
        </div>
    );
}
