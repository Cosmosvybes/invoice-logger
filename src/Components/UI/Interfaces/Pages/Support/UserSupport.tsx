import { 
    collection, 
    query, 
    orderBy, 
    onSnapshot, 
    addDoc, 
    setDoc,
    doc,
    Timestamp, 
    DocumentData,
    serverTimestamp
} from "firebase/firestore";
import { db } from "../../../../../firebase/app.config";
import { LoadingDashed, Send, InformationCircle } from "react-huge-icons/solid";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../../../States/hoooks/hook";
import withAuth from "../../../Tools/_helper/Auth/withAuth";
import { useEffect, useRef, useState } from "react";

function UserSupport() {
    const { account } = useAppSelector((state) => state.userSlice);
    const [messages, setMessages] = useState<DocumentData[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    
    // Auto-scroll
    const scrollRef = useRef<HTMLDivElement>(null);

    // Room ID: support_{USER_ID}
    const roomId = `support_${account?.id}`;

    useEffect(() => {
        if (!account?.id) return;

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
    }, [account?.id]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !account?.id) return;
        setSending(true);

        try {
            const messagesRef = collection(db, "rooms", roomId, "messages");
            const roomRef = doc(db, "rooms", roomId);

            // 1. Add Message
            await addDoc(messagesRef, {
                message: newMessage,
                sender: `${account.firstname} ${account.lastname}`,
                isAdmin: false, 
                time: Timestamp.now()
            });

            // 2. Update Room (Set Unread for Admin)
            await setDoc(roomRef, {
                hasUnread: true,
                lastMessage: newMessage,
                lastUpdated: serverTimestamp(),
                userId: account.id,
                userEmail: account.email
            }, { merge: true });

            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message.");
        }
        setSending(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 max-sm:p-4">
             <div className="max-w-4xl mx-auto h-[85vh] flex flex-col bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                       <div className="w-14 h-14 bg-violet-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-violet-200">
                           <InformationCircle />
                       </div>
                       <div>
                           <h1 className="text-2xl font-black text-slate-800 tracking-tight">Customer Support</h1>
                           <p className="text-sm font-medium text-slate-500">Direct line to our support team</p>
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-100">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        SUPPORT ONLINE
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
                            <LoadingDashed className="animate-spin text-3xl text-violet-600" />
                            <p className="font-bold text-xs tracking-widest uppercase">Connecting to secure channel...</p>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <InformationCircle className="text-4xl text-slate-300" />
                            </div>
                            <h3 className="text-lg font-black text-slate-800">How can we help?</h3>
                            <p className="text-slate-400 max-w-xs mt-2 text-sm">Send us a message and we'll get back to you as soon as possible.</p>
                        </div>
                    ) : (
                        messages.map((msg, idx) => {
                            // Check if message is from Admin or User (Me)
                            const isMe = !msg.isAdmin; 
                            return (
                                <div key={idx} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                                    <div className={`flex flex-col max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                                        <div className={`p-4 md:p-5 rounded-2xl text-sm font-medium leading-relaxed shadow-sm transition-all hover:shadow-md ${
                                            isMe 
                                            ? 'bg-violet-600 text-white rounded-br-none' 
                                            : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none'
                                        }`}>
                                            {msg.message}
                                        </div>
                                        <span className="text-[10px] text-slate-400 mt-2 px-1 font-bold">
                                            {isMe ? 'You' : 'Support Agent'} • {msg.time?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={scrollRef} />
                </div>

                {/* Input Area */}
                <div className="p-6 md:p-8 bg-white border-t border-slate-100">
                    <div className="relative flex items-center gap-3">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type your message here..."
                            className="flex-1 pl-6 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all placeholder:text-slate-400"
                            disabled={sending}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim() || sending}
                            className="p-4 bg-slate-900 text-white rounded-2xl shadow-lg shadow-slate-200 hover:bg-violet-600 hover:shadow-violet-200 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {sending ? <LoadingDashed className="animate-spin text-xl" /> : <Send className="text-xl" />}
                        </button>
                    </div>
                    <p className="text-center mt-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                        We typically reply within a few minutes
                    </p>
                </div>
             </div>
        </div>
    );
}

export default withAuth(UserSupport);
