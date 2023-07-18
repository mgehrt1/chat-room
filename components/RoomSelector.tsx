import { db } from "@/config/firebase";
import { collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function RoomSelector() {
    const [createId, setCreateId] = useState("");
    const [joinId, setJoinId] = useState("");
    const [createSuccess, setCreateSuccess] = useState(true);
    const [joinSuccess, setJoinSuccess] = useState(true);
    const [roomsList, setRoomsList] = useState<{ id: string }[]>([]);

    const roomsColRef = collection(db, "rooms");

    const getRooms = async () => {
        try {
            const data = await getDocs(roomsColRef);
            const rooms = data.docs.map((doc) => ({
                id: doc.id,
            }));
            setRoomsList(rooms);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getRooms();
    }, []);

    const createSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (roomsList.some((room) => room.id === createId)) {
            setCreateSuccess(false);
        } else {
            try {
                await setDoc(doc(db, "rooms", createId), {});

                getRooms();

                roomsList.map(async (room) => {
                    if (room.id === createId) {
                        await setDoc(doc(db, `rooms/${room.id}/messages`, "ignore"), {
                            message: "test",
                            createdAt: serverTimestamp(),
                        });
                    }
                });
            } catch (error) {
                console.error(error);
            }

            setCreateSuccess(true);
            // redirect to new room
        }
    };

    const joinSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(roomsList);
        if (roomsList.some((room) => room.id === joinId)) {
            setJoinSuccess(true);
            // redirect to room
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
