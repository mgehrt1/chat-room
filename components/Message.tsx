import { DocumentData } from "firebase/firestore";

interface Props {
    msg: DocumentData;
}

export default function Message({ msg }: Props) {
    const { text, createdAt, uid, photoURL }: DocumentData = msg;

    return (
        <div>
            <img src={photoURL} />
            <p>{text}</p>
        </div>
    );
}
