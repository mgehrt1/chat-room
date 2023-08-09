import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";

interface Props {
    visible: boolean;
}

export default function SignOut({ visible }: Props) {
    return (
        auth.currentUser && (
            <button onClick={() => signOut(auth)} className={`${visible ? "block" : "hidden"} absolute top-[4.75rem] right-2 bg-sky-blue border-navy border-[1px] rounded-md px-10 py-2`}>
                Sign Out
            </button>
        )
    );
}
