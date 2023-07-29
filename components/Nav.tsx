import { User } from "firebase/auth";

interface Props {
    user: User | null | undefined;
}

export default function Nav({ user }: Props) {
    const photoURL: string = user?.photoURL ?? "/default-user.png";

    return (
        <nav className="flex justify-end items-center bg-light-blue w-full h-20">
            <img src={photoURL} className="rounded-[28px] w-14 h-14 mr-12" alt="User's Profile Picture" />
        </nav>
    );
}
