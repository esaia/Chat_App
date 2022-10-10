import React, { useContext } from "react";
import { Authentcontext } from "../Contexts/Authcontext";
import { chatusers } from "../Contexts/Chatcontext";
import moment from "moment";

const Messages = ({ chat }) => {
  const chatcontext = useContext(chatusers);
  const currentuser = useContext(Authentcontext);

  return (
    <div
      className={` flex m-1 pb-7  ${
        chat.senderuid === currentuser.uid ? "right" : ""
      }  `}
    >
      {/* avatar */}
      <div className='flex  flex-col  justify-end items-center w-[85px]  '>
        <img
          src={
            chat.senderuid === currentuser.uid
              ? currentuser.photoURL
              : chatcontext.state.userinfo.photoURL
          }
          alt='avatar'
          className='w-[40px] h-[40px] object-cover rounded-full  '
        />
        <p className='text-gray-400 text-xs text-center '>
          {moment(chat?.date?.seconds * 1000).fromNow()}
        </p>
      </div>

      <div
        className={`bg-[#c0cceb]  w-fit   h-fit   max-w-[70%]  p-2 rounded-[5px] rounded-tl-[0px] ${
          chat.senderuid === currentuser.uid ? "rightcorners" : ""
        }  `}
      >
        <h3>{chat.text}</h3>
        {chat.photo && (
          <img
            src={chat?.photo}
            alt='chatImage'
            className='max-w-[300px] object-cover rounded-md'
          />
        )}
      </div>
    </div>
  );
};

export default Messages;
