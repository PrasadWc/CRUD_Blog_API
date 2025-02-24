import express from "express";
import { addPost, getAll, deletePost, getPostByID, updatePost } from "../controllers/postController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authenticateUser, addPost);
router.get("/getall", authenticateUser, getAll);
router.delete("/delete/:id", authenticateUser, deletePost);
router.get("/getpost/:id", authenticateUser, getPostByID);
router.put("/update/:id", authenticateUser, updatePost);


export default router;