import React from "react";
import { Link } from "react-router-dom";
import "./error.css";

const Error = () => {
  return (
    <div className="error md:w-2/3 w-full mx-auto h-screen">
      <div className="flex items-end h-screen text-center">
        <Link
          to="/"
          className="Abril text-3xl font-thin text-gray-700 pb-32 transition ease-in duration-700 transform hover:scale-110 w-full"
        >
          Return to home page
        </Link>
      </div>
    </div>
  );
};

export default Error;
