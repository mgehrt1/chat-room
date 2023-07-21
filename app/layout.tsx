import "./global.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";

const lato = Lato({
    weight: ["400", "700"],
    style: ["normal"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Chat Room App",
    description: "Chat Room App that allows users to connect and collaborate.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={lato.className}>{children}</body>
        </html>
    );
}
