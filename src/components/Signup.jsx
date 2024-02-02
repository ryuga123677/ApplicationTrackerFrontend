import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SpinnerDotted } from 'spinners-react';
import { useNavigate } from 'react-router-dom';
export const Signup = () => {
    const navigate = useNavigate();


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [companyname, setCompany] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/hkv/register',{
                username,
                email,
                password,
                fullname,
                companyname,
            });
            console.log(response.data.message);
            if(response.data.message==="user created successfully")
            {
              navigate('/login');
            }
            else
            {
                navigate('/register');
            }
        } catch (err) {
           
        }
    };

    return (
        <>
            

            <div className='flex justify-center items-center h-screen p-5 bg-blue-100 rounded-md shadow-md '>

                
                    <div className='flex-column  justify-center items-center bg-yellow-100 rounded-md shadow-md p-2'>
        
                    <div className='text-bold text-red-400 text-2xl '>Signup Here</div>
                        <div className='text-lg m-4'>
                            <label htmlFor="username"></label>
                            <input type="text" name="username" className='rounded-md' placeholder="Name" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className='text-lg m-4'>
                            <label htmlFor="email"></label>
                            <input type="email" name="email" className='rounded-md' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='text-lg m-4'>
                            <label htmlFor="fullname"></label>
                            <input type="text" name="fullname" className='rounded-md' placeholder="Full name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                        </div>
                        <div className='text-lg m-4'>
                            <label htmlFor="password"></label>
                            <input type="password" name="password" className='rounded-md' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='text-lg m-4'>
                            <label htmlFor="Company"> </label>
                            <input type="text" name="category" className='rounded-md' placeholder="Company" value={companyname} onChange={(e) => setCompany(e.target.value)} />
                        </div>

                        <button className='bg-red-300 rounded-md p-2 ml-[5rem]' onClick={handleSubmit}>Submit</button>

                    </div>


                


            </div>


        </>
    )
}
