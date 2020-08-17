import React, { useState } from "react";
import PropTypes from "prop-types";

import { addPost } from "../../../../actions/post";
import { connect } from "react-redux";

const AddPost = ({ addPost }) => {
  const [text, setText] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    addPost({ text });
    setText("");
  };

  return (
    <div className="bg-white shadow-md px-4 pt-4">
      <form onSubmit={onSubmit}>
        <textarea
          className="w-full p-2 appearance-none focus:outline-none hover:bg-gray-300 focus:bg-gray-300 border-none font-thin"
          type="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment"
        />
        <hr className="w-full" />
        <input
          type="submit"
          className=" outline-none py-4 cursor-pointer font-semibold bg-white text-gray-700 float-right  "
        />
      </form>
    </div>
  );
};

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(AddPost);
