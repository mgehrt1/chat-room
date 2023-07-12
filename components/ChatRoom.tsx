import { doc, setDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface Props {
    roomId: string;
}

export default function ChatRoom({ roomId }: Props) {
    // const messagesRef = firestore.collection("messages");

    return <h1>{roomId}</h1>;
}
