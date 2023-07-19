import { auth } from "@/config/firebase";
import { signInWithPopup, GoogleAuthProvider, Auth } from "firebase/auth";

export default function SignIn() {
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider);
    };

    return (
        <section id="sign-in" className="flex flex-col">
            <h2 className="text-4xl">Sign in to use Chat Rooms</h2>
            <button onClick={signInWithGoogle} className="border-2 mt-8 py-2 px-4">
                Log in with Google
            </button>
        </section>
    );
}
