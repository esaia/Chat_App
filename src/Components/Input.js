import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import { Authentcontext } from "../Contexts/Authcontext";
import { chatusers } from "../Contexts/Chatcontext";
import { db, storage } from "../Firebase";
const Input = () => {
  const chatcontext = useContext(chatusers);
  const currentuser = useContext(Authentcontext);
  const [text, settext] = useState("");

  const inputref = useRef();
  const fileref = useRef();
  const buttonref = useRef();

  //send messages
  const handlesend = async (e) => {
    e.preventDefault();
    settext("");

    const file = e.target[1].files[0];

    const date = new Date().getTime();
    const storageRef = ref(storage, `${"photo " + date}`);

    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          if (file) {
            await updateDoc(doc(db, "chat", chatcontext.combinedid), {
              messages: arrayUnion({
                text,
                photo: downloadURL,
                senderuid: currentuser.uid,
                date: Timestamp.now(),
              }),
            });
          } else {
            await updateDoc(doc(db, "chat", chatcontext.combinedid), {
              messages: arrayUnion({
                text,
                senderuid: currentuser.uid,
                date: Timestamp.now(),
              }),
            });
          }
        } catch (err) {
          console.log(err);
        }
      });

      fileref.current.value = "";
    });

    //set last message
    await updateDoc(doc(db, "userChats", currentuser.uid), {
      [chatcontext.combinedid + ".lastmessage"]: {
        text,
      },
      [chatcontext.combinedid + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", chatcontext.state.userinfo.uid), {
      [chatcontext.combinedid + ".lastmessage"]: {
        text,
      },
      [chatcontext.combinedid + ".date"]: serverTimestamp(),
      [chatcontext.combinedid + ".unreadmessage"]: true,
    });
  };

  const focusfun = async () => {
    await updateDoc(doc(db, "userChats", currentuser.uid), {
      [chatcontext.combinedid + ".unreadmessage"]: false,
    });
  };
  useEffect(() => {
    inputref.current?.focus();
  }, [chatcontext]);

  return (
    <>
      {chatcontext.state.userinfo?.displayName !== "user" && (
        <form
          onSubmit={handlesend}
          className='flex justify-between  w-full   h-[40px]  bg-[#2f447f]'
        >
          <input
            type='text'
            placeholder='Type something...'
            className='  bg-transparent outline-none w-full text-white placeholder:text-white p-2'
            value={text}
            onChange={(e) => settext(e.target.value)}
            ref={inputref}
            onFocus={focusfun}
          />

          <div className=' p-1 flex items-center justify-end  gap-2  w-3/12 '>
            <input type='file' id='file1' className='hidden' ref={fileref} />
            <label htmlFor='file1'>
              <FaImage className='text-[20px] cursor-pointer text-white' />
            </label>
            <button
              className='rounded-sm px-4 py-1 font-bold bg-[#122457] text-white'
              ref={buttonref}
            >
              send...
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Input;
