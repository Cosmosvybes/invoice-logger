import {
  doc,
  setDoc,
  addDoc,
  collection,
  onSnapshot,
  Timestamp,
  query,
  orderBy,
  DocumentData,
} from "firebase/firestore";

// import { getRoomId } from "../../helper";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../../../firebase/app.config";
import { useAppSelector } from "../../../../States/hoooks/hook";

export default function useChatController() {
  const { account } = useAppSelector((store) => store.userSlice);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<DocumentData[] | any[]>([]);

  const { state } = useLocation();
  const { invoiceInformation } = state;
  const { id } = invoiceInformation;
  console.log(id);
  useEffect(() => {
    createRoomIfDoesntExist();

    const roomRef = doc(db, "rooms", String(id));
    const messsagesRef = collection(roomRef, "messages");
    const q = query(messsagesRef, orderBy("time", "asc"));
    onSnapshot(q, (snapshot) => {
      const allMessages = snapshot.docs.map((snp) => snp.data());
      setMessages(allMessages);
    });
  }, []);

  const handleSendMessage = async (e: any) => {
    e.preventDefault();

    const roomRef = doc(db, "rooms", String(id));
    const messagesRef = collection(roomRef, "messages");
    setMessages([...messages, { sender: account.email, message }]);
    setMessage("");
    try {
      await addDoc(messagesRef, {
        message,
        sender: account.email,
        time: Timestamp.fromDate(new Date()),
      });
      //   console.log(`new message sent`, response.id);
    } catch (error) {
      console.log(error);
    }
    // console.log(messages);
  };

  const createRoomIfDoesntExist = async () => {
    const roomRef = doc(db, "rooms", String(id));
    try {
      await setDoc(roomRef, {
        timeStamp: Timestamp.fromDate(new Date()),
        id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (newMessage: string) => {
    setMessage(newMessage);
  };

  return { message, messages, handleSendMessage, handleChange, id };
}
