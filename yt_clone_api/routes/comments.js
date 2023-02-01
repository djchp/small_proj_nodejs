import express from "express";
import { addComment, deleteComment, getComents } from "../controllers/comment.js";
import {} from "../controllers/user.js";
import { verifyUser } from "../verifyuser.js";

const router = express.Router();

router.post("/", verifyUser, addComment);
router.delete("/:id", verifyUser, deleteComment);
router.get("/:videoId", getComents);


export default router;
