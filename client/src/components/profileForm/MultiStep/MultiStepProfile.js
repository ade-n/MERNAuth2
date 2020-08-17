import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import ProfileDetails from "./ProfileDetails";
import SocialMediaDetails from "./SocialMediaDetails";
import Confirm from "./Confirm";
import { addProfile } from "../../../actions/profile";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProfileProgressBar from "./ProfileProgressBar";

const MultiStepProfileNoSwitch = ({ addProfile, history }) => {
  const [formData, setFormData] = useState({
    currentStep: 1,
    activeStep: 0,
    status: "",
    company: "",
    location: "",
    skills: [],
    bio: "",
    facebook: "",
    youtube: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  });

  const {
    currentStep,
    activeStep,
    status,
    company,
    location,
    skills,
    facebook,
    bio,
    twitter,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const values = {
    status,
    company,
    location,
    skills,
    facebook,
    bio,
    twitter,
    linkedin,
    youtube,
    instagram,
  };

  // Proceed to next step
  const nextStep = () => {
    setFormData({
      ...formData,
      activeStep: activeStep + 1,
      currentStep: currentStep + 1,
    });
  };

  // Go back to prev step
  const prevStep = () => {
    setFormData({
      ...formData,
      activeStep: activeStep - 1,
      currentStep: currentStep - 1,
    });
  };

  // Handle fields change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    addProfile(formData, history);
  };

  return (
    <Fragment>
      <div className="w-full relative flex md:flex-row flex-col h-screen">
        <ProfileProgressBar activeStep={activeStep} />

        <div className="md:w-2/3 flex w-full items-center  bg-indigo-700">
          <div className="w-2/3 mx-auto p-4 ">
            <div className="text-4xl md:py-4 py-24 text-white">
              Create profile
            </div>

            <form onSubmit={handleSubmit}>
              <ProfileDetails
                currentStep={currentStep}
                nextStep={nextStep}
                onChange={handleChange}
                values={values}
              />
              <SocialMediaDetails
                currentStep={currentStep}
                prevStep={prevStep}
                nextStep={nextStep}
                onChange={handleChange}
                values={values}
              />
              <Confirm
                currentStep={currentStep}
                prevStep={prevStep}
                values={values}
              />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

MultiStepProfileNoSwitch.propTypes = {
  addProfile: PropTypes.func.isRequired,
};

export default connect(null, { addProfile })(
  withRouter(MultiStepProfileNoSwitch)
);
