import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";

export default function SignOut() {
    return auth.currentUser && <button onClick={() => signOut(auth)}>Log Out</button>;
}
