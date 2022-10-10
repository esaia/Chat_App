import React from "react";

const Backgroundoverflow = ({ searching, setsearching }) => {
  return (
    <>
      {searching && (
        <div
          onClick={() => setsearching(false)}
          className='bg-black opacity-50 z-20 w-full h-[100vh] absolute  '
        ></div>
      )}
    </>
  );
};

export default Backgroundoverflow;
