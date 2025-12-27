import useChatController from "./chat.controller";
import Messages from "./Messages";
import withAuth from "../_helper/Auth/withAuth";
import { ChatDot, Send, ArrowLeft, Information } from "react-huge-icons/outline";
import { useNavigate } from "react-router-dom";

function Chat() {
  const { message, messages, handleSendMessage, handleChange, id } = useChatController();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-slate-50 flex flex-col h-screen animate-fade-in overflow-hidden">
      {/* Premium Header */}
      <header className="shrink-0 h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 md:px-12 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all active:scale-90"
          >
            <ArrowLeft className="text-2xl" />
          </button>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-200">
                <ChatDot className="text-lg" />
              </div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight">Collaboration Chat</h1>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Invoice Archive: #{String(id).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 p-2 px-4 bg-violet-50 text-violet-600 rounded-2xl border border-violet-100">
          <Information className="text-xl" />
          <span className="text-xs font-black uppercase tracking-wider">Secure Channel</span>
        </div>
      </header>

      {/* Messages Scroll Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.03),transparent)] px-6 md:px-12">
        <div className="max-w-4xl mx-auto min-h-full">
           <Messages messages={messages} />
        </div>
      </main>

      {/* Floating Input Extension */}
      <footer className="shrink-0 p-6 md:p-10 bg-gradient-to-t from-slate-50 to-transparent">
        <div className="max-w-4xl mx-auto">
          <form 
            onSubmit={handleSendMessage}
            className="relative flex items-center gap-3 bg-white p-2 pl-6 rounded-[2rem] border border-slate-200/60 shadow-2xl shadow-slate-200 transition-all focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-50 group"
          >
            <input
              type="text"
              placeholder="Share thoughts on this invoice..."
              className="flex-1 outline-none text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-transparent min-w-0"
              value={message}
              onChange={(e) => handleChange(e.target.value)}
            />
            <button
              disabled={!message.trim()}
              type="submit"
              className="p-3 bg-gradient-to-tr from-violet-600 to-indigo-600 text-white rounded-2xl shadow-lg shadow-violet-200 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale disabled:scale-100 group/btn"
            >
              <Send className="text-xl group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>
          </form>
          <p className="mt-3 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-50">
            Messages are stored securely for record keeping
          </p>
        </div>
      </footer>
    </div>
  );
}

export default withAuth(Chat);
