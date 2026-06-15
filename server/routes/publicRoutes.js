const express = require("express");
const router = express.Router();

const {
  getPublicBot,
} = require("../controllers/publicController");

router.get(
  "/bot/:botId",
  getPublicBot
);

module.exports = router;