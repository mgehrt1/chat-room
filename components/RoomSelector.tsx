import { useState } from "react";

export default function RoomSelector() {
    const [createId, setCreateId] = useState("");
    const [joinId, setJoinId] = useState("");
    const [createSuccess, setCreateSuccess] = useState(true);
    const [joinSuccess, setJoinSuccess] = useState(true);

    const createSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const joinSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div>
            <form onSubmit={createSubmit}>
                <input type="text" />
                <button>Create</button>
            </form>
            <form onSubmit={joinSubmit}>
                <input type="text" />
                <button>Join</button>
            </form>
        </div>
    );
}
