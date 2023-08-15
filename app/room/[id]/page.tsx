import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

import ChatRoom from "@/components/ChatRoom";
import Nav from "@/components/Nav";
import SignIn from "@/components/SignIn";

export default function Page({ props }: { props: { roomId: string } }) {
    const [user] = useAuthState(auth);

    return (
        <div className="flex flex-col items-center h-screen">
            <Nav />
            {user ? (
                <ChatRoom roomId={props.roomId} />
            ) : (
                <div className="flex justify-center items-center flex-1 w-full">
                    <div className="bg-sky-blue rounded-2xl p-5 sm:w-[600px] w-full">
                        <SignIn />
                    </div>
                </div>
            )}
        </div>
    );
}

const getServerSideProps = async ({ params }: { params: { id: string } }) => {
    const roomId = params.id;
    return { props: { roomId } };
};
