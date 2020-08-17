import React from "react";
import "../../assets/fonts.css";
import Login from "../auth/Login";
import "./image.css";

const Landing = () => {
  return (
    <div className=" w-full h-full ">
      <div className="bimage-full flex md:flex-row flex-col">
        <div className="bimage md:w-2/3 w-full px-12 ">
          <div className="md:px-24 p-12 text-gray-500 md:text-md text-sm h-full flex items-end pt-24 md:pb-20 pb-4 text-center">
            Keeping everting in one place can be difficult. Start by create an
            account/profile, than jobs that might interest you, practice for an
            interview or perhaps share your thoughts with the others
          </div>
        </div>
        <div className="h-screen md:w-1/3 w-full bg-indigo-700">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Landing;
