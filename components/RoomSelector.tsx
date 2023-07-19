import { db } from "@/config/firebase";
import { collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RoomSelector() {
    const router = useRouter();
    const [createId, setCreateId] = useState("");
    const [joinId, setJoinId] = useState("");
    const [createSuccess, setCreateSuccess] = useState(true);
    const [joinSuccess, setJoinSuccess] = useState(true);
    const [roomsList, setRoomsList] = useState<{ id: string }[]>([]);

    const getRooms = async () => {
        const roomsColRef = collection(db, "rooms");
        const data = await getDocs(roomsColRef);
        const rooms = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        setRoomsList(rooms);
    };

    useEffect(() => {
        getRooms();
    }, []);

    const createSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (roomsList.some((room) => room.id === createId)) {
            setCreateSuccess(false);
        } else {
            await setDoc(doc(db, "rooms", createId), {
                roomId: createId,
            });

            getRooms();
            setCreateSuccess(true);

            router.push(`room/${createId}`);
        }
    };

    const joinSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (roomsList.some((room) => room.id === joinId)) {
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
