import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { SpinnerCircularSplit } from "spinners-react";
import { useNavigate } from "react-router-dom";

import men from "../assets/men.png";

export const MainPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username", "");
  const getdetails = async () => {
    try {
      const response = await axios.get(
        "https://application-backend-5vqe.onrender.com/applicationlists"
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
      <div className=" flex w-full bg-gray-100">
        <div className="w-[50%] h-[50%] m-10 rounded-md shadow-md bg-blue-50 p-2 ">
          <div className="flex">
            <div className="rounded-full w-[9rem] h-[7rem] m-10">
              <img src={men} alt="" className="h-full w-full rounded-full" />
            </div>
            {username === "" ? (
              <div className="text-4xl m-10">Register Below</div>
            ) : (
              <div className="text-4xl m-10">{username}</div>
            )}
          </div>

          {username ? (
            <div>
              <button
                className="bg-blue-200 m-5 p-5 rounded-md"
                onClick={() => {
                  localStorage.setItem("username", "");
                  navigate("/");
                }}
              >
                Logout
              </button>

              <button
                className="bg-blue-200 m-5 p-5 rounded-md"
                onClick={() => navigate("createapplication")}
              >
                Create Application
              </button>
              <button
                className="bg-blue-200 m-5 p-5 rounded-md"
                onClick={() => navigate("applications")}
              >
                My Applications
              </button>
            </div>
          ) : (
            <div>
              <button
                className="bg-blue-200 m-5 p-5 rounded-md"
                onClick={() => navigate("signup")}
              >
                Signup
              </button>
              <button
                className="bg-blue-200 m-5 p-5 rounded-md"
                onClick={() => navigate("login")}
              >
                Login
              </button>
            </div>
          )}
        </div>
        <div className="flex-column">
          {loading ? (
            <SpinnerCircularSplit className="items-center justify-center align-center h-full" />
          ) : (
            items.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(`/fullview/${item._id}`)}
              >
                <div className="flex-column m-1 rounded-md shadow-md p-10 w-[800px] bg-white">
                  
                    
                    <div className="flex text-blue-400 text-4xl ml-14">
                      {item.title}
                    </div>
                
                  

                  <div className="flex gap-[10%] ml-14 mt-5">
                  <div className=" text-xl text-red-400 ">
                     {item.companyname}
                    </div>
                    <div>Location: {item.location}</div>
                    <div>Stipend: {item.amount}</div>
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
