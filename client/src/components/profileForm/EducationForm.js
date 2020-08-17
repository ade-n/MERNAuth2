import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
import { Link } from "react-router-dom";

const EducationForm = ({ auth: { user }, addEducation }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    from: "",
    to: "",
    fieldofstudy: "",
    current: false,
  });

  const { school, degree, fieldofstudy, from, current, to } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    addEducation(formData);
    setFormData({ school: "", degree: "", from: "", to: "", fieldofstudy: "" });
  };

  let { _id } = user;

  return (
    <Fragment>
      <div className="px-12 md:py-24 py-12 w-full  flex items-center md:h-screen h-full bg-indigo-700">
        <div className="mx-auto md:w-1/2 w-full p-4 ">
          <div className="text-4xl text-center py-4 text-white">
            Add Education
          </div>

          <form className="py-4  mx-auto" onSubmit={onSubmit}>
            <div className="pb-2">
              <label className="block py-2 text-white">School</label>
              <input
                autoComplete="off"
                className="focus:outline-none px-4 py-3 bg-indigo-500 w-full"
                name="school"
                value={school}
                placeholder="Collage of London"
                type="text"
                onChange={onChange}
                required
              />
            </div>

            <div>
              <label className="block py-2 text-white">Degree</label>
              <input
                className="w-full focus:outline-none px-4 py-3 bg-indigo-500"
                name="degree"
                value={degree}
                placeholder="BA Hons Literature"
                type="text"
                onChange={onChange}
                required
              />
            </div>

            <div>
              <label className="block py-2 text-white">Field of Study</label>
              <input
                className="w-full focus:outline-none px-4 py-3 bg-indigo-500"
                name="fieldofstudy"
                value={fieldofstudy}
                placeholder="Literature"
                type="text"
                onChange={onChange}
                required
              />
            </div>

            <div className="flex md:flex-row flex-col w-full">
              <div className="w-full mr-4">
                <label className="block py-2 text-white">From Date</label>
                <input
                  className="w-full focus:outline-none px-4 py-3 bg-indigo-500 "
                  name="from"
                  value={from}
                  type="date"
                  onChange={onChange}
                  required
                />
              </div>
              <div className="w-full">
                <label className="block py-2 text-white">To Date</label>
                <input
                  className="w-full focus:outline-none px-4 py-3 bg-indigo-500"
                  name="to"
                  value={to}
                  type="date"
                  onChange={onChange}
                />
              </div>
            </div>
            <div>
              <label className="block py-2 text-white">Current School</label>
              <input
                type="checkbox"
                value={current}
                onChange={() => setFormData({ ...formData, current: !current })}
              />
            </div>

            <div className="w-full flex justify-between">
              <div className=" focus:outline-none text-white bg-gray-500 px-12 py-2 rounded-full  text-center my-8 shadow-md ">
                <Link to={`/profile/${_id}`}>Back</Link>
              </div>
              <input
                type="submit"
                className=" focus:outline-none text-white bg-red-500 px-12 py-2 rounded-full  text-center my-8 shadow-md hover:bg-red-400"
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

EducationForm.propTypes = {
  addEducation: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addEducation })(EducationForm);

//<Link to={`/profile/${_id}`}>Back</Link>

// name="current"
// checked={current}
//                 value={current}
