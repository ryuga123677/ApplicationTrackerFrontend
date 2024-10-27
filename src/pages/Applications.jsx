import React, { useState } from 'react'
import axios from 'axios';
import { SpinnerCircularSplit } from 'spinners-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLocationOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
export const Applications = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const getdetails = async () => {

        try {
            const username = localStorage.getItem('username')||"";
            console.log(username);
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/applications?search=${username}`);
            setItems(response.data);
            console.log(response.data);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
    const deleteitem = async (id) => {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/applicationtobedeleted?id=${id}`);
        if(response.data.message==="Application deleted successfully")
        {
            setItems(items.filter(user => user._id !==id));
        }
    }
    useEffect(() => {
        getdetails();

    }, [])
    return (
        <>
            <div className='bg-red-50 h-screen p-8 justify-center items-center '>
      {loading ? (
        <SpinnerCircularSplit />
      ) : (
        items.map((item, index) => (
          <div key={index} className='flex-column bg-red-100 rounded-md shadow-md p-6 mb-4 ml-[25%] w-[600px]'>
            <div className='flex justify-between items-center'>
              <div className='flex text-blue-400 text-4xl'>{item.title}</div>
              <div className='flex'>
                <button
                  className='text-blue-500 ml-2'
                  onClick={() => navigate(`/applicationedit/${item._id}`)}
                >
                  <FaRegEdit/>
                </button>
                <button className='text-red-500 ml-2' onClick={() => deleteitem(item._id)}>
                  <MdDeleteForever className='h-[20px] w-[20px]'/>
                </button>
              </div>
            </div>
            <div className='font-bold text-xl mt-2 flex'><FaRegBuilding className='mr-1 mt-1'/>{item.companyname}</div>
            <div className='flex gap-4 mt-2 text-xl'>
              <div className='flex'><IoLocationOutline className='mr-1 mt-1'/> : {item.location}</div>
              <div className='flex'><MdAttachMoney className='mr-1 mt-1'/> {item.amount}</div>
              <div>Skills : {item.skillsrequired}</div>
            </div>
            <div className='mt-2'>Description - {item.description}</div>
          </div>
        ))
      )}
    </div>
        </>
    )
}
