import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chat Room App",
    description: "Chat Room App that allows users to connect and collaborate.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
