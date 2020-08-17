import React from "react";
import spinner from "../../assets/img/Spinner.gif";

const Spinner = () => {
  return (
    <div className="h-screen flex align-middle w-full ">
      <img
        src={spinner}
        style={{
          width: "200px",
          margin: "auto",
          display: "block",
        }}
        alt="loading..."
      />
    </div>
  );
};

export default Spinner;
