import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { SpinnerDotted } from "spinners-react";
import { useNavigate } from "react-router-dom";


import { Jobs } from "./Jobs";
import { Profile } from "../components/Profile";
import { JobsApplied } from "./JobsApplied";
import { Providerlist } from "./Providerlist";
import { IoIosContact } from "react-icons/io";import { CiViewList } from "react-icons/ci";
import { IoMdChatbubbles } from "react-icons/io";
import {  BsHandbagFill } from "react-icons/bs";
axios.defaults.withCredentials=true;
export const SeekerMainPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [check,Setcheck]=useState("Jobs");
 
  const islogin = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/isseekerlogin`);
      console.log(response.data);
      if (response.data === "no refreshtoken") {
        
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching login status:', error);
      
    }
  }
  
  useEffect(() => {
    islogin();
  }, []);
 
  return (
    <>

      <div className="flex h-[100vh]">
        <div className="flex flex-col w-[20%] bg-gray-950 text-white gap-10 p-5 text-md">
        <button className="hover:bg-[#FDB827] rounded-md p-3 flex justify-center gap-2" onClick={()=>Setcheck("Jobs")}><div className="mt-1"><BsHandbagFill/></div><div>Jobs</div></button>
          <button className="hover:bg-[#FDB827] rounded-md p-3 flex justify-center gap-2" onClick={()=>Setcheck("Profile")}><div className="mt-1"><IoIosContact/></div><div>Profile</div></button>
          <button className="hover:bg-[#FDB827] rounded-md p-3 flex justify-center gap-2" onClick={()=>Setcheck("Applications")}><div className="mt-1"><CiViewList/></div><div>Applications</div></button>
          <button className="hover:bg-[#FDB827] rounded-md p-3 flex justify-center gap-2" onClick={()=>Setcheck("Chat")}><div className="mt-1"><IoMdChatbubbles/></div><div>Chat</div></button>
        </div>
        <div className="w-[80%]">
          {check=="Jobs" && <Jobs/>}
          {check=="Profile" && <Profile/>}
          {check=="Applications" && <JobsApplied/>}
          {check=="Chat" && <Providerlist/>}
        </div>
      </div>
    </>
  );
};
