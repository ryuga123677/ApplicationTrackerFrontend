import React, { useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
export const ApplyJob = () => {
  const notify = (message) => toast(message);
  const navigate = useNavigate();
const {jobid}=useParams();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [cgpa, setCgpa] = useState(0);
  const [college, setCollege] = useState("");
  const [skills, setSkill] = useState("");
  const [hirereason, setHirereason] = useState("");
  const [coverletter, setCV] = useState("");
  const [resume, setResume] = useState(null);  // Handle file upload
  const islogin = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/isseekerlogin`);
      console.log(response.data);
      if (response.data === "no refreshtoken") {
        
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
      const formData = new FormData();  // Create FormData object

      // Append all fields including the file
      formData.append("name", name);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("college", college);
      formData.append("cgpa", cgpa);
      formData.append("skills", skills);
      formData.append("hirereason", hirereason);
      formData.append("coverletter", coverletter);
      formData.append("jobid", jobid);

      formData.append("resume", resume);  // Attach the file

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/createdetails`,
        formData,
      
      );
      
      if (response.data.message === "Application created successfully") {
        notify(response.data.message);
        // navigate('/');
      } else {
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
        <div className="flex-column  justify-center items-center bg-[#F1F1F1] rounded-md shadow-md p-2 w-[47%]">
          <div className="text-bold text-[#21209C] m-2 text-2xl">
            Fill Details
          </div>
          <div className="text-sm m-4">
            <input
              type="text"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="text-sm m-4">
            <input
              type="text"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="text-sm m-4">
            <input
              type="text"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="text-sm m-4">
            <input
              type="text"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="College with branch"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            />
          </div>
          <div className="text-sm m-4">
            <input
              type="number"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="CGPA"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
            />
          </div>
          <div className="text-sm m-4">
            <input
              type="text"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Skills"
              value={skills}
              onChange={(e) => setSkill(e.target.value)}
            />
          </div>
          <div className="text-sm m-4">
            <input
              type="text"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Why you should be hired for this role?"
              value={hirereason}
              onChange={(e) => setHirereason(e.target.value)}
            />
          </div>
          <div className="text-sm m-4">
            <textarea
              rows={3}
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Cover letter"
              value={coverletter}
              onChange={(e) => setCV(e.target.value)}
            />
          </div>
          <div className="text-sm m-4">
            <label htmlFor="resume" className="text-[#21209C] ml-2">
              Resume
            </label>
            <input
              type="file"
              accept=".pdf"
              id="resume"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              onChange={(e) => setResume(e.target.files[0])}  // Capture the file
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-[#FDB827] w-[15%] mt-2 text-[#23120B] rounded-md p-1 shadow-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};
