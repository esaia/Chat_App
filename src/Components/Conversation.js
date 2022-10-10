import React, { useContext, useEffect, useState } from "react";
import { FaTrashAlt, FaCheck, FaCircle } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { deleteField, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { Authentcontext } from "../Contexts/Authcontext";
import { chatusers } from "../Contexts/Chatcontext";
import moment from "moment";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
const Conversation = () => {
  const [chat, setchat] = useState([]);
  const [hoveringid, sethoveringid] = useState(-1);
  const [showmodule, setshowmodule] = useState(false);
  const currentuser = useContext(Authentcontext);
  const chatuser = useContext(chatusers);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const truncate = (string, n) => {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
  };

  // get data from firestore in realtime
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userChats", currentuser.uid), (doc) => {
      const objects = Object.entries(doc.data());
      objects.sort((a, b) => b[1].date?.seconds - a[1].date?.seconds);
      setchat(objects);
    });
    return () => {
      unsub();
    };
  }, [currentuser.uid]);

  // select user when clicked
  const handleselect = async (user) => {
    chatuser.dispatch({
      type: "CHANGE_USER",
      payload: { userinfo: user[1].userInfo },
    });

    await updateDoc(doc(db, "userChats", currentuser.uid), {
      [user[0] + ".unreadmessage"]: false,
    });
  };

  const handledelete = async (id) => {
    chatuser.dispatch({
      type: "CHANGE_USER",
      payload: {
        userinfo: {
          displayName: "user",
          photoURL:
            "https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png",
        },
        uid: null,
      },
    });
    const userdoc = doc(db, "userChats", currentuser.uid);
    const combinedID =
      currentuser.uid > id ? currentuser.uid + id : id + currentuser.uid;
    await updateDoc(userdoc, {
      [combinedID]: deleteField(),
    });
    onClose();
  };

  //remove modale and sethoverid -1
  const onmouseleavefunction = () => {
    sethoveringid(-1);
    setshowmodule(false);
  };

  return (
    <>
      {chat &&
        chat.map((user, i) => {
          return (
            <div
              key={user[0]}
              className=' flex items-center justify-between  hover:bg-[#101e45] cursor-pointer  relative border-b-[1px]  border-gray-900 '
              onMouseEnter={() => sethoveringid(i)}
              onMouseLeave={onmouseleavefunction}
            >
              <div
                className=' flex items-center justify-center gap-2 p-2 m-2  w-full'
                onClick={() => handleselect(user)}
              >
                <img
                  src={user[1]?.userInfo?.photoURL}
                  alt='avatar'
                  className='w-[40px] h-[40px] object-cover rounded-full'
                />
                <div className='hidden md:flex flex-col items-start w-full   '>
                  <h3
                    className={` text-white ${
                      user[1]?.unreadmessage && "font-extrabold"
                    }`}
                  >
                    {user[1]?.userInfo?.displayName}
                  </h3>

                  <p className=' text-gray-300 mt-[-2px] text-sm'>
                    {truncate(user[1]?.lastmessage?.text, 15)}
                  </p>
                  <p className='text-gray-500 text-xs '>
                    {moment(user[1]?.date?.seconds * 1000).fromNow()}
                  </p>
                </div>
              </div>
              {/* <button
                onClick={() => handledelete(user[1].userInfo.uid)}
              ></button> */}
              {user[1].unreadmessage && (
                <FaCircle className='m-3 absolute right-0 text-white' />
              )}
              <>
                {hoveringid === i && (
                  <div className='overflow-x-hidden  '>
                    <BiDotsHorizontalRounded
                      onClick={() => setshowmodule(true)}
                      className='text-gray-700 bg-slate-200 hover:bg-slate-300 border-[1px] border-slate-400 rounded-fullm-2 rounded-full  w-[30px] h-[25px] mr-[55px] '
                    />
                    {showmodule && (
                      <div className='bg-purple-100 w-[120px]  p-2 rounded-md shadow-lg text-black font-extralight absolute right-[-15px] top-[60px]   z-20  '>
                        <div className='flex justify-start items-center gap-2 p-1 hover:bg-gray-100'>
                          <FaCheck className='bg-gray-200 rounded-full text-[12px] p-[1px] ' />
                          <h3 className='text-[12px] font-semibold'>
                            Mark as read
                          </h3>
                        </div>
                        <div className='flex justify-start items-center gap-2 p-1 hover:bg-gray-100'>
                          <BsFillPersonFill className='bg-gray-200 rounded-full text-[12px] p-[1px] ' />
                          <h3 className='text-[12px] font-semibold'>
                            View profile
                          </h3>
                        </div>
                        <hr className='border-gray-300 ' />
                        <div
                          className='flex justify-start items-center gap-2 p-1 hover:bg-gray-100'
                          // onClick={() => handledelete(user[1].userInfo.uid)}
                          onClick={onOpen}
                        >
                          <FaTrashAlt className='bg-gray-200 rounded-full text-[12px] p-[1px] ' />
                          <h3 className='text-[12px] font-semibold'>Delete</h3>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>

              {/* alert modal */}
              <>
                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete conversation
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        This will not delete the past correspondence
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button
                          colorScheme='red'
                          ml={3}
                          onClick={() => handledelete(user[1].userInfo.uid)}
                        >
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </>
            </div>
          );
        })}
    </>
  );
};

export default Conversation;
