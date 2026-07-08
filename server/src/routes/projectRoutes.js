const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { create, getAll, getOne, remove } = require("../controllers/projectController");

router.use(authMiddleware);

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);
router.delete("/:id", remove);

module.exports = router;