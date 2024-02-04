import React from "react";
import { FcSearch } from "react-icons/fc";

export const Navbar = () => {
  return (
    <>
      <div className="flex bg-red-200 space-between justify-between p-3 flex-wrap w-[100%]">
        <div className="flex items-center ">
          <div className="mr-4 ml-2 ">ApplicationTracker</div>
          <FcSearch className="mt-1" />
        </div>
        <div className="flex space-x-12 ">
          <div>About</div>
          <div>Home</div>
          <div>Contact us</div>
        </div>
      </div>
    </>
  );
};
