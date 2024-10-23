import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SpinnerDotted } from 'spinners-react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoLocationOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
export const EditApplication = () => {
    const notify = (message) => toast(message);
    const {id}=useParams();
    const navigate = useNavigate();


    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [companyname, setCompany] = useState('');
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [skillsrequired, setSkillrequired] = useState('');
    const [duration, setDuration] = useState('');
    const [statu, setStatus] = useState('');
    const handleSubmit = async () => {
        try {
            
            const response = await axios.post('http://localhost:3000/api/applicationmodifier', {
                title,
                location,
                companyname,
                amount,
                description,
                skillsrequired,
                duration,
                statu,
                id
            });
            console.log(response.data.message);
            if (response.data.message === "application updated successfully") {
                notify(response.data.message);
                // navigate('/');
            }
            else {
                // navigate('/applicationedit');
                notify(response.data.message);
            }
        } catch (err) {

            notify(err.message);
        }
    };

    return (
        <>


            <div className='flex justify-center items-center h-screen p-5 bg-red-50 rounded-md shadow-md'>


                <div className='flex-column  justify-center items-center bg-red-100 rounded-md shadow-md p-2 w-[50%]'>

                    <div className='text-bold text-red-400 text-2xl'>Edit Application Below</div>
                    <div className='text-lg m-4'>
                        <label htmlFor="title"></label>
                        <input type="text" name="title" className='rounded-md w-[40rem]' placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='text-lg m-4'>
                        <label htmlFor="location"></label>
                        <input type="text" name="location" className='rounded-md w-[40rem]' placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div className='text-lg m-4'>
                        <label htmlFor="amount"></label>
                        <input type="number" name="amount" className='rounded-md w-[40rem]' placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div className='text-lg m-4'>
                        <label htmlFor="description"></label>
                        <input type="text" name="description" className='rounded-md h-[5rem] w-[40rem]' placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className='text-lg m-4'>
                        <label htmlFor="Company"> </label>
                        <input type="text" name="Company" className='rounded-md w-[40rem]' placeholder="Company" value={companyname} onChange={(e) => setCompany(e.target.value)} />
                    </div>
                    <div className='text-lg m-4'>
                        <label htmlFor="Skills"> </label>
                        <input type="text" name="Skills" className='rounded-md w-[40rem]' placeholder="Skills" value={skillsrequired} onChange={(e) => setSkillrequired(e.target.value)} />
                    </div>
                    <div className='text-lg m-4'>
                        <label htmlFor="duration"> </label>
                        <input type="text" name="duration" className='rounded-md w-[40rem]' placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                    </div>
                    <div className='text-lg m-4'>
                        <label htmlFor="status"> </label>
                        <input type="text" name="status" className='rounded-md w-[40rem]' placeholder="Status" value={statu} onChange={(e) => setStatus(e.target.value)} />
                    </div>


                    <button className='bg-red-300 rounded-md p-2 ml-[18rem] w-[10rem]' onClick={handleSubmit}>Submit</button>

                </div>





            </div>
            <ToastContainer />


        </>
    )
}
