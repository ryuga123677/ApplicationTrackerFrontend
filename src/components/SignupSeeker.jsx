import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SignupSeeker = () => {
  const navigate = useNavigate();

  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilephoto, setProfilePhoto] = useState(null); // State for profile photo

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]); // Set the selected file
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    // Append form fields to FormData object
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    // Append profile photo if a file is selected
    if (profilephoto) {
      formData.append("profilephoto", profilephoto);
    }

    try {
      const response = await axios.post("http://localhost:3000/user/registerseeker", formData);

      console.log(response.data.message);
      if (response.data.message === "user created successfully") {
        navigate("/loginseeker");
      } else {
        navigate("/registerseeker");
      }
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen p-7 rounded-md shadow-md">
        <div className="flex-column justify-center items-center bg-[#F1F1F1] rounded-md shadow-xl p-6">
          <div className="text-bold text-[#21209C] text-2xl">Signup</div>

          <div className="text-lg m-4">
            <label htmlFor="username"></label>
            <input
              type="text"
              name="name"
              className="rounded-md text-sm p-1 w-full placeholder-[#23120B] placeholder:text-sm"
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

          <div className="text-sm m-4">
            <label htmlFor="profilephoto">Profile Photo</label>
            <input
              type="file"
              name="profilephoto"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-[#FDB827] file:text-[#23120B]"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex text-sm ml-5 m-2">
            Already have an account?{" "}
            <button
              className="text-[#edc368] text-sm"
              onClick={() => navigate("/loginseeker")}
            >
              Login here
            </button>
          </div>

          <div className="flex justify-center">
            <button
              className="bg-[#FDB827] text-[#23120B] w-[80%] rounded-md p-1 shadow-lg"
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