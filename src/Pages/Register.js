import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Link } from "react-router-dom";
import { auth, db } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { DiGithubBadge } from "react-icons/di";

const Register = () => {
  const [error, seterror] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${username + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName: username,
              photoURL: downloadURL,
            });

            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            seterror(true);
          }
        });
      });
    } catch (error) {
      seterror(true);
      setTimeout(() => {
        seterror(false);
      }, 2000);
    }
  };
  return (
    <div className='bg-[#122457] h-[100vh] flex justify-center items-center'>
      {!loading ? (
        <form
          onSubmit={handlesubmit}
          className='bg-white w-[80%] md:w-[400px]  flex flex-col justify-center gap-5 px-10 py-[40px] rounded-md '
        >
          <input
            type='Usename'
            placeholder='Username...'
            className='border-b-[1px] outline-none p-2  border-gray-400 placeholder:text-gray-300'
          />
          <input
            type='Email'
            placeholder='Email...'
            className='border-b-[1px] outline-none p-2  border-gray-400 placeholder:text-gray-300'
          />
          <input
            type='password'
            placeholder='Password...'
            className='border-b-[1px] outline-none p-2  border-gray-400 placeholder:text-gray-300'
          />
          <input type='file' id='file' className='hidden' />
          <label
            htmlFor='file'
            className='flex items-center gap-2 cursor-pointer'
          >
            <AiOutlineCloudUpload className='text-[30px]' />
            <p>upload Avatar</p>
          </label>
          <button className='bg-[#2f447f] p-1 text-white rounded-md'>
            Sign UP
          </button>

          <p className='text-sm text-center  text-gray-500'>
            Do not have a account? |{" "}
            <Link to='/login'>
              <u> Log in </u>
            </Link>
          </p>
          {error && (
            <p className='text-sm text-center  text-red-500'>
              Something went wront
            </p>
          )}
          <div className='h-full w-full flex items-center justify-center gap-2'>
            <h1 className='text-center'>created by Esaia</h1>
            <a href='https://github.com/esaia/Chat_App' target='_blank'>
              <DiGithubBadge />
            </a>
          </div>
        </form>
      ) : (
        <div className='w-[200px] h-[200px] flex justify-center items-center text-white text-xl font-bold animate-bounce rounded-lg bg-red-400'>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default Register;
