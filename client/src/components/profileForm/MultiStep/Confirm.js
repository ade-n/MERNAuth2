import React, { Fragment } from "react";

class Confirm extends React.Component {
  prevStep = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      status,
      skills,
      company,
      location,
      bio,
      linkedin,
      instagram,
      twitter,
    } = this.props.values;
    if (this.props.currentStep !== 3) {
      return null;
    }
    return (
      <Fragment>
        <p className="text-white pb-4">Confirm details</p>
        <hr />
        <div className="py-4">
          <div className="flex py-2">
            <div className="text-white font-medium">Status: </div>
            {status === "" ? (
              <span className="text-white pl-2 text-red-500">
                Status is required
              </span>
            ) : (
              <span className="text-white pl-2 font-thin"> {status}</span>
            )}
          </div>

          <div className="flex py-2">
            {" "}
            <div className="text-white font-medium">Skills: </div>
            {status === "" ? (
              <span className="text-white pl-2 text-red-500">
                Skills are required
              </span>
            ) : (
              <span className="text-white pl-2 font-thin"> {skills}</span>
            )}
          </div>
          {company !== "" && (
            <div className="flex py-2">
              {" "}
              <div className="text-white font-medium">Company: </div>
              <span className="text-white pl-2 font-thin"> {company}</span>
            </div>
          )}

          {location !== "" && (
            <div className="flex py-2">
              <div className="text-white font-medium">Location: </div>
              <span className="text-white pl-2 font-thin"> {location}</span>
            </div>
          )}

          {bio !== "" && (
            <div className="flex py-2">
              <div className="text-white font-medium">Bio: </div>
              <span className="text-white pl-2 font-thin"> {bio}</span>
            </div>
          )}

          {linkedin !== "" && (
            <div className="flex py-2">
              <div className="text-white font-medium">Linkedin: </div>
              <span className="text-white pl-2 font-thin"> {linkedin}</span>
            </div>
          )}

          {twitter !== "" && (
            <div className="flex py-2">
              <div className="text-white font-medium">Twitter: </div>
              <span className="text-white pl-2 font-thin"> {twitter}</span>
            </div>
          )}

          {instagram !== "" && (
            <div className="flex py-2">
              <div className="text-white font-medium">Instagram: </div>
              <span className="text-white pl-2 font-thin"> {instagram}</span>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={this.prevStep}
              className="focus:outline-none text-white bg-gray-500 px-6 py-2 rounded-full  text-center my-8 shadow-md"
            >
              Back
            </button>
            <input
              type="submit"
              className="focus:outline-none text-white cursor-pointer bg-red-500 px-6 py-2 rounded-full  text-center my-8 shadow-md hover:bg-red-400"
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Confirm;
