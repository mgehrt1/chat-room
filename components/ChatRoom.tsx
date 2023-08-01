import { db, auth } from "@/config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";

interface Props {
    roomId: string;
}

export default function ChatRoom({ roomId }: Props) {
    const [rooms] = useCollection(collection(db, "rooms"));
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
                    {messages && messages.docs.map((doc) => <Message key={doc.id} msg={doc.data()} />)}

                    <form onSubmit={sendMessage}>
                        <input type="text" name="text" placeholder="Message" value={text} onChange={(e) => setText(e.target.value)} className="outline-0 border-2 rounded-xl pl-2" />
                        <button>Send</button>
                    </form>
                </div>
            ) : (
                <h1>Room doesn't exist</h1>
            )}
        </div>
    );
}
