import React, { useContext } from "react";
import Sidebar from "../Components/Sidebar";
import Conversation from "../Components/Conversation";
import Header from "../Components/Header";
import Chat from "../Components/Chat";
import Input from "../Components/Input";
import Finder from "../Components/Finder";
import Backgroundoverflow from "../Components/Backgroundoverflow";
import { Searchcontext } from "../Contexts/Searchingcontext";
import Infobar from "../Components/Infobar";
import { DiGithubBadge } from "react-icons/di";

const Home = () => {
  const searchingstate = useContext(Searchcontext);

  return (
    <div className='flex flex-col'>
      <div className='bg-purple-100  flex justify-center items-center   '>
        <Backgroundoverflow
          searching={searchingstate.search}
          setsearching={searchingstate.setSearch}
        />
        <div className='  w-[100%] h-[95vh]  flex overflow-hidden   '>
          {/* Left */}
          <div className='w-[90px] md:w-[500px] bg-[#122457] h-[100%]  relative z-30 border-black border-r-[2px]   '>
            <Sidebar />
            <Finder
              searching={searchingstate.search}
              setsearching={searchingstate.setSearch}
            />

            <div className='  '>
              <Conversation />
            </div>
          </div>
          {/* Right */}
          <div className=' w-full h-full bg-gray-100 flex flex-col justify-between '>
            <Header
              info={searchingstate.info}
              setinfo={searchingstate.setinfo}
            />
            <Chat />

            <Input />
          </div>

          {/* infobar */}
          {searchingstate.info && (
            <div className='bg-[#122457] text-white border-l-[1px] border-black w-[600px] h-full b'>
              <Infobar />
            </div>
          )}
        </div>
      </div>
      <div className='h-[5vh] bg-[#122457] w-full flex items-center justify-center gap-2 border-[1px] border-black'>
        <h1 className='text-center text-white'>created by Esaia</h1>
        <a href='https://github.com/esaia/Chat_App' target='_blank'>
          <DiGithubBadge className='text-white' />
        </a>
      </div>
    </div>
  );
};

export default Home;
