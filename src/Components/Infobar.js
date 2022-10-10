import React, { useContext } from "react";
import { chatusers } from "../Contexts/Chatcontext";
import {
  FaUserAlt,
  FaBell,
  FaSearch,
  FaFire,
  FaReact,
  FaUserEdit,
  FaHandsHelping,
} from "react-icons/fa";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

const Infobar = () => {
  const chatcontext = useContext(chatusers);
  return (
    <div className='flex flex-col p-1 mt-6 justify-center items-center'>
      <img
        src={chatcontext.state.userinfo.photoURL}
        alt='avatar'
        className='w-[60px] h-[60px] object-cover rounded-full'
      />
      <h2 className='font-bold'>{chatcontext.state.userinfo.displayName}</h2>
      <div className='w-full mt-5 flex justify-center items-center gap-7'>
        <FaUserAlt className='icons' />
        <FaBell className='icons' />
        <FaSearch className='icons' />
      </div>
      <div className='w-full  mt-6'>
        {/* accordion */}
        <Accordion defaultIndex={[0, 1]} allowMultiple>
          <AccordionItem border='none'>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left' fontWeight='600'>
                  About User
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <div>
                <div className='flex items-center gap-2 w-full hover:bg-[#2f447f] p-2'>
                  <FaUserEdit className='text-gray-600' />
                  <h3 className=' cursor-pointer'>User info</h3>
                </div>
                <div className='flex items-center gap-2 w-full hover:bg-[#2f447f] p-2'>
                  <FaHandsHelping className='text-gray-600' />
                  <h3 className=' cursor-pointer'>Poke user</h3>
                </div>
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border='none' p='2px'>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left' fontWeight='600'>
                  Additional Info
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <div>
                <div className='flex items-center gap-2 w-full hover:bg-[#2f447f] p-2'>
                  <FaFire className='text-gray-600' />
                  <h3 className=' cursor-pointer'>cosrtumize chat</h3>
                </div>
                <div className='flex items-center gap-2 w-full hover:bg-[#2f447f] p-2'>
                  <FaReact className='text-gray-600' />
                  <h3 className=' cursor-pointer'>Change emoji</h3>
                </div>
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Infobar;
