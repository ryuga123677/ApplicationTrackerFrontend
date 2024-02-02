import React, { useState } from 'react'
import axios from 'axios';
import { SpinnerCircularSplit } from 'spinners-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const Applications = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const getdetails = async () => {

        try {
            const username = localStorage.getItem('username')||"";
            console.log(username);
            const response = await axios.get(`http://localhost:3000/api/applications?search=${username}`);
            setItems(response.data);
            console.log(response.data);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
    const deleteitem = async (id) => {
        const response = await axios.delete(`http://localhost:3000/api/applicationtobedeleted?id=${id}`);
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
            <div className='bg-blue-100 min-h-screen p-8'>
      {loading ? (
        <SpinnerCircularSplit />
      ) : (
        items.map((item, index) => (
          <div key={index} className='flex-column bg-yellow-100 rounded-md shadow-md p-6 mb-4'>
            <div className='flex justify-between items-center'>
              <div className='flex text-red-500 text-4xl'>{item.title}</div>
              <div className='flex'>
                <button
                  className='text-blue-500 ml-2'
                  onClick={() => navigate(`/applicationedit/${item._id}`)}
                >
                  Edit
                </button>
                <button className='text-red-500 ml-2' onClick={() => deleteItem(item._id)}>
                  Delete
                </button>
              </div>
            </div>
            <div className='font-bold text-xl mt-2'>{item.companyname}</div>
            <div className='flex gap-4 mt-2 text-xl'>
              <div>Location - {item.location}</div>
              <div>Stipend - {item.amount}</div>
              <div>Skills Required - {item.skillsrequired}</div>
            </div>
            <div className='mt-2'>Description - {item.description}</div>
          </div>
        ))
      )}
    </div>
        </>
    )
}
