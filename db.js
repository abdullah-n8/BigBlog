// db.js
const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

const insertPost = async (title, content) => {
  const sanitizedTitle = sanitizeInput(title);
  const sanitizedContent = sanitizeInput(content);

  try {
    const post = new Post({
      title: sanitizedTitle,
      content: sanitizedContent,
    });
    await post.save();
  } catch (error) {
    console.error("Error while inserting post:", error);
  }
};

const findBlogs = async (id) => {
  try {
    if (id === null || id === undefined) {
      const posts = await Post.find();
      return posts;
    } else {
      let foundPost = await Post.findById(id);
      return foundPost;
    }
  } catch (error) {
    console.error("Error while finding blogs:", error);
  }
};

module.exports = {
  insertPost,
  findBlogs,
};
