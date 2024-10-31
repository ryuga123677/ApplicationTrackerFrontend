import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SpinnerDotted } from 'spinners-react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../pages/AuthContext';
export const CreateApplication = () => {
    const notify = (message) => toast(message);
    const navigate = useNavigate();
    axios.defaults.withCredentials=true;

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [companyname, setCompany] = useState('');
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [skillsrequired, setSkillrequired] = useState('');
    const [duration, setDuration] = useState('');
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState(localStorage.getItem('provideremail') || '');
    const islogin = async () => {
      try {const {islogin}=useAuth();
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/provider/isproviderlogin`);
        console.log(response.data);
        if (response.data === "no refreshtoken" || response.data==="invalid refresh token") {
          
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching login status:', error);
        
      }
    }
    
    useEffect(() => {
      islogin();
    }, []);
    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/createapplication`, {
                email,
                title,
                location,
                companyname,
                amount,
                description,
                skillsrequired,
                duration,
                status,
            
            });
            console.log(response.data.message);
            if (response.data.message === "Application created successfully") {
                notify(response.data.message);
                // navigate('/');
                
            }
            else {
                notify(response.data.message);
                // navigate('/createapplication');
                
            }
        } catch (err) {
            notify(err.message);

        }
    };

    return (
        <>


<div className="flex justify-center items-center h-screen p-5 rounded-md shadow-lg">
        <div className="flex-column  justify-center items-center bg-[#F1F1F1] rounded-md shadow-md p-2 w-[60%]">
          <div className="text-bold text-[#21209C] w-full m-2 text-2xl">
           Fill Details
          </div>
          <div className="text-sm m-4">
            <label htmlFor="title"></label>
            <input
              type="text"
              name="title"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="text-sm m-4">
            <label htmlFor="Address"></label>
            <input
              type="text"
              name="location"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
        
          <div className="text-sm m-4">
            <label htmlFor="Cgpa"> </label>
            <input
              type="number"
              name="cgpa"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
      
          <div className="text-sm m-4">
            <label htmlFor="description"></label>
            <input
              type="text"
              name="description"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Company"
              value={companyname}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="text-sm m-4">
            <label htmlFor="Skills"> </label>
            <input
              type="text"
              name="Skills"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Skills"
              value={skillsrequired}
              onChange={(e) => setSkillrequired(e.target.value)}
            />
          </div>
          <div className="text-sm m-4">
            <label htmlFor="duration"> </label>
            <input
              type="text"
              name="duration"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div className="text-sm m-4">
            <label htmlFor="statu"></label>
            <input
              type="text"
              name="statu"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div className="text-sm m-4">
            <label htmlFor="status"> </label>
            <textarea
            rows={3}
              name="description"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
   
<div className="flex justify-center"><button
            className="bg-[#FDB827] w-[15%] mt-2 text-[#23120B] rounded-md p-1 shadow-lg"
            onClick={() => handleSubmit()}
          >
            Submit
          </button></div>
          
        </div>
      </div>

      <ToastContainer />
        </>
    )
}
