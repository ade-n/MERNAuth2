import React, { Fragment } from "react";

class ProfileDetails extends React.Component {
  state = {
    required: true,
  };

  nextStep = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, onChange } = this.props;

    if (this.props.currentStep !== 1) {
      return null;
    }
    return (
      <Fragment>
        <p className="text-white">Current status details</p>
        <div className=" w-full flex justify-between flex-wrap items-stretch py-4">
          <div className="flex-auto md:mr-4 mr-0 ">
            <label className="block py-3 text-white">Status</label>
            <input
              autoComplete="off"
              className="w-full focus:outline-none px-4 py-3 bg-indigo-500"
              name="status"
              value={values.status}
              placeholder="* Architectural Assistant"
              type="text"
              onChange={onChange}
              required
            />
          </div>
          <div className="flex-auto ">
            <label className="block py-3 text-white">Location</label>
            <input
              autoComplete="off"
              className="w-full focus:outline-none px-4 py-3 bg-indigo-500"
              name="location"
              value={values.location}
              placeholder="London/UK"
              type="text"
              onChange={onChange}
            />
          </div>
        </div>

        <div className=" w-full flex justify-between flex-wrap items-stretch">
          <div className="flex-auto md:mr-4 mr-0 ">
            <label className="block py-3 text-white">Skills</label>
            <input
              autoComplete="off"
              className="w-full focus:outline-none px-4 py-3 bg-indigo-500"
              name="skills"
              value={values.skills}
              placeholder="* Autocad, Revit, Sketchup"
              type="text"
              onChange={onChange}
            />
          </div>
          <div className="flex-auto ">
            <label className="block py-3 text-white">Company</label>
            <input
              autoComplete="off"
              className="w-full focus:outline-none px-4 py-3 bg-indigo-500"
              name="company"
              value={values.company}
              placeholder="BD Architect"
              type="text"
              onChange={onChange}
            />
          </div>
        </div>

        <div className=" ">
          <label className="block py-3 text-white">Description</label>
          <textarea
            className="focus:outline-none px-4 py-3 bg-indigo-500 w-full"
            name="bio"
            value={values.bio}
            placeholder="Bio. Max 500 characters"
            type="text"
            onChange={onChange}
          />
        </div>
        <div className="text-right">
          <button
            onClick={this.nextStep}
            className="focus:outline-none text-white bg-red-500 px-6 py-2 rounded-full  text-center my-8 shadow-md hover:bg-red-400"
          >
            Next
          </button>
        </div>
      </Fragment>
    );
  }
}

export default ProfileDetails;
