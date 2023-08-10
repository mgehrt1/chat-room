"use client";

import { auth } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch (error) {
            if (error instanceof FirebaseError) {
                const code = error.code;
                console.log(code);
                if (code == "auth/invalid-email") {
                    setErrorMessage("Invalid email.");
                } else if (code == "auth/weak-password") {
                    setErrorMessage("Password is too weak.");
                } else if (code == "auth/email-already-in-use") {
                    setErrorMessage("Email is already in use.");
                } else if (code == "auth/missing-email") {
                    setErrorMessage("Must enter an email.");
                } else if (code == "auth/missing-password") {
                    setErrorMessage("Must enter a password.");
                } else {
                    setErrorMessage("An error occurred.");
                }
            } else {
                setErrorMessage("An error occurred.");
            }
        }
    };

    return (
        <section className="flex flex-col items-center">
            <h2 className="text-navy text-4xl mt-4">Sign up</h2>
            <form onSubmit={submit} className="flex flex-col items-center w-full">
                <input type="text" name="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="bg-sky-blue placeholder:text-navy font-bold border-[1px] border-navy rounded-xl w-3/5 mt-12 pl-2 py-2" />
                <input type="password" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="bg-sky-blue placeholder:text-navy font-bold border-[1px] border-navy rounded-xl w-3/5 mt-4 pl-2 py-2" />
                {errorMessage && <label className="mt-1 text-red-500">{errorMessage}</label>}
                <button className="bg-light-blue text-white-blue text-lg border-2 rounded-xl w-3/5 my-4 py-2">Sign up</button>
            </form>
        </section>
    );
}
