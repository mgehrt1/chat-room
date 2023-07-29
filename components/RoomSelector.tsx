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
        <section className="flex flex-col">
            <h2 className="text-navy text-2xl mt-4">Create a room with a custom ID to share with your friends!</h2>
            <form onSubmit={createSubmit} className="flex">
                <input type="text" name="createId" placeholder="Create custom ID" onChange={(e) => setCreateId(e.target.value)} className="border-2 rounded-md w-2/3 mr-2 pl-1 py-2" />
                <button className="bg-light-blue text-white-blue border-2 rounded-md w-1/3 px-1 py-2">Create</button>
            </form>
            {!createSuccess && <p>Room id already in use</p>}
            <h2 className="text-navy text-2xl mt-4">Enter a room ID to join and chat!</h2>
            <form onSubmit={joinSubmit} className="flex mt-2">
                <input type="text" name="joinId" placeholder="Join with room ID" onChange={(e) => setJoinId(e.target.value)} className="border-2 rounded-md w-2/3 mr-2 pl-1 py-2" />
                <button className="bg-green-500 text-white-blue border-2 rounded-md w-1/3 px-1 py-2">Join</button>
            </form>
            {!joinSuccess && <p>Invalid room id</p>}
        </section>
    );
}
