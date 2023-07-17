import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";

export default function RoomSelector() {
    const [createId, setCreateId] = useState("");
    const [joinId, setJoinId] = useState("");
    const [createSuccess, setCreateSuccess] = useState(true);
    const [joinSuccess, setJoinSuccess] = useState(true);

    const createSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Create a room doc with an empty messages collection
    };

    const joinSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const docRef = doc(db, "rooms", joinId);
        try {
            const docSnap = await getDoc(docRef);
            console.log(docSnap);
            if (docSnap.exists()) {
                console.log(docSnap.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={createSubmit}>
                <input type="text" name="createId" onChange={(e) => setCreateId(e.target.value)} />
                <button>Create</button>
            </form>
            <form onSubmit={joinSubmit}>
                <input type="text" name="joinId" onChange={(e) => setJoinId(e.target.value)} />
                <button>Join</button>
            </form>
        </div>
    );
}
