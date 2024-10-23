import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { SpinnerCircularSplit } from "spinners-react";
import { useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { TfiTimer } from "react-icons/tfi";
import { useParams } from "react-router-dom";
export const Applicantslist = () => {
  const navigate = useNavigate();
  const {id}=useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getdetails = async () => {
    try { 
      const response = await axios.get(
        `http://localhost:3000/api/applicantlists?search=${id}`
      );
      setItems(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getdetails();
  }, []);
  return (
    <>
      <div className="flex justify-center h-[100vh] ">
        <div className="flex-column justify-center w-[100%] m-5 bg-[#F1F1F1] overflow-y-auto">
          {loading ? (
            <SpinnerCircularSplit className="items-center justify-center align-center h-full" />
          ) : (
            items.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(`/fullview/${item._id}`)}
                className="flex flex-wrap m-2 rounded-md shadow-md p-10 mr-10 w-[90%] bg-white align-center"
              >
                <div className=" w-[100%]">
                  <div className="flex text-[#21209C] text-2xl ml-14">
                    {item.name}
                  </div>

                  <div className="flex gap-[10%] ml-14 mt-5 ">
                    <div className=" text-lg text-[#FDB827] flex">
                      <FaRegBuilding className="mt-1 mr-1" />
                      {item.email}
                    </div>
                    <div className="flex gap-2">
                      <IoLocationOutline className="mt-1" />{" "}
                      <div> {item.address}</div>
                    </div>
                    <div className="flex gap-2">
                      <MdAttachMoney className="mt-1" />{" "}
                      <div>{item.college}</div>
                    </div>
                    <div className="flex gap-2">
                      <IoLocationOutline className="mt-1" />{" "}
                      <div> {item.cgpa}</div>
                    </div>
                    <div className="flex gap-2">
                      <IoLocationOutline className="mt-1" />{" "}
                      <div> {item.skills}</div>
                    </div>
                    <div className="flex gap-2">
                      <IoLocationOutline className="mt-1" />{" "}
                      <div> {item.hirereason}</div>
                    </div>
                    <div className="flex gap-2">
                      <IoLocationOutline className="mt-1" />{" "}
                      <div> {item.coverletter}</div>
                    </div>
                   
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
};
