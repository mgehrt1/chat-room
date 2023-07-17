import { collection } from "firebase/firestore";

interface Props {
    roomId: string;
}

export default function ChatRoom({ roomId }: Props) {
    return <h1>{roomId}</h1>;
}
