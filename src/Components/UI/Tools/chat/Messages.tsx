import { DocumentData } from "firebase/firestore";

import { useAppSelector } from "../../../../States/hoooks/hook";
function Messages({ messages }: { messages: DocumentData[] }) {
  const { account } = useAppSelector((store) => store.userSlice);
  return (
    <div className="flex flex-col">
      {messages.map((msg) => (
        <div
          className={`${"justify-between flex  items-center"} flex flex-col-reverse`}
        >
          <div
            className={`flex  ${
              msg.sender == account.email ? "justify-end" : "justify-start "
            }  items-center  p-1 w-full`}
          >
            <div
              className={`w-auto ${
                msg.sender == account.email ? "bg-purple-400" : "bg-gray-200"
              } p-2 rounded-md flex justify-center items-center`}
            >
              <p className="font-normal p-0.5  text-16 text-neutral-600">{msg.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Messages;
