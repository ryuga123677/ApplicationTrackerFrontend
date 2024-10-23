import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { SpinnerCircularSplit } from "spinners-react";
import { useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";

import men from "../assets/men.png";
import { Jobs } from "./Jobs";
import { Profile } from "../components/Profile";
import { JobsApplied } from "./JobsApplied";

export const SeekerMainPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [check,Setcheck]=useState("Jobs");
  const username = localStorage.getItem("username", "");
 
  return (
    <>

      <div className="flex h-[100vh]">
        <div className="flex flex-col w-[20%] bg-gray-950 text-white gap-10 p-5 text-md">
        <button className="hover:bg-[#FDB827] rounded-md p-3" onClick={()=>Setcheck("Jobs")}>Jobs</button>
          <button className="hover:bg-[#FDB827] rounded-md p-3" onClick={()=>Setcheck("Profile")}>Profile</button>
     
          <button className="hover:bg-[#FDB827] rounded-md p-3" onClick={()=>Setcheck("Applications")}>Applications</button>
          <button className="hover:bg-[#FDB827] rounded-md p-3" onClick={()=>Setcheck("Inbox")}>Inbox</button>
          <button className="hover:bg-[#FDB827] rounded-md p-3" onClick={()=>Setcheck("Chat")}>Chat</button>
        </div>
        <div className="w-[80%]">
          {check=="Jobs" && <Jobs/>}
          {check=="Profile" && <Profile/>}
          {check=="Applications" && <JobsApplied/>}
        </div>
      </div>
    </>
  );
};
