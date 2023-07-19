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
        <div>
            <form onSubmit={createSubmit}>
                <input type="text" name="createId" onChange={(e) => setCreateId(e.target.value)} />
                {!createSuccess && <p>Room id already in use</p>}
                <button>Create</button>
            </form>
            <form onSubmit={joinSubmit}>
                <input type="text" name="joinId" onChange={(e) => setJoinId(e.target.value)} />
                {!joinSuccess && <p>Invalid room id</p>}
                <button>Join</button>
            </form>
        </div>
    );
}
