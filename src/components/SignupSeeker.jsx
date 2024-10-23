import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SpinnerDotted } from "spinners-react";
import { useNavigate } from "react-router-dom";
export const SignupSeeker = () => {
  const navigate = useNavigate();

  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [companyname, setCompany] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/user/registerseeker", {
        name,
        email,
        password,

     
      });
      console.log(response.data.message);
      if (response.data.message === "user created successfully") {
        navigate("/loginseeker");
      } else {
        navigate("/registerseeker");
      }
    } catch (err) {}
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen p-7  rounded-md shadow-md ">
        <div className="flex-column  justify-center items-center bg-[#F1F1F1] rounded-md shadow-xl p-6">
          <div className="text-bold text-[#21209C] text-2xl ">Signup</div>
          <div className="text-lg m-4 ">
            <label htmlFor="username"></label>
            <input
              type="text"
              name="username"
              className="rounded-md text-sm p-1  w-full placeholder-[#23120B] placeholder:text-sm"
              placeholder="Name"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="text-lg m-4">
            <label htmlFor="email"></label>
            <input
              type="email"
              name="email"
              className="rounded-md text-sm w-full p-1 placeholder-[#23120B] placeholder:text-sm"
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
              className="rounded-md w-full text-sm p-1 placeholder-[#23120B] placeholder:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex text-sm ml-5 m-2'>Already have account? <button className='text-[#edc368] text-sm' onClick={()=>navigate('/loginseeker')}>Login here</button></div>
          
          <div className="flex justify-center">
            <button
              className="bg-[#FDB827] text-[#23120B] w-[80%] rounded-md p-1 shadow-lg "
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
