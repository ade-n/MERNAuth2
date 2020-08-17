import React from "react";
import { Link } from "react-router-dom";

const NoProfile = ({ userName }) => {
  return (
    <div className="welcome h-screen flex align-middle w-full ">
      <div className="mx-auto h-full text-center flex items-end p-24">
        <div>
          <div className="text-2xl p-4 font-bold text-indigo-700">
            {userName}
          </div>
          <div className="text-gray-700 py-2 font-light">
            Follow the link and create your profile
          </div>

          <div className="focus:outline-none text-white bg-red-500 px-4 py-2 rounded-full w-full text-center  shadow-md hover:bg-red-400">
            <Link to="/create-profile">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoProfile;
