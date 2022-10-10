import React, { useRef } from "react";

const Searchedconversations = ({ user, name, userclick }) => {
  const usernamref = useRef();

  const username = usernamref.current?.innerText;
  const newvalue = username?.replace(
    name,
    (match) => `<b style="color: yellow">${match}</b>`
  );

  return (
    <div
      key={user.uid}
      className='flex items-center justify-center gap-2 hover:bg-[#122458] cursor-pointer p-2 mb-2 '
      onClick={() => userclick(user)}
    >
      <img
        src={user.photoURL}
        alt='avatar'
        className='w-[40px] h-[40px] object-cover rounded-full'
      />
      <div className='hidden md:flex flex-col items-start w-full    '>
        <h3 className='font-bold text-white '>
          <div ref={usernamref}>
            {!newvalue ? (
              <h1>{user.displayName}</h1>
            ) : (
              <h2 dangerouslySetInnerHTML={{ __html: newvalue }}></h2>
            )}
          </div>
        </h3>
      </div>
    </div>
  );
};

export default Searchedconversations;
