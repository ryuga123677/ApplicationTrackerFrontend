import React from "react";
import { useNavigate } from "react-router-dom";
export const OptionPage = () => {
    const navigate=useNavigate();
  return (
    <>
      <div className="flex justify-center h-[94vh]">
        <div className="flex flex-col justify-center ">
          <div className="flex gap-10">
            <button onClick={()=>navigate('/loginprovider')} className="text-2xl text-[#21209C] border-2 border-[#FDB827] rounded-md hover:transition-all hover:scale-125 p-3">
              Job Poster
            </button>

            <button onClick={()=>navigate('/loginseeker')} className="text-2xl text-[#21209C] border-2 border-[#FDB827] rounded-md hover:transition-all hover:scale-125 p-3">
              Job Seeker
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
