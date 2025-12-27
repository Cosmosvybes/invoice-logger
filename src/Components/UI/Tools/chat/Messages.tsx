import { DocumentData } from "firebase/firestore";
import { useAppSelector } from "../../../../States/hoooks/hook";
import React, { useEffect, useRef } from "react";

function Messages({ messages }: { messages: DocumentData[] }) {
  const { account } = useAppSelector((store) => store.userSlice);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col gap-4 py-4">
      {messages.map((msg, i) => {
        const isMe = msg.sender === account.email;
        return (
          <div
            key={i}
            className={`flex ${isMe ? "justify-end" : "justify-start"} animate-fade-in-up`}
          >
            <div
              className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl shadow-sm ${
                isMe
                  ? "bg-gradient-to-tr from-violet-600 to-indigo-600 text-white rounded-tr-none"
                  : "bg-white border border-slate-100 text-slate-900 rounded-tl-none shadow-slate-200/50"
              }`}
            >
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                <div className={`flex items-center gap-2 mt-1.5 ${isMe ? "text-violet-200" : "text-slate-400"}`}>
                   <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                     {isMe ? "You" : msg.sender.split('@')[0]}
                   </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={scrollRef} />
    </div>
  );
}

export default React.memo(Messages);
