import { auth } from "@/config/firebase";
import { signInWithPopup, GoogleAuthProvider, Auth } from "firebase/auth";

export default function SignIn() {
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider);
    };

    return <button onClick={signInWithGoogle}>Log in with Google</button>;
}
