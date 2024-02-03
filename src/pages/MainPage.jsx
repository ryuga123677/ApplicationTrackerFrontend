import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { SpinnerCircularSplit } from 'spinners-react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import men from '../assets/men.png'

export const MainPage = () => {
    const notify = () => toast("Welcome");
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const username = localStorage.getItem('username', '');
    const getdetails = async () => {

        try {
            const response = await axios.get('https://application-backend-5vqe.onrender.com/api/applicationlists');
            setItems(response.data);
            console.log(response.data);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
    useEffect(() => {
        notify();
        getdetails();

    }, [])
    return (
        <>
            <div className=' flex w-full'>
                <div className='w-[50%] h-[50%] m-10 rounded-md shadow-md bg-yellow-100 p-2 '>
                    <div className='flex'>
                        <div className='rounded-full bg-red-200 w-[9rem] h-[7rem] m-10'>

                            <img src={men} alt="" className='h-full w-full rounded-full' />
                        </div>
                        {username === '' ? (<div className='text-4xl m-10'>Register Below</div>) : (<div className='text-4xl m-10'>{username}</div>)}
                    </div>

                    {username ? (
                        <div>
                            <button className='bg-blue-100 m-5 p-5 rounded-md' onClick={() => {
                                localStorage.setItem('username', '');
                                navigate('/');
                            }}>Logout</button>

                            <button className='bg-red-100 m-5 p-5 rounded-md' onClick={() => navigate('createapplication')}>Create Application</button>
                            <button className='bg-red-100 m-5 p-5 rounded-md' onClick={() => navigate('applications')}>My Applications</button>
                        </div>
                    ) : (
                        <div><button className='bg-blue-100 m-5 p-5 rounded-md' onClick={() => navigate('signup')}>Signup</button>
                            <button className='bg-blue-100 m-5 p-5 rounded-md' onClick={() => navigate('login')}>Login</button></div>
                    )}


                </div>
                <div>
                    {loading ? (<SpinnerCircularSplit className='items-center justify-center align-center h-full' />) : (
                        items.map((item, index) => (
                            <button onClick={()=>{navigate(`/fullview/${item._id}`)}}>
                            <div key={index} className='flex-column m-10 bg-yellow-100 rounded-md shadow-md p-10 gap-[10px] w-full'>
                               
                                    
                                <div className='flex text-red-500 text-4xl ml-14'>{item.title}</div>
                                <div className='font-bold text-xl mr-7 mt-5 mb-5'>company-{item.companyname}</div>
                                <div className='flex gap-[10%] ml-14 mt-1'> 
                                <div>{item.location}</div>
                                    <div>{item.amount}</div>

                                </div>

                                


                            </div>
                            </button>
                        ))
                    )}
                </div>
            </div>
        
        </>

    )
}
