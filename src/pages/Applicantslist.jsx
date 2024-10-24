import React, { useEffect, useState } from "react";
import axios from "axios";
import { SpinnerCircularSplit } from "spinners-react";
import { useNavigate, useParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";

export const Applicantslist = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getdetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/applicantlists?search=${id}`
      );
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const sendemail = async (seekeremail) => {
    const provideremail=localStorage.getItem('provideremail');
    try {
      const response = await axios.post(
        'http://localhost:3000/provider/enablechat',
        {provideremail,
          seekeremail
        }
      );
      console.log(response.data);
     
    } catch (error) {
    
      console.log(error);
    }
  };
  useEffect(() => {
    getdetails();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 p-5 ">
      {loading ? (
        <div className="flex justify-center items-center h-screen w-full">
          <SpinnerCircularSplit />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center text-xl text-gray-500 mt-10 w-full">
          No data available
        </div>
      ) : (
        items.map((item, index) => (
          <button
            key={index}
            
            className="flex flex-col bg-[#F1F1F1] rounded-lg shadow-xl p-5 w-1/3 hover:shadow-lg transition duration-200 ease-in-out"
          >
            <div className="text-[#21209C] font-semibold mb-2">
              Name- {item.name}
            </div>
            <div className="flex flex-col gap-2">
              <div className=" flex items-center">
               
                Email-{item.email}
              </div>
              <div className="flex items-center">
               
                Address- <div>{item.address}</div>
              </div>
              <div className="flex items-center">
                
                College-<div>{item.college}</div>
              </div>
              <div className="flex items-center">
              
                CGPA-<div>{item.cgpa}</div>
              </div>
              <div className="flex items-center">
                
                Skills-<div>{item.skills}</div>
              </div>
              <div className="flex items-center">
               
                Hire reason-<div>{item.hirereason}</div>
              </div>
              <div className="flex flex-col items-center">
               <div className="text-[#FDB827]">Cover Letter</div>
                <div>{item.coverletter}</div>
              </div>
              <div className="flex gap-3"> <button
              className="bg-[#FDB827] w-[100px] text-[#23120B] rounded-md p-1 shadow-lg "
      
            >
              Resume
            </button>  <button
              className="bg-[#FDB827] w-[100px] text-[#23120B] rounded-md p-1 shadow-lg "
         onClick={()=>{navigate(`/chat/${item.email}`);sendemail(item.email)}}
            >
              Chat
            </button></div>
            </div>
          </button>
        ))
      )}
    </div>
  );
};
