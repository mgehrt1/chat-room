import { User } from "firebase/auth";
import Link from "next/link";

interface Props {
    user: User | null | undefined;
}

export default function Nav({ user }: Props) {
    const photoURL: string = user?.photoURL ?? "/default-user.png";

    return (
        <nav className="flex justify-between items-center bg-light-blue w-full py-2">
            <Link href="/" className="text-white-blue border-4 rounded-3xl p-2 text-3xl ml-12">
                Chat Rooms
            </Link>
            <img src={photoURL} className="rounded-[28px] w-14 h-14 mr-12" alt="User's Profile Picture" />
        </nav>
    );
}
