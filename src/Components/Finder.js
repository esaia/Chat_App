import React, { useContext, useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, getDoc, getDocs, updateDoc } from "firebase/firestore";
import Searchedconversations from "./Searchedconversations";
import { doc, setDoc } from "firebase/firestore";
import { Authentcontext } from "../Contexts/Authcontext";
import { chatusers } from "../Contexts/Chatcontext";

const Finder = ({ searching, setsearching }) => {
  const currentuser = useContext(Authentcontext);
  const chatcontext = useContext(chatusers);

  const [data, setdata] = useState([]);
  const [filtereddata, setFiltereddata] = useState([]);
  const [name, setname] = useState("");

  // clear input when searching is false
  useEffect(() => {
    if (!searching) {
      setname("");
      setdata([]);
    }
  }, [searching]);
  // get data from db
  const getdata = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.docs.forEach((element) => {
      data.push(element.data());
    });
  };
  // focus on input
  const handlefocus = async (e) => {
    setsearching(true);
    getdata();
  };

  //view all user
  const viewalluser = async () => {
    setname("");
    setdata([]);
    await getdata();
    const tempdata = data.filter((item) => item.uid !== currentuser.uid);
    setFiltereddata(tempdata);
  };

  // input listener
  const handlechange = (e) => {
    setname(e.target.value);
    //tempdata filteres existing use and filterddata filteres names who includes inputs
    const tempdata = data.filter((item) => item.uid !== currentuser.uid);
    const filtereddata = tempdata.filter((user) =>
      user.displayName.includes(name)
    );
    setFiltereddata(filtereddata);
  };

  // when search result clicked
  const userclick = async (user) => {
    const combinedID =
      currentuser.uid > user.uid
        ? currentuser.uid + user.uid
        : user.uid + currentuser.uid;

    try {
      const userchats = await getDoc(doc(db, "chat", combinedID));

      chatcontext.dispatch({
        type: "CHANGE_USER",
        payload: { userinfo: user },
      });

      setsearching(false);
      setname("");
      setdata([]);

      if (userchats) {
        await setDoc(doc(db, "chat", combinedID), { messages: [] });
      }

      await updateDoc(doc(db, "userChats", currentuser.uid), {
        [combinedID + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedID + ".userInfo"]: {
          uid: currentuser.uid,
          displayName: currentuser.displayName,
          photoURL: currentuser.photoURL,
        },
      });
    } catch (error) {
      console.log(error);
    }

    // await setDoc(doc(db, "userchats", combinedID), {
    //   userinfo: user,
    // });
  };

  return (
    <div className='hidden  md:block   '>
      <input
        type='text'
        value={name}
        onChange={handlechange}
        onFocus={handlefocus}
        onBlur={() => setdata([])}
        placeholder='Find a user'
        className=' bg-[#101e45] p-2 w-full  outline-none placeholder:text-white text-white border-b-[1px] border-[#1b053e]'
      />

      {searching && (
        <div className='w-full h-full bg-[#1d377e] overflow-auto '>
          {filtereddata.map((user, i) => {
            return (
              <Searchedconversations
                user={user}
                key={user.uid}
                name={name}
                userclick={userclick}
              />
            );
          })}

          <div className='bg-black text-white  w-full h-[30px] bottom-0  absolute'>
            <h1
              className='text-center underline cursor-pointer'
              onClick={viewalluser}
            >
              VIEW ALL USER
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finder;
