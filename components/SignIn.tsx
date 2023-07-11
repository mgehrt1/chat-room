import { signInWithPopup, GoogleAuthProvider, Auth } from "firebase/auth";

interface Props {
    auth: Auth;
}

export default function SignIn({ auth }: Props) {
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider);
    };

    return <button onClick={signInWithGoogle}>Log in with Google</button>;
}
