import useChatController from "./chat.controller";
import { IoSendSharp, IoChatbubbleEllipses } from "react-icons/io5";
import Messages from "./Messages";
import { BsExclamationOctagon } from "react-icons/bs";
import withAuth from "../_helper/Auth/withAuth";

function Chat() {
  const { message, messages, handleSendMessage, handleChange, id } =
    useChatController();
  // console.log(id)
  return (
    <>
      <div className="h-[100vh] flex justify-between w-full">
        {/* <div className="h-[calc(100vh-10px)]  w-[50%] max-sm:hidden"></div> */}

        {/*  */}
        <div className="h-[calc(100vh-10px)] max-sm:h-auto  w-full bg-neutral-100 flex justify-between flex-col max-sm:w-full ">
          <div className="h-20 bg-neutral-200 flex py-2 justify-start stickyy top-0 left-0 right-0 px-2 max-sm:px-1 flex-col max-sm:items-start gap-1">
            <div className="flex justify-start items-center gap-1">
              <IoChatbubbleEllipses />{" "}
              <h1 className="font-bold text-[18px]">Invoice chat</h1>
            </div>
            <div className="flex justify-start items-center gap-1 text-[#e74c3c]">
              <BsExclamationOctagon className="text-purple-800" />
              <p className="text-[12px] text-purple-800 max-sm:text-8px">
                Invoice ID-- {id}
              </p>
            </div>
          </div>
          <div className=" px-2 py-2 h-[90%]  w-full overflow-y-scroll">
            <Messages messages={messages} />
          </div>

          <div className=" w-full h-[10%] flex justify-between p-2 gap-2 max-sm:h-auto sticky bottom-3 left-0 right-0">
            <input
              type="text"
              placeholder="Type message..."
              className="w-full outline-none h-10 p-1 px-2 bg-neutral-200 rounded-sm transition duration-500 hover:bg-neutral-300 hover:outline-none"
              value={message}
              onChange={(e) => handleChange(e.target.value)}
            />
            <button
              className="bg-purple-800 w-auto text-white font-bold rounded-sm flex justify-center gap-2 p-2 items-center"
              onClick={handleSendMessage}
            >
              SEND <IoSendSharp />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(Chat);
