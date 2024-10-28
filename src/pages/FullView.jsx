import React, { useState, useEffect } from "react";
import axios from "axios";
import { SpinnerCircularSplit } from "spinners-react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoLocationOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
export const FullView = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const notify = (message) => toast(message);
  const [item, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const getapplication = async () => {

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/applicationfordisplay?search=${user}`
      );
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      notify(error.message);
      setLoading(false);
    }
  };
  const islogin = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/isseekerlogin`);
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
    getapplication();
  }, []);
  return (
    <>
      {" "}
      <div className="flex items-center justify-center h-screen ">
        {loading ? (
          <SpinnerCircularSplit className="text-blue-500" />
        ) : (
          <div className="max-w-xl w-full rounded-md shadow-lg bg-[#F1F1F1] p-6">
            <div >
              <div className="flex flex-col items-start">
                <div className="text-[#21209C] text-4xl mb-1">{item.title}</div>
                <div className="font-bold text-xl mb-1 text-[#FDB827] flex">
                  <FaRegBuilding className="mr-1 mt-1" />
                  {item.companyname}
                </div>

                <div className="flex">
                  <IoLocationOutline className="mr-1 mt-1" />: {item.location}
                </div>

                <div className="flex">
                  <MdAttachMoney className="mr-1 mt-1" />: {item.amount}
                </div>
                <div className="flex">
                  <BsCalendarDate className="mr-1 mt-1" />:{" "}
                  {new Date(item.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div>Duration: {item.duration}</div>
                <div className="flex">
                  Status: <div className="text-green-400">{item.statu}</div>
                </div>
                <div>Skills required-{item.skillsrequired}</div>
                <div>Description: {item.description}</div>
                <button
              className="bg-[#FDB827] w-[15%] mt-2 text-[#23120B] rounded-md p-1 shadow-lg"  
           onClick={()=>navigate(`/fullview/${item._id}/applyjob`)} >
              Apply
            </button>
              </div>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
};
