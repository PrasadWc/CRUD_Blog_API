import Posts from "../models/posts.js";

export const addPost = async (req, res) => {
    const { title, content } =
      req.body;
    const newPost = new Posts({
        title, content, author: req.user.id
    });

    try {
      await newPost.save();
      res.status(201).json({ message: "Post Added successfully" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  };


export const getAll = async (req, res) => {
  try {
    const posts = await Posts.find().populate("author", "email");
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deletePost = async (req, res) => {
  try {
      const { id } = req.params;

      const post = await Posts.findById(id);
      if (!post) {
          return res.status(404).json({ message: "Post not found" });
      }

      // Checking that the logged-in user is the author
      if (post.author.toString() !== req.user.id) {
          return res.status(403).json({ message: "You are not authorized to delete this post" });
      }

      await Posts.findByIdAndDelete(id);
      res.status(200).json({ message: "Post deleted successfully" });

  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const getPostByID = async (req,res) => {
  try {
    const { id } = req.params;

    const post = await Posts.findById(id).populate("author", "email");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updatePost = async (req, res) => {
  try {
      const { id } = req.params; 
      const { title, content } = req.body; // Get updated data from request body

      // Find the post by ID
      const post = await Posts.findById(id);
      if (!post) {
          return res.status(404).json({ message: "Post not found" });
      }
      // checking that the logged-in user is the author
      if (post.author.toString() !== req.user.id) {
          return res.status(403).json({ message: "You are not authorized to update this post" });
      }

      post.title = title
      post.content = content
      post.updatedAt = new Date();

      // Save the updated post
      await post.save();
      res.status(200).json({ message: "Post updated successfully", post });

  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


  