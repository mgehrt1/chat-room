"use client";

import Nav from "@/components/Nav";
import { auth } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center min-w-screen min-h-screen">
            <Nav user={user} />
            <div className="flex justify-center items-center flex-1">
                <div className="bg-sky-blue rounded-2xl p-5 w-[600px]">
                    <section className="flex flex-col items-center">
                        <h2 className="text-navy text-4xl mt-4">Sign up</h2>
                        <form onSubmit={submit} className="flex flex-col items-center w-full">
                            <input type="text" name="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="bg-sky-blue placeholder:text-navy font-bold border-[1px] border-navy rounded-xl w-3/5 mt-12 pl-2 py-2" />
                            <input type="password" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="bg-sky-blue placeholder:text-navy font-bold border-[1px] border-navy rounded-xl w-3/5 mt-4 pl-2 py-2" />
                            <button className="bg-light-blue text-white-blue text-lg border-2 rounded-xl w-3/5 my-4 py-2">Sign up</button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}
