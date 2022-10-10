import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import Messages from "../Components/Messages";
import { chatusers } from "../Contexts/Chatcontext";
import { db } from "../Firebase";

const Chat = () => {
  const chatuser = useContext(chatusers);
  const [chat, setchat] = useState([]);
  const scrollbottomref = useRef();
  //get data from firestore in realtime
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chat", chatuser.combinedid), (doc) => {
      setchat(doc.data()?.messages);
    });

    //clenup
    return () => {
      unsub();
    };
  }, [chatuser.combinedid]);

  useEffect(() => {
    scrollbottomref?.current.scrollIntoView();
  }, [chat]);

  return (
    <div className=' bg-[#122457] h-full  overflow-y-auto '>
      {chat ? (
        chat.map((chat, i) => {
          return (
            <div key={i}>
              <Messages chat={chat} />
            </div>
          );
        })
      ) : (
        <div className=' w-full h-full flex justify-center items-center'>
          <h1 className='text-gray-400 font-mono rotate-12 text-4xl'>
            Start the conversation!
          </h1>
        </div>
      )}
      <div ref={scrollbottomref}></div>
    </div>
  );
};

export default Chat;
