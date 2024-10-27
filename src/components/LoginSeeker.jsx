import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SpinnerRound } from 'spinners-react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../pages/AuthContext";
export const LoginSeeker = () => {
    const notify = (message) => toast(message);
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading]=useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
      setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/loginseeker`,{
                email,
                password,
              
            });
            console.log(response.data.message);
            if(response.data.message==="logged in successfully")
            {localStorage.setItem('seekeremail',email);
              login(email);
            notify(response.data.message);
            setLoading(false)
              navigate('/seekermainpage');
            }
            else
            {notify(response.data.message);
              setLoading(false)
            }
        } catch (err) {
            notify(err.message);
            setLoading(false)
        }
    };

    return (
        <>
            

            <div className="flex justify-center items-center h-screen p-7  rounded-md shadow-md ">
        <div className="flex-column  justify-center items-center bg-[#F1F1F1] rounded-md shadow-xl p-6">
        <div className='relative w-0 h-0 border-t-[100px] border-r-[120px] border-transparent border-t-[#21209c]'></div>
          <div className="text-bold text-[#21209C] text-2xl ">Login</div>
          <div className="text-lg m-4 ">
            <label htmlFor="username"></label>
            <input
              type="text"
              name="username"
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
          <div className='flex text-sm ml-5 m-2'>Doesn't have account? <button className='text-[#edc368] text-sm' onClick={()=>navigate('/signupseeker')}>Signup here</button></div>
          <div className="flex justify-center">
            <button
              className="bg-[#FDB827] w-[80%] text-[#23120B] rounded-md p-1 m-2 shadow-lg hover:scale-105 transition-all"
              onClick={handleSubmit}
            >
              {loading==false? <div>Submit</div>:(<SpinnerRound size={30} thickness={100} speed={98} color="rgba(255, 255, 255, 1)" />)}
            </button>
          </div>
          <div className='flex justify-end'> <div className="w-0 h-0 border-solid border-b-[100px] border-l-[120px] border-transparent border-b-[#21209c]"></div></div>

        </div>
      </div>
            <ToastContainer />

        </>
    )
}
