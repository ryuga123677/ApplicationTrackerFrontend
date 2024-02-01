import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SpinnerDotted } from 'spinners-react';
import { useNavigate } from 'react-router-dom';
export const CreateApplication = () => {
    const navigate = useNavigate();


    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [companyname, setCompany] = useState('');
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [skillsrequired, setSkillrequired] = useState('');
    const handleSubmit = async () => {
        try {const username=localStorage.getItem('username','');
            const response = await axios.post('http://localhost:3000/api/createapplication', {
                title,
                location,
                companyname,
                amount,
                description,
                skillsrequired,
                username
            });
            console.log(response.data.message);
            if (response.data.message === "Application created successfully") {
                navigate('/');
            }
            else {
                navigate('/createapplication');
            }
        } catch (err) {

        }
    };

    return (
        <>


            <div className='flex justify-center items-center h-screen p-5 bg-gray-200 rounded-md shadow-md'>


                <div className='flex-column  justify-center items-center bg-gray-100 rounded-md shadow-md p-2 w-[50%]'>

                    <div className='text-bold text-red-400 text-2xl'>Create Application Below</div>
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


                    <button className='bg-red-300 rounded-md p-2 ml-[18rem] w-[10rem]' onClick={handleSubmit}>Submit</button>

                </div>





            </div>


        </>
    )
}
