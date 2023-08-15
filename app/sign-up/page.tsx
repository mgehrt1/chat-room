"use client";

import Nav from "@/components/Nav";
import SignUp from "@/components/SignUp";

export default function Page() {
    return (
        <div className="flex flex-col items-center min-w-screen min-h-screen">
            <Nav />
            <div className="flex justify-center items-center flex-1">
                <div className="bg-sky-blue rounded-2xl p-5 w-[600px]">
                    <SignUp />
                </div>
            </div>
        </div>
    );
}
