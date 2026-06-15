const BotConfig = require("../models/BotConfig");

const getPublicBot = async (
  req,
  res
) => {
  try {
    const bot =
      await BotConfig.findById(
        req.params.botId
      );

    if (!bot || !bot.active) {
      return res
        .status(404)
        .json({
          success: false,
        });
    }

    res.json({
      _id: bot._id,
      companyName:
        bot.companyName,
      chatbotName:
        bot.chatbotName,
      welcomeMessage:
        bot.welcomeMessage,
      webhookUrl:
        bot.webhookUrl,
      launcherLogo:
        bot.launcherLogo,
      position:
        bot.position,
      theme: bot.theme,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
      });
  }
};

module.exports = {
  getPublicBot,
};