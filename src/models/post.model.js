const mongoose = require("mongoose");
const User = require("./user.model");

const postSchema = new mongoose.Schema(
  {
    // title ( required ) body ( required ) user ( references the user collection and is required )
    title: { type: String, required: true },
    body: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
