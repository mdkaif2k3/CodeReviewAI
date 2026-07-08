const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const { upload } = require("../controllers/uploadController");

router.post("/", authMiddleware, uploadMiddleware, upload);

module.exports = router;