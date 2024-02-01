import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SpinnerDotted } from 'spinners-react';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
    const navigate = useNavigate();


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/hkv/login',{
                username,
                password,
              
            });
            console.log(response.data.message);
            if(response.data.message==="logged in successfully")
            {localStorage.setItem('username',username);
              navigate('/');
            }
            else
            {
                navigate('/login');
            }
        } catch (err) {
           
        }
    };

    return (
        <>
            

            <div className='flex justify-center items-center h-screen p-5 bg-gray-200 rounded-md shadow-md'>

                
                    <div className='flex-column  justify-center items-center bg-gray-100 rounded-md shadow-md p-2'>
            
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


        </>
    )
}
