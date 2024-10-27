import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { SpinnerCircularSplit } from "spinners-react";
import { useNavigate } from "react-router-dom";
export const Providerlist = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getdetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/getprovideremail?search=${localStorage.getItem("seekeremail")}`
      );
      setItems(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const sendemail = async (provideremail) => {
    const seekeremail=localStorage.getItem('seekeremail');
    try {
      const response = await axios.post(
        `${REACT_APP_BACKEND_URL}/user/enablechat`,
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
    <>
      <div className="flex justify-center h-[100vh]">
  <div className="flex-column justify-center w-[100%] m-5 bg-[#F1F1F1] overflow-y-auto">
    {loading ? (
      <SpinnerCircularSplit className="items-center justify-center align-center h-full" />
    ) : (
     
      [...new Set(items)].map((item, index) => (
        <button
          key={index}
          onClick={() => {navigate(`/chat/${item}`);sendemail({item})}}
          className="flex flex-wrap m-2 rounded-md shadow-md p-10 mr-10 w-[90%] bg-white align-center"
        >
          <div className="w-[100%]">
            <div className="flex text-[#21209C] gap-2 text-xl ml-14"><span>{item}</span> <span className="text-black text-md"> -is invited you for chat.Click to chat</span></div>
          </div>
        </button>
      ))
    )}
  </div>
</div>

    </>
  );
};
