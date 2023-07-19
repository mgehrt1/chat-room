import { db } from "@/config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";

export default function RoomSelector() {
    const router = useRouter();
    const [createId, setCreateId] = useState("");
    const [joinId, setJoinId] = useState("");
    const [createSuccess, setCreateSuccess] = useState(true);
    const [joinSuccess, setJoinSuccess] = useState(true);
    const [rooms] = useCollection(collection(db, "rooms"));

    const createSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (rooms?.docs.some((doc) => doc.id === createId)) {
            setCreateSuccess(false);
        } else {
            await setDoc(doc(db, "rooms", createId), {});
            setCreateSuccess(true);
            router.push(`room/${createId}`);
        }
    };

    const joinSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (rooms?.docs.some((doc) => doc.id === joinId)) {
            setJoinSuccess(true);
            router.push(`room/${joinId}`);
        } else {
            setJoinSuccess(false);
        }
    };

    return (
        <div className="flex flex-col">
            <form onSubmit={createSubmit} className="flex">
                <input type="text" name="createId" placeholder="Create custom ID" onChange={(e) => setCreateId(e.target.value)} className="border-2 rounded-md mr-2 pl-1" />
                {!createSuccess && <p>Room id already in use</p>}
                <button className="border-2 rounded-md w-full px-1">Create</button>
            </form>
            <form onSubmit={joinSubmit} className="flex mt-2">
                <input type="text" name="joinId" placeholder="Join with room ID" onChange={(e) => setJoinId(e.target.value)} className="border-2 rounded-md mr-2 pl-1" />
                {!joinSuccess && <p>Invalid room id</p>}
                <button className="border-2 rounded-md w-full px-1">Join</button>
            </form>
        </div>
    );
}
