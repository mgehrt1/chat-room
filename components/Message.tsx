import { DocumentData } from "firebase/firestore";

interface Props {
    key: string;
    msg: DocumentData;
}

export default function Message({ key, msg }: Props) {
    return (
        <div>
            <p key={key}>{msg.text}</p>
        </div>
    );
}
