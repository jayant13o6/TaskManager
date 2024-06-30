import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = (req, res, next) => {
  // const token = req.header("x-auth-token");
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    console.log("verify:", process.env.JWT_SECRET, token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log("1122", req.user, decoded);
    next();
  } catch (err) {
    console.log("error in auth", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;
