import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../api/axios";

import ChatbotPreview from "../components/ChatbotPreview";
import ColorPicker from "../components/ColorPicker";
import PositionSelector from "../components/PositionSelector";
import EmbedCodeBox from "../components/EmbedCodeBox";

import "../styles/chatbot.css";

const BotSettings = () => {
  const [loading, setLoading] =
    useState(false);

  const [config, setConfig] = useState({
  companyName: "",
  chatbotName: "AI Assistant",
  welcomeMessage: "Hi! How can I help you today?",
  webhookUrl: "",
  launcherLogo: "",
  primaryColor: "#6366f1",
  secondaryColor: "#e0e7ff",
  backgroundColor: "#ffffff",
  textColor: "#111827",
  position: "bottom-right",
});

  const [botId, setBotId] =
    useState("BOT_ID");

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig =
    async () => {
      try {
        const { data } =
          await api.get("/bot");

        if (data) {
          setConfig({
            companyName:
              data.companyName ||
              "",
            chatbotName:
              data.chatbotName,
            welcomeMessage:
              data.welcomeMessage,
            webhookUrl:
              data.webhookUrl,
            primaryColor:
              data.theme
                ?.primaryColor,
            secondaryColor:
              data.theme
                ?.secondaryColor,
            backgroundColor:
              data.theme
                ?.backgroundColor,
            textColor:
              data.theme
                ?.textColor,
            position:
              data.position,
          });

          setBotId(data._id);
        }
      } catch (err) {}
    };

  const handleChange = (
    field,
    value
  ) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveConfig =
    async () => {
      try {
        setLoading(true);

        const payload = {
  companyName: config.companyName,
  chatbotName: config.chatbotName,
  welcomeMessage: config.welcomeMessage,
  webhookUrl: config.webhookUrl,
  launcherLogo: config.launcherLogo,
  position: config.position,
  theme: {
    primaryColor: config.primaryColor,
    secondaryColor: config.secondaryColor,
    backgroundColor: config.backgroundColor,
    textColor: config.textColor,
  },
};

        const { data } =
          await api.post(
            "/bot",
            payload
          );

        setBotId(data._id);

        toast.success(
          "Settings saved!"
        );
      } catch (err) {
        toast.error(
          "Failed to save."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <>
      <div className="page-header">
        <h1>
          Bot Settings
        </h1>

        <p>
          Configure your
          chatbot appearance
          and n8n webhook.
        </p>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="form-group">
            <label>
              Company Name
            </label>

            <input
              value={
                config.companyName
              }
              onChange={(e) =>
                handleChange(
                  "companyName",
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>
              Chatbot Name
            </label>

            <input
              value={
                config.chatbotName
              }
              onChange={(e) =>
                handleChange(
                  "chatbotName",
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>
              Welcome Message
            </label>

            <textarea
              value={
                config.welcomeMessage
              }
              onChange={(e) =>
                handleChange(
                  "welcomeMessage",
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>
              n8n Webhook URL
            </label>

            <input
              value={
                config.webhookUrl
              }
              onChange={(e) =>
                handleChange(
                  "webhookUrl",
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>
              Theme Colors
            </label>

            <div className="color-grid">
              <ColorPicker
                label="Primary"
                value={
                  config.primaryColor
                }
                onChange={(v) =>
                  handleChange(
                    "primaryColor",
                    v
                  )
                }
              />

              <ColorPicker
                label="Secondary"
                value={
                  config.secondaryColor
                }
                onChange={(v) =>
                  handleChange(
                    "secondaryColor",
                    v
                  )
                }
              />

              <ColorPicker
                label="Background"
                value={
                  config.backgroundColor
                }
                onChange={(v) =>
                  handleChange(
                    "backgroundColor",
                    v
                  )
                }
              />

              <ColorPicker
                label="Text"
                value={
                  config.textColor
                }
                onChange={(v) =>
                  handleChange(
                    "textColor",
                    v
                  )
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              Widget Position
            </label>

            <PositionSelector
              value={
                config.position
              }
              onChange={(v) =>
                handleChange(
                  "position",
                  v
                )
              }
            />
          </div>
          <div className="form-group">
  <label>Launcher Logo URL</label>

  <input
    type="text"
    placeholder="https://yourdomain.com/logo.png"
    value={config.launcherLogo}
    onChange={(e) =>
      handleChange(
        "launcherLogo",
        e.target.value
      )
    }
  />
</div>
          <button
            className="save-btn"
            onClick={
              saveConfig
            }
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save Settings"}
          </button>
        </div>

        <div>
          <div className="preview-card">
            <h3
              style={{
                marginBottom:
                  "20px",
              }}
            >
              Live Preview
            </h3>

            <ChatbotPreview
              config={
                config
              }
            />
          </div>

          <EmbedCodeBox
            botId={botId}
          />
        </div>
      </div>
    </>
  );
};

export default BotSettings;