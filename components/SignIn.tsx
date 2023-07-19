import { auth } from "@/config/firebase";
import { signInWithPopup, GoogleAuthProvider, Auth } from "firebase/auth";

export default function SignIn() {
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider);
    };

    return (
        <section id="sign-in" className="flex justify-center items-center w-1/2 h-1/2">
            <button onClick={signInWithGoogle}>Log in with Google</button>
        </section>
    );
}
