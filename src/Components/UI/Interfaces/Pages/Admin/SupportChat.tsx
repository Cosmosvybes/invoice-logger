import { useEffect, useRef, useState } from "react";
import { 
    collection, 
    query, 
    orderBy, 
    onSnapshot, 
    addDoc, 
    setDoc,
    doc,
    Timestamp, 
    DocumentData 
} from "firebase/firestore";
import { db } from "../../../../../firebase/app.config";
import { LoadingDashed } from "react-huge-icons/solid";
import { toast } from "react-toastify";

interface SupportChatProps {
    userId: number;
    userName: string;
}

export default function SupportChat({ userId, userName }: SupportChatProps) {
    const [messages, setMessages] = useState<DocumentData[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    
    // Auto-scroll
    const scrollRef = useRef<HTMLDivElement>(null);

    // Room ID: support_123
    const roomId = `support_${userId}`;

    // Mark as read when opening chat
    useEffect(() => {
        const markAsRead = async () => {
             const roomRef = doc(db, "rooms", roomId);
             await setDoc(roomRef, { hasUnread: false }, { merge: true });
        };
        markAsRead();
    }, [userId]);

    useEffect(() => {
        setLoading(true);
        // Listen to messages in the specific room
        const messagesRef = collection(db, "rooms", roomId, "messages");
        const q = query(messagesRef, orderBy("time", "asc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => doc.data());
            setMessages(msgs);
            setLoading(false);
            
            // Scroll to bottom
            setTimeout(() => {
                scrollRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        });

        return () => unsubscribe();
    }, [userId]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        setSending(true);

        try {
            const messagesRef = collection(db, "rooms", roomId, "messages");
            const roomRef = doc(db, "rooms", roomId);

            // 1. Add Message
            await addDoc(messagesRef, {
                message: newMessage,
                sender: "Admin Support", // Explicit sender name
                isAdmin: true,   // Flag for styling
                time: Timestamp.now()
            });

            // 2. Clear Unread (Just in case)
            await setDoc(roomRef, { hasUnread: false }, { merge: true });

            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message.");
        }
        setSending(false);
    };

    return (
        <div className="flex flex-col h-[400px] bg-white rounded-2xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Chat</p>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-bold text-emerald-600">Connected</span>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30">
                {loading ? (
                    <div className="flex items-center justify-center h-full text-slate-400">
                        <LoadingDashed className="animate-spin text-2xl" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 opacity-60">
                        <p className="text-sm font-bold">No messages yet</p>
                        <p className="text-xs">Start the conversation!</p>
                    </div>
                ) : (
                    messages.map((msg, idx) => {
                        // Check if message is from Admin (me) or User
                        const isMe = msg.isAdmin || msg.sender === "Admin Support"; 
                        return (
                            <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                                    isMe 
                                    ? 'bg-violet-600 text-white rounded-br-none' 
                                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'
                                }`}>
                                    {msg.message}
                                </div>
                                <span className="text-[9px] text-slate-400 mt-1 px-1 font-bold">
                                    {isMe ? 'You' : userName} • {msg.time?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        );
                    })
                )}
                <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-slate-100">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={`Message ${userName}...`}
                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-violet-500 transition-all"
                        disabled={sending}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || sending}
                        className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-violet-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {sending ? '...' : 'Send'}
                    </button>
                </div>
            </div>
        </div>
    );
}
