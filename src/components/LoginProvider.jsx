import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SpinnerDotted } from 'spinners-react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LoginProvider = () => {
    const notify = (message) => toast(message);
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/provider/loginprovider',{
                email,
                password,
              
            });
            console.log(response.data.message);
            if(response.data.message==="logged in successfully")
            {localStorage.setItem('email',email);
            notify(response.data.message);
              navigate('/providermainpage');
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
            

            <div className="flex justify-center items-center h-screen p-7  rounded-md shadow-md ">
        <div className="flex-column  justify-center items-center bg-[#F1F1F1] rounded-md shadow-xl p-6">
          <div className="text-bold text-[#21209C] text-2xl ">Login</div>
          <div className="text-lg m-4">
            <label htmlFor="email"></label>
            <input
              type="text"
              name="email"
              className="rounded-md text-sm p-1 w-full placeholder-[#23120B] placeholder:text-sm"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
      
          <div className="text-lg m-4">
            <label htmlFor="password"></label>
            <input
              type="password"
              name="password"
              className="rounded-md text-sm p-1 w-full placeholder-[#23120B] placeholder:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex text-sm ml-5 m-2'>Doesn't have account? <button className='text-[#edc368] text-sm' onClick={()=>navigate('/signupprovider')}>Signup here</button></div>
          <div className="flex justify-center">
            <button
              className="bg-[#FDB827] w-[80%] text-[#23120B] rounded-md p-1 m-2 shadow-lg "
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
            <ToastContainer />

        </>
    )
}
