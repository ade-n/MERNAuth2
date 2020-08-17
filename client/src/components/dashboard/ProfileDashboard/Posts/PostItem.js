import React, { useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import CommentItem from "./CommentItem";
import { Link } from "react-router-dom";

import { deletePost, likePost, unlikePost } from "../../../../actions/post";
import { connect } from "react-redux";
import AddComment from "./AddComment";

const PostItem = ({
  likePost,
  unlikePost,
  deletePost,
  post: { _id, text, avatar, name, user, likes, comments, date, status },
  auth,
}) => {
  const [data, setData] = useState({
    show: false,
    limit: 2,
    likeSwitch: false,
  });

  const { show, limit, likeSwitch } = data;

  const loadMore = () => {
    setData({ ...data, limit: data.limit + 2 });
  };

  const handleShow = () => {
    setData({ ...data, show: true });
  };

  // const like = likes
  //   .filter((like) => like.user !== auth.user._id)
  //   .map((like) =>
  //     like.user !== auth.user._id ? (
  //       <div className="cursor-pointer" onClick={(e) => likePost(_id)}>
  //         Like
  //       </div>
  //     ) : null
  //   );

  // const unlike = likes
  //   .filter((like) => like.user === auth.user._id)
  //   .map(
  //     (like) =>
  //       like.user === auth.user._id && (
  //         <div
  //           key={like._id}
  //           className="cursor-pointer"
  //           onClick={(e) => unlikePost(_id)}
  //         >
  //           Unlike
  //         </div>
  //       )
  //   );

  return (
    <div className="pt-6">
      <div className="flex justify-between w-full">
        <div className="flex ">
          <Link to={`/profile/${user}`}>
            <img
              src={avatar}
              alt="profile"
              className="w-16 h-16 rounded-full"
            />
          </Link>
          <div className="px-4">
            <div className="font-semibold text-gray-700">{name}</div>
            <div className="font-thin text-sm">{status}</div>
          </div>
        </div>

        {!auth.loading && user === auth.user._id && (
          <div
            onClick={() => deletePost(_id)}
            className="text-sm text-gray-700 cursor-pointer font-light"
          >
            <svg
              className="fill-current text-gray-700 inline-block h-4 w-4 hover:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
            >
              <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
            </svg>
          </div>
        )}
      </div>

      <div className="pb-2 font-md font-thin">{text}</div>
      <div className="pb-4 flex justify-between">
        <div className="flex text-sm">
          <div>{likes.length} Likes </div>

          <div className="px-2">.</div>
          {comments.length > 1 ? (
            <div className="cursor-pointer" onClick={handleShow}>
              {comments.length} Comments
            </div>
          ) : (
            <div className="cursor-pointer" onClick={handleShow}>
              {comments.length} Comment
            </div>
          )}
        </div>
        <Moment format="DD/MM/YYYY" className="text-sm">
          {date}
        </Moment>
      </div>

      <hr />
      <div className="flex pt-4 text-sm">
        <div className="cursor-pointer" onClick={(e) => likePost(_id)}>
          Like
        </div>
        <div className="cursor-pointer px-2" onClick={(e) => unlikePost(_id)}>
          Unlike
        </div>
        <div className="cursor-pointer" onClick={handleShow}>
          Add comment
        </div>
      </div>
      {show ? (
        <div>
          <AddComment
            postId={_id}
            profileId={auth.user._id}
            avatar={auth.user.avatar}
          />
          <div>
            {comments.slice(0, limit).map((comment) => (
              <CommentItem key={comment._id} comment={comment} postId={_id} />
            ))}
            {limit < comments.length && (
              <div
                onClick={loadMore}
                className=" cursor-pointer text-center text-gray-500 font-semibold"
              >
                Load More...
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, likePost, unlikePost })(
  PostItem
);

{
  /* <div className="cursor-pointer" onClick={(e) => likePost(_id)}>
          Like
        </div>
        <div className="cursor-pointer" onClick={(e) => unlikePost(_id)}>
          Unlike
        </div> */
}

// {likes.filter((like) => (
//   <div key={like._id} className="px-2 cursor-pointer">
//     {like.user === user._id ? (
//       <div onClick={(e) => unlikePost(_id)}>Unlike</div>
//     ) : (
//       <div>Like</div>
//     )}
//   </div>
// ))}

// {likes
//   .filter((like) => like.user === auth.user._id)
//   .map((like) =>
//     like.user === auth.user._id || like === null ? (
//       <div
//         key={like._id}
//         className="cursor-pointer"
//         onClick={(e) => unlikePost(_id)}
//       >
//         Unlike
//       </div>
//     ) : (
//       <div
//         key={like._id}
//         className="cursor-pointer text-gray-300"
//         onClick={(e) => unlikePost(_id)}
//       >
//         Unlike
//       </div>
//     )
//   )}
