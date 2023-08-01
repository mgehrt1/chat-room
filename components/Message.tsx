import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

import { DocumentData } from "firebase/firestore";

interface Props {
    msg: DocumentData;
}

export default function Message({ msg }: Props) {
    const [user] = useAuthState(auth);
    const { text, createdAt, uid, photoURL }: DocumentData = msg;

    const userId: string | null = user?.uid.toString() ?? null;
    const isCurrentUserMessage = uid === userId;

    return isCurrentUserMessage ? (
        <div className="flex justify-end items-center">
            <p className="text-xl">{text}</p>
            <img src={photoURL} className="rounded-full w-8 h-8 ml-2" />
        </div>
    ) : (
        <div className="flex justify-start items-center">
            <img src={photoURL} className="rounded-full w-8 h-8 mr-2" />
            <p className="text-xl">{text}</p>
        </div>
    );
}
