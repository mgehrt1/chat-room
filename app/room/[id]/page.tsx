"use client";

import ChatRoom from "@/components/ChatRoom";

export default function Room({ params }: { params: { id: string } }) {
    return <ChatRoom roomId={params.id} />;
}
