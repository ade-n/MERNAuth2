import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProfile, getProfile } from "../../../actions/profile";
import { Link, withRouter } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";

const EditProfile = ({
  addProfile,
  getProfile,
  history,
  profile: { profile, loading },
}) => {
  const [formData, setFormData] = useState({
    company: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    linkedin: "",
    twitter: "",
    instagram: "",
  });

  const {
    company,
    location,
    status,
    skills,
    bio,
    linkedin,
    twitter,
    instagram,
  } = formData;

  let { _id } = profile.user;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    addProfile(formData, history, true, _id);
  };

  useEffect(() => {
    getProfile();
    setFormData({
      status: loading || !profile.status ? "" : profile.status,
      location: loading || !profile.location ? "" : profile.location,
      skills: loading || !profile.skills ? "" : profile.skills,
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      bio: loading || !profile.bio ? "" : profile.bio,
      linkedin:
        loading || !profile.social.linkedin ? "" : profile.social.linkedin,
      twitter: loading || !profile.social.twitter ? "" : profile.social.twitter,
      instagram:
        loading || !profile.social.instagram ? "" : profile.social.instagram,
    });
  }, [getProfile]);

  return (
    <div className="flex md:flex-row flex-col  px-12 py-24">
      <ProfileInfo />

      <div className="md:w-2/3 w-full md:mr-0 mx-auto">
        <div className="text-3xl text-gray-500 font-bold md:pt-0 pt-12">
          Edit your profile
        </div>

        <form onSubmit={onSubmit}>
          <div className=" w-full flex justify-between flex-wrap items-stretch">
            <div className="flex-auto md:mr-4 mr-0 ">
              <label className="block py-3 text-gray-700">Status</label>
              <input
                autoComplete="off"
                className="w-full focus:outline-none px-4 py-3 bg-indigo-500"
                name="status"
                value={status}
                placeholder="Architect"
                type="text"
                onChange={onChange}
                required
              />
            </div>
            <div className="flex-auto ">
              <label className="block py-3 text-gray-700">Skills</label>
              <input
                autoComplete="off"
                className="w-full focus:outline-none px-4 py-3 bg-indigo-500"
                name="skills"
                value={skills}
                placeholder="Revit,AutoCad,Rhino"
                type="text"
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className=" w-full flex justify-between flex-wrap items-stretch">
            <div className="flex-auto md:mr-4 mr-0 ">
              <label className="block py-3 text-gray-700">Location</label>
              <input
                autoComplete="off"
                className="w-full focus:outline-none px-4 py-3 bg-indigo-500"
                name="location"
                value={location}
                placeholder="London/UK"
                type="text"
                onChange={onChange}
              />
            </div>
            <div className="flex-auto ">
              <label className="block py-3 text-gray-700">Company</label>
              <input
                autoComplete="off"
                className="w-full focus:outline-none px-4 py-3 bg-indigo-500"
                name="company"
                value={company}
                placeholder="BD Architect"
                type="text"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex-auto ">
            <label className="block py-3 text-gray-700">Bio</label>
            <textarea
              autoComplete="off"
              className="w-full focus:outline-none px-4 py-3 bg-indigo-500"
              name="bio"
              value={bio}
              placeholder="Say something about your experience"
              type="text"
              onChange={onChange}
            />
          </div>

          <div className="w-full flex justify-between flex-wrap items-stretch">
            <div className="flex-auto md:mr-4 mr-0  ">
              <label className="block py-3 text-gray-700">Linkedin</label>
              <input
                autoComplete="off"
                className="w-full focus:outline-none px-4 py-3 bg-indigo-500"
                name="linkedin"
                value={linkedin}
                placeholder="Linkedin Link"
                type="text"
                onChange={onChange}
              />
            </div>

            <div className="flex-auto ">
              <label className="block py-3 text-gray-700">Twitter</label>
              <input
                autoComplete="off"
                className="w-full focus:outline-none px-4 py-3 bg-indigo-500"
                name="twitter"
                value={twitter}
                placeholder="Twitter Link"
                type="text"
                onChange={onChange}
              />
            </div>
          </div>

          <div className="flex-auto ">
            <label className="block py-3 text-gray-700">Instagram</label>
            <input
              autoComplete="off"
              className="w-full focus:outline-none px-4 py-3 bg-indigo-500"
              name="instagram"
              value={instagram}
              placeholder="Instagram link"
              type="text"
              onChange={onChange}
            />
          </div>

          <div className="flex justify-between">
            <div className="focus:outline-none text-white bg-gray-500 px-6 py-2 rounded-full  text-center my-8 shadow-md ">
              <Link to={`/profile/${_id}`}>Back</Link>
            </div>
            <input
              type="submit"
              className="cursor-pointer focus:outline-none text-white bg-red-500 px-6 py-2 rounded-full  text-center my-8 shadow-md hover:bg-red-400"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  addProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  addProfile,
  getProfile,
})(withRouter(EditProfile));

// /<Link to={`/profile/${_id}`}>Back</Link>
