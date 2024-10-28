import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SignupProvider = () => {
  const navigate = useNavigate();
  const [loading, setLoading]=useState(false);
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [companyname, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
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
    formData.append("companyname", companyname);
    formData.append("title", title);

    // Append profile photo if a file is selected
    if (profilephoto) {
      formData.append("profilephoto", profilephoto);
    }

    try { setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/provider/registerprovider`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data.message);
      if (response.data.message === "user created successfully") {
        navigate("/loginprovider");
        setLoading(false)
      } else {
        navigate("/signupprovider");
        setLoading(false)
      }
    } catch (err) {
      console.error("Error submitting form", err);
      setLoading(false)
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen p-7 rounded-md shadow-md">
        <div className="flex-column justify-center w-[25%] items-center bg-[#F1F1F1] rounded-md shadow-xl p-6">
        <div className='relative w-0 h-0 border-t-[100px] border-r-[120px] border-transparent border-t-[#21209c]'></div>
          <div className="text-bold text-[#21209C] text-3xl ">Signup</div>

          <div className="text-lg m-4">
            <label htmlFor="name"></label>
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

          <div className="text-lg m-4">
            <label htmlFor="companyname"></label>
            <input
              type="text"
              name="companyname"
              className="rounded-md text-sm p-1 w-full placeholder-[#23120B] placeholder:text-sm"
              placeholder="Company"
              value={companyname}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="text-lg m-4">
            <label htmlFor="title"></label>
            <input
              type="text"
              name="title"
              className="rounded-md text-sm p-1 w-full placeholder-[#23120B] placeholder:text-sm"
              placeholder="Position"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              onClick={() => navigate("/loginprovider")}
            >
              Login here
            </button>
          </div>

          <div className="flex justify-center">
            <button
              className="bg-[#FDB827] w-[80%] text-[#23120B] rounded-md p-1 shadow-lg hover:scale-105 transition-all"
              onClick={handleSubmit}
            >
              {loading==false? <div>Submit</div>:(<SpinnerRound size={30} thickness={100} speed={98} color="rgba(255, 255, 255, 1)" />)}
            </button>
          </div>
          <div className='flex justify-end'> <div className="w-0 h-0 border-solid border-b-[100px] border-l-[120px] border-transparent border-b-[#21209c]"></div></div>
        </div>
      </div>
    </>
  );
};
