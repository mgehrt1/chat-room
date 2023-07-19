import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";

export default function SignOut() {
    return (
        auth.currentUser && (
            <button onClick={() => signOut(auth)} className="border-2 rounded-lg mt-2">
                Log Out
            </button>
        )
    );
}
