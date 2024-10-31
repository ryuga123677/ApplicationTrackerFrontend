import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";
import axios from "axios";
export const Navbar = () => {

  const { islogin, logout } = useAuth();
  const navigate=useNavigate();
const [item,setItems]=useState({});
  
  
  const handleLogout = async() => {
const name=localStorage.getItem('whologined');
      try {
        if(name=="seeker")
        {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/logoutuser`
        );
        setItems(response.data);
        setLoading(false);
        logout();
        navigate('/'); 
      }
      else if(name=="provider")
      {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/provider/logoutprovider`
        );
        setItems(response.data);
        setLoading(false);
        logout();
        navigate('/'); 
      }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
 
   

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
         {item.message==='Logged out successfully'? (<div></div>):(<div  className="text-[#23120B] hover:text-[#FDB827] font-bold"><button onClick={handleLogout}>Logout</button></div>)}
        </div>
      </div>
    </>
  );
};
