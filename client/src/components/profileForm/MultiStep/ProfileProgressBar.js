import React from "react";
import "../profile.css";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

function getSteps() {
  return ["Status Profile", "Social Media Profile", "Confirm"];
}

const ProfileProgressBar = ({ activeStep }) => {
  const steps = getSteps();

  const instance = (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );

  return (
    <div className="profile md:w-1/3 w-full p-6 bg-white">
      <div className=" py-24">{instance}</div>
      <div className="text-center px-6 text-gray-600 font-light">
        Follow the steps and create your profile.
      </div>
    </div>
  );
};

export default ProfileProgressBar;
