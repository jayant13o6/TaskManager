import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post("/register", registerUser);

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post("/login", loginUser);

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
router.get("/", auth, getUser);

export default router;
