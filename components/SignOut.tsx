import { Auth, signOut } from "firebase/auth";

interface Props {
    auth: Auth;
}

export default function SignOut({ auth }: Props) {
    return auth.currentUser && <button onClick={() => signOut(auth)}>Log Out</button>;
}
