import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import cors from "cors";

dotenv.config();

const app = express();
console.log("Mongo URI:", process.env.MONGO_URI);

// Connect Database
connectDB();
// Init Middleware
app.use(express.json({ extended: false }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
