import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

export const ProviderProfile = () => {
  axios.defaults.withCredentials=true;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("provideremail", "");
  const getdetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/provider/getprofile?search=${email}`
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
    <div className='flex w-full h-[100%]'><div className='w-[20%] flex justify-center'><img src={items.profilephoto} className='mt-10 h-40 w-40 rounded-[50%] object-cover ' /></div>
    <div className='w-[80%] flex flex-col mt-20'>
    <div className='flex gap-5 '><div className='font-bold text-lg'>Name-</div><div>{items.name}</div></div>
    <div className='flex gap-5 '><div className='font-bold text-lg'>Email-</div><div>{items.email}</div></div>
        </div>
        </div>
    </>
  )
}
