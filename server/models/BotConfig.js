const mongoose = require("mongoose");

const BotConfigSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyName: {
      type: String,
      default: "",
    },

    chatbotName: {
      type: String,
      default: "AI Assistant",
    },

    welcomeMessage: {
      type: String,
      default: "Hi! How can I help you today?",
    },

    webhookUrl: {
      type: String,
      required: true,
    },

    launcherLogo: {
      type: String,
      default: "",
    },

    theme: {
      primaryColor: {
        type: String,
        default: "#6366f1",
      },
      secondaryColor: {
        type: String,
        default: "#e0e7ff",
      },
      backgroundColor: {
        type: String,
        default: "#ffffff",
      },
      textColor: {
        type: String,
        default: "#111827",
      },
    },

    position: {
      type: String,
      enum: ["bottom-left", "bottom-right"],
      default: "bottom-right",
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BotConfig", BotConfigSchema);

