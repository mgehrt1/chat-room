import { Firestore } from "firebase/firestore";
import { useState } from "react";

interface Props {
    db: Firestore;
}

export default function RoomSelector({ db }: Props) {
    const [roomId, setRoomId] = useState("");
    const [createSuccess, setCreateSuccess] = useState(true);
    const [joinSuccess, setJoinSuccess] = useState(true);

    const createSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const room = parseInt(roomId);

        if (!isNaN(room)) {
            //redirect to room
        }
    };

    const joinSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const room = parseInt(roomId);

        if (!isNaN(room)) {
            //redirect to room
        }
    };

    return (
        <div>
            <form onSubmit={createSubmit}>
                <input type="text" />
                <input type="submit" value="Create" />
            </form>
            <form onSubmit={joinSubmit}>
                <input type="text" />
                <input type="submit" value="Join" />
            </form>
        </div>
    );
}
