import express from "express";
import {} from "../controllers/user.js";
import {
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  random,
  search,
  sub,
  tags,
  trend,
  updateVideo,
} from "../controllers/video.js";
import { verifyUser } from "../verifyUser.js";

const router = express.Router();

router.post("/", verifyUser, addVideo);
router.put("/:id", verifyUser, updateVideo);
router.delete("/:id", verifyUser, deleteVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);
router.get("/random", random);
router.get("/trend", trend);
router.get("/sub", verifyUser, sub);
router.get("/tags", tags);
router.get("/search", search);


export default router;
