import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";

function Login() {
  const navigate = useNavigate();
  const [error, seterror] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      seterror(true);
      setTimeout(() => {
        seterror(false);
      }, 2000);
    }
  };

  return (
    <div className='bg-[#122457] h-[100vh] flex justify-center items-center'>
      <form
        onSubmit={handlesubmit}
        className='bg-white w-[80%] md:w-[400px]  flex flex-col justify-center gap-5 px-10 py-[40px] rounded-md '
      >
        <input
          type='text'
          placeholder='Email...'
          className='border-b-[1px] outline-none p-2  border-gray-400 placeholder:text-gray-300'
        />
        <input
          type='Password'
          placeholder='Password...'
          className='border-b-[1px] outline-none p-2  border-gray-400 placeholder:text-gray-300'
        />
        <button className='bg-[#2f447f] p-1 text-white rounded-md'>
          Sign in
        </button>
        <p className='text-sm text-center text-gray-500'>
          Do not have a account? |{" "}
          <Link to='/register'>
            <u>Sign up</u>
          </Link>
        </p>
        {error && (
          <p className='text-sm text-center  text-red-500'>
            Something went wront
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
