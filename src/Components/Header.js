import React, { useContext } from "react";
import {
  HiUserAdd,
  HiVideoCamera,
  HiOutlineDotsHorizontal,
} from "react-icons/hi";
import { chatusers } from "../Contexts/Chatcontext";

const Header = ({ info, setinfo }) => {
  const chatcontext = useContext(chatusers);
  return (
    <div className='  flex justify-between items-center h-[70px] text-white p-2 bg-[#122457] border-b-[2px] border-black shadow-lg'>
      <img
        src={chatcontext.state.userinfo?.photoURL}
        alt='avatar'
        className='w-[40px] h-[40px] object-cover rounded-full'
      />
      <h2 className='font-bold'>{chatcontext.state.userinfo?.displayName}</h2>
      <div className='flex gap-3 text-[20px]'>
        <HiVideoCamera className='iconss' />
        <HiUserAdd className='iconss' />
        <HiOutlineDotsHorizontal
          className='iconss'
          onClick={() => setinfo(!info)}
        />
      </div>
    </div>
  );
};

export default Header;
