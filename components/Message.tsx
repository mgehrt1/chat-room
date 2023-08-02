import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

import { DocumentData } from "firebase/firestore";

interface Props {
    msg: DocumentData;
}

export default function Message({ msg }: Props) {
    const [user] = useAuthState(auth);
    const { text, uid, photoURL }: DocumentData = msg;

    const userId: string | null = user?.uid.toString() ?? null;
    const isCurrentUserMessage = uid === userId;

    return isCurrentUserMessage ? (
        <div className="flex justify-end items-center my-2">
            <p className="bg-light-blue rounded-3xl text-xl text-white-blue py-2 px-4 ml-[26rem]">{text}</p>
            <img src={photoURL} className="rounded-full w-10 h-10 ml-2" />
        </div>
    ) : (
        <div className="flex justify-start items-center my-2">
            <img src={photoURL} className="rounded-full w-10 h-10 mr-2" />
            <p className="bg-gray-200 rounded-3xl text-xl py-2 px-4 mr-[26rem]">{text}</p>
        </div>
    );
}
