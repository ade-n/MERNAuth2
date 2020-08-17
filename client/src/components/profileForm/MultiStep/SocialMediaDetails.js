import React, { Fragment } from "react";

class SocialMediaDetails extends React.Component {
  nextStep = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  prevStep = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, onChange } = this.props;

    if (this.props.currentStep !== 2) {
      return null;
    }
    return (
      <Fragment>
        <p className="text-white">Social Media details</p>
        <div className="py-4">
          <div className=" w-full  flex-wrap items-stretch">
            <div>
              <label className="block py-3 text-white">Linkedin</label>
              <input
                className="focus:outline-none px-4 py-3 bg-indigo-500 w-full"
                name="linkedin"
                value={values.linkedin}
                placeholder="linkedin"
                type="text"
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block py-3 text-white">Twitter</label>
              <input
                className="focus:outline-none px-4 py-3 bg-indigo-500 w-full"
                name="twitter"
                value={values.twitter}
                placeholder="twitter"
                type="text"
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block py-3 text-white">Instagram</label>
              <input
                className="focus:outline-none px-4 py-3 bg-indigo-500 w-full"
                name="instagram"
                value={values.instagram}
                placeholder="instagram"
                type="text"
                onChange={onChange}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={this.prevStep}
                className="focus:outline-none text-white bg-gray-500 px-6 py-2 rounded-full text-center my-8 shadow-md"
              >
                Back
              </button>
              <button
                onClick={this.nextStep}
                className="focus:outline-none text-white bg-red-500 px-6 py-2 rounded-full text-center my-8 shadow-md hover:bg-red-400"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SocialMediaDetails;
