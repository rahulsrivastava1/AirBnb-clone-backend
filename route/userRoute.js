import express from "express";
const router = express.Router();

import {
  signin,
  signup,
  forgot,
  addPost,
  posts,
  specificposts,
} from "../controllers/userCtrl.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.put("/forgot", forgot);
router.post("/addPost", addPost);
router.get("/posts", posts);
// router.get("/specificpost", specificposts);

export default router;
