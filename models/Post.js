const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "profile" },
  text: { type: String, required: true },
  name: { type: String },
  avatar: { type: String },
  status: { type: String },
  location: { type: String },
  company: { type: String },
  likes: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "user" } }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      text: { type: String, require: true },
      name: { type: String },
      avatar: { type: String },
      status: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("post", PostSchema);
module.exports = Post;
