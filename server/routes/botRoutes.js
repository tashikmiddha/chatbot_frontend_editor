const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  saveBotConfig,
  getBotConfig,
} = require("../controllers/botController");

router.post("/", protect, saveBotConfig);
router.get("/", protect, getBotConfig);

module.exports = router;