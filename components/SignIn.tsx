import { auth } from "@/config/firebase";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";

export default function SignIn() {
    const provider = new GoogleAuthProvider();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider);
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setInvalidCredentials(true);
        }
    };

    return (
        <section className="flex flex-col items-center">
            <h2 className="text-navy sm:text-4xl text-xl mt-4">Welcome to the Chat Rooms App!</h2>
            <form onSubmit={submit} className="flex flex-col items-center w-full">
                <input type="text" name="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="bg-sky-blue placeholder:text-navy font-bold border-[1px] border-navy rounded-xl sm:w-3/5 w-3/4 mt-12 pl-2 py-2" />
                <input type="password" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="bg-sky-blue placeholder:text-navy font-bold border-[1px] border-navy rounded-xl sm:w-3/5 w-3/4 mt-4 pl-2 py-2" />
                {invalidCredentials && <label className="mt-1 text-red-500">Invalid email or password</label>}
                <button className="bg-light-blue text-white-blue text-lg border-2 rounded-xl sm:w-3/5 w-3/4 mt-4 py-2">Sign in</button>
            </form>
            <button onClick={signInWithGoogle} className="flex justify-center bg-light-blue text-white-blue text-lg border-2 rounded-xl sm:w-3/5 w-3/4 mt-10 mb-6 py-2">
                Sign in with Google
            </button>
            <p className="text-navy">
                Don't have an account?{" "}
                <Link href="/sign-up" className="text-light-blue">
                    Sign up
                </Link>
            </p>
        </section>
    );
}
