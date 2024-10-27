import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

export const Profile = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("seekeremail", "");
  const getdetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/getprofile?search=${email}`
      );
      setItems(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
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
    getdetails();
  }, []);
  return (
    <>
    <div className='flex w-full h-[100%]'><div className='w-[20%] flex justify-center'><img src={items.profilephoto} className='mt-10 h-40 w-40 rounded-[50%] object-cover ' /></div>
    <div className='w-[80%] flex flex-col mt-20'>
        <div>Name-{items.name}</div>
        <div>Email-{items.email}</div> 
        </div>
        </div>
    </>
  )
}
