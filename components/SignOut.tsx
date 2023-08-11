import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

interface Props {
    visible: boolean;
}

export default function SignOut({ visible }: Props) {
    const router = useRouter();

    const submit = () => {
        router.push("/");
        signOut(auth);
    };

    return (
        auth.currentUser && (
            <button onClick={submit} className={`${visible ? "block" : "hidden"} absolute top-[4.75rem] right-2 bg-sky-blue border-navy border-[1px] rounded-md px-10 py-2`}>
                Sign Out
            </button>
        )
    );
}
