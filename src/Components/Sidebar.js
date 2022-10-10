import React, { useContext } from "react";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { Authentcontext } from "../Contexts/Authcontext";
const Sidebar = () => {
  const currentuser = useContext(Authentcontext);

  const logout = () => {
    signOut(auth);
    window.location.reload(false);
  };
  return (
    <div className='flex flex-col  h-[100px] md:flex-row justify-between items-center md:h-[70px] bg-[#122457]  '>
      <div className='flex items-center  p-2 '>
        <img
          src={currentuser.photoURL}
          className='w-10 h-10 rounded-full'
          alt='avatar'
        />
        <h2 className='hidden ml-1 md:block font-bold text-white'>
          {currentuser.displayName}
        </h2>
      </div>
      <button onClick={logout} className='bg-[#2f447f] w-20 h-8 m-2 text-white'>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
