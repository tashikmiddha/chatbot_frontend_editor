const BotConfig = require("../models/BotConfig");

const saveBotConfig = async (req, res) => {
  try {
    const existing =
      await BotConfig.findOne({
        userId: req.user.id,
      });

    if (existing) {
      const updated =
        await BotConfig.findByIdAndUpdate(
          existing._id,
          req.body,
          {
            new: true,
          }
        );

      return res.json(updated);
    }

    const config =
      await BotConfig.create({
        ...req.body,
        userId: req.user.id,
      });

    res.json(config);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBotConfig = async (req, res) => {
  try {
    const config =
      await BotConfig.findOne({
        userId: req.user.id,
      });

    res.json(config);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  saveBotConfig,
  getBotConfig,
};