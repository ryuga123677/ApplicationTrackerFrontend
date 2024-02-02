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
            <div>
                {loading ? (<SpinnerCircularSplit />) : (
                    items.map((item, index) => (
                        <div key={index} className='flex-column m-10 bg-gray-100 rounded-md shadow-md p-10 gap-[10px]'>
                            <div>
                                <div className='flex '>
                                <div className='flex text-red-500 text-4xl'>{item.title}</div>
                                <button className='ml-[80%] text-blue-200' onClick={()=>navigate(`/applicationedit/${item._id}`)}>Edit</button>
                                <button className='ml-[2%] text-red-200'  onClick={()=>deleteitem(item._id)}>Delete</button>
                                </div>
                               
                           
                            <div className='font-bold text-xl m-2'>{item.companyname}</div>
                            <div className='flex gap-[10%] m-2'> <div>{item.location}</div>
                                <div>{item.amount}</div>
                                <div>{item.skillsrequired}</div>
                            </div>
                           
                                <div>{item.description}</div>
                               

                            </div>



                        </div>
                    ))
                )}
            </div>
        </>
    )
}
