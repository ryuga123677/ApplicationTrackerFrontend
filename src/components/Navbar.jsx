import React from "react";
import { FcSearch } from "react-icons/fc";

export const Navbar = () => {
  return (
    <>
      <div className="flex  space-between bg-[#F1F1F1] justify-between p-3 flex-wrap w-[100%]">
        <div className="flex items-center ">
          <div className="mr-4 ml-2 text-[#21209C] text-lg font-bold">ApplicationTracker</div>
          <FcSearch className="mt-1" />
        </div>
        <div className="flex space-x-12">
          <div className="text-[#23120B] hover:text-[#FDB827] font-bold">About</div>
          <div  className="text-[#23120B] hover:text-[#FDB827] font-bold">Home</div>
          <div  className="text-[#23120B] hover:text-[#FDB827] font-bold">Contact us</div>
          <div  className="text-[#23120B] hover:text-[#FDB827] font-bold">Logout</div>
        </div>
      </div>
    </>
  );
};
