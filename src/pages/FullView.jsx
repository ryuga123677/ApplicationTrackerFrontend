import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { SpinnerCircularSplit } from 'spinners-react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoLocationOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";

export const FullView = () => {
    const { user } = useParams();
    const notify = (message) => toast(message);
    const [item, setItems] = useState({});
    const [loading, setLoading] = useState(true);
    const getapplication = async () => {
        try {
            const response = await axios.get(`https://application-backend-5vqe.onrender.com/api/applicationfordisplay?search=${user}`);
            setItems(response.data);
            setLoading(false);

        } catch (error) {
            notify(error.message);
            setLoading(false);
        }
    }
    useEffect(() => {
        getapplication();
    }, [])
    return (
        <>  <div className="flex items-center justify-center h-screen bg-red-50">
        {loading ? (
          <SpinnerCircularSplit className="text-blue-500" />
        ) : (
          <div className="max-w-xl w-full bg-red-100 rounded-md shadow-md p-6">
            <button onClick={() => history.push(`/fullview/${item._id}`)}>
              <div className="flex flex-col items-start">
                <div className="text-red-500 text-4xl mb-1">{item.title}</div>
                <div className="font-bold text-xl mb-1 flex"><FaRegBuilding className='mr-1 mt-1'/>{item.companyname}</div>
              
                  <div className='flex'><IoLocationOutline className='mr-1 mt-1'/>:  {item.location}</div>
                  
            
                <div className='flex'><MdAttachMoney className='mr-1 mt-1'/>: {item.amount}</div>
                <div className='flex'><BsCalendarDate className='mr-1 mt-1'/>: {item.date}</div>
                <div>Duration: {item.duration}</div>
                <div>Status: {item.statu}</div>
                <div>Description: {item.description}</div>
              </div>
            </button>
          </div>
        )}
        <ToastContainer />
      </div>
        </>
    )
}
