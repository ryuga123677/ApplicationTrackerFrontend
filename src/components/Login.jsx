import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SpinnerDotted } from 'spinners-react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
    const notify = (message) => toast(message);
    const navigate = useNavigate();


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://application-backend-5vqe.onrender.com/hkv/login',{
                username,
                password,
              
            });
            console.log(response.data.message);
            if(response.data.message==="logged in successfully")
            {localStorage.setItem('username',username);
            notify(response.data.message);
              navigate('/');
            }
            else
            {notify(response.data.message);
                
            }
        } catch (err) {
            notify(err.message);
        }
    };

    return (
        <>
            

            <div className='flex justify-center items-center h-screen p-5 bg-gray-100 rounded-md shadow-md'>

                
                    <div className='flex-column  justify-center items-center bg-yellow-100 rounded-md shadow-md p-2'>
            
                    <div className='text-bold text-red-400 text-2xl'>Login Here</div>
                        <div className='text-lg m-4'>
                            <label htmlFor="username"></label>
                            <input type="text" name="username" className='rounded-md' placeholder="Name" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                       
                        <div className='text-lg m-4'>
                            <label htmlFor="password"></label>
                            <input type="password" name="password" className='rounded-md' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    

                        <button className='bg-red-300 rounded-md p-2 ml-[5rem]' onClick={handleSubmit}>Submit</button>

                    </div>


                


            </div>
            <ToastContainer />

        </>
    )
}
