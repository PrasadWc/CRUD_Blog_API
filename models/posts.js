import mongoose from "mongoose";
import Users from "./users.js";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
      },
      content: {
        type: String,
        required: true
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users,
        required: true
      }
    },
    {
      timestamps: true 
    }
);

const Posts = mongoose.model('Posts', postSchema);
export default Posts;