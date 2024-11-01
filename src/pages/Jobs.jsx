import React, { useEffect, useState } from "react";
import axios from "axios";
import { SpinnerDotted } from "spinners-react";
import { useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { TfiTimer } from "react-icons/tfi";
import { useAuth } from "./AuthContext";
export const Jobs = () => {
  axios.defaults.withCredentials=true;
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [curtime, setcurtime] = useState(Date.now());
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  const getdetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/applicationlists`
      );
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const islogin = async () => {
    try {
      const {islogin}=useAuth();
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/isseekerlogin`
      );
      if (response.data === "no refreshtoken" || response.data==="invalid access token" ) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching login status:", error);
    }
  };

  useEffect(() => {
    islogin();
    getdetails();
  }, []);

  // Filter items based on searchTerm
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex justify-center h-[100vh] bg-[#F1F1F1]">
      <div className="flex-column justify-center items-center w-[100%] m-5  overflow-y-auto">
        <div className="w-[60%] flex justify-center m-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-[50%] hover:w-[80%] transition-all p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm} // Bind input value to searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
        </div>
        {loading ? (
          <div className="flex justify-center h-full">
            <SpinnerDotted
              size={50}
              thickness={100}
              speed={98}
              color="rgba(33, 32, 156, 1)"
              className="items-center justify-center align-center h-full"
            />
          </div>
        ) : (
          filteredItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(`/fullview/${item._id}`)}
              className="flex flex-wrap m-2 rounded-md shadow-md p-10 mr-10 w-[97%] bg-white align-center hover:scale-105 transition-all"
            >
              <div className="w-[100%]">
                <div className="flex text-[#21209C] text-2xl ml-14">
                  {item.title}
                </div>

                <div className="flex justify-between ml-14 mt-5 ">
                  <div className="text-lg text-[#FDB827] flex">
                    <FaRegBuilding className="mt-1 mr-1" />
                    {item.companyname}
                  </div>
                  <div className="flex gap-5 text-sm">
                  <div className="flex gap-1">
                    <IoLocationOutline className="mt-1" />
                    <div>{item.location}</div>
                  </div>
                  <div className="flex gap-1">
                    <MdAttachMoney className="mt-1" />
                    <div>{item.amount}/month</div>
                  </div>
                  <div className="flex gap-1 text-[#FDB827]">
                    <TfiTimer className="mt-1" />
                    {Math.floor(
                      (new Date(curtime) - new Date(item.date)) / (1000 * 60 * 60 * 24)
                    )}{" "}
                    days ago
                  </div>
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};
