import React from "react";
import { FcSearch } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";
export const Navbar = () => {
  const { isLogin, userInfo, logout } = useAuth();
  const navigate=useNavigate();
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };
  
  
  const handleLogout = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    logout();
    navigate('/'); 
  };
  return (
    <>
      <div className="flex  space-between bg-[#F1F1F1] justify-between p-3 flex-wrap w-[100%]">
        <div className="flex items-center ">
          <div className="mr-4 ml-2 text-[#21209C] text-lg fon font-bold">ApplicationTracker</div>
          <FcSearch className="mt-1" />
        </div>
        <div className="flex space-x-12">
          <button className="text-[#23120B] hover:text-[#FDB827] font-bold">About</button>
          <button  className="text-[#23120B] hover:text-[#FDB827] font-bold" onClick={()=>window.open("https://www.linkedin.com/in/harshit-kumar-vishwakarma-4793bb280/", "_blank")}>Contact us</button>
         {isLogin? (<div  className="text-[#23120B] hover:text-[#FDB827] font-bold"><button onClick={handleLogout}>Logout</button></div>):(<div></div>)}
        </div>
      </div>
    </>
  );
};
