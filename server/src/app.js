const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173"
    ],
    credentials: true}));
    
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AI Code Review Assistant API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/upload", uploadRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);

module.exports = app;