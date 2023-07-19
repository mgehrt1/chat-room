import { DocumentData } from "firebase/firestore";
import { StringLiteral } from "typescript";

interface Props {
    msg: DocumentData;
}

export default function Message({ msg }: Props) {
    console.log(msg);
    const { text, createdAt, uid, photoURL }: DocumentData = msg;

    return (
        <div>
            <img src={photoURL} />
            <p>{text}</p>
        </div>
    );
}
