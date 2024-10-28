import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { SpinnerCircularSplit } from "spinners-react";
import { useNavigate } from "react-router-dom";
import {  BsHandbagFill } from "react-icons/bs";
import {  JobsPosted } from "./MyJobs";
import { Profile } from "../components/Profile";
import { CreateApplication } from "../components/CreateApplication";
import { ProviderProfile } from "../components/ProviderProfile";
import { Applicantchatlist } from "./Applicantchatlist";
import { IoIosContact } from "react-icons/io";import { CiViewList } from "react-icons/ci";
import { IoMdChatbubbles } from "react-icons/io";
export const ProviderMainPage = () => {
  const navigate = useNavigate();
  const [check,Setcheck]=useState("Applications");
  const islogin = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/provider/isproviderlogin`);
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
        <button className="hover:bg-[#FDB827] rounded-md p-3 flex justify-center gap-2" onClick={()=>Setcheck("Jobs")}><div className="mt-1"><BsHandbagFill/></div><div>Create Job</div></button>
          <button className="hover:bg-[#FDB827] rounded-md p-3 flex justify-center gap-2" onClick={()=>Setcheck("Profile")}><div className="mt-1"><IoIosContact/></div><div>Profile</div></button>
     
          <button className="hover:bg-[#FDB827] rounded-md p-3 flex justify-center gap-2" onClick={()=>Setcheck("Applications")}><div className="mt-1"><CiViewList/></div><div>My Posted Jobs</div></button>

          <button className="hover:bg-[#FDB827] rounded-md p-3 flex justify-center gap-2" onClick={()=>Setcheck("Chat")}><div className="mt-1"><IoMdChatbubbles/></div><div>Chat</div></button>
        </div>
        <div className="w-[80%]">
        {check=="Jobs" && <CreateApplication/>}
          {check=="Profile" && <ProviderProfile/>}
          {check=="Applications" && <JobsPosted/>}
          {check=="Chat" && <Applicantchatlist/>}

        </div>
      </div>
    </>
  );
};
