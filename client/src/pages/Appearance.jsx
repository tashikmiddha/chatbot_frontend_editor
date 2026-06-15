import { useState } from "react";

import ColorPicker from "../components/ColorPicker";
import PositionSelector from "../components/PositionSelector";
import ChatbotPreview from "../components/ChatbotPreview";
import UploadBox from "../components/UploadBox";

import "../styles/chatbot.css";

const Appearance = () => {
  const [config, setConfig] =
    useState({
      chatbotName:
        "AI Assistant",
      welcomeMessage:
        "Hi! How can I help you?",
      primaryColor:
        "#6366f1",
      secondaryColor:
        "#e0e7ff",
      backgroundColor:
        "#ffffff",
      textColor:
        "#111827",
      position:
        "bottom-right",
      logo: "",
      avatar: "",
    });

  const update = (
    key,
    value
  ) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      <div className="page-header">
        <h1>
          Appearance
        </h1>
        <p>
          Customize the
          visual identity of
          your chatbot.
        </p>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <UploadBox
            label="Launcher Logo URL"
            value={
              config.logo
            }
            placeholder="https://..."
            onChange={(v) =>
              update(
                "logo",
                v
              )
            }
          />

          <UploadBox
            label="Bot Avatar URL"
            value={
              config.avatar
            }
            placeholder="https://..."
            onChange={(v) =>
              update(
                "avatar",
                v
              )
            }
          />

          <div className="color-grid">
            <ColorPicker
              label="Primary"
              value={
                config.primaryColor
              }
              onChange={(v) =>
                update(
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
                update(
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
                update(
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
                update(
                  "textColor",
                  v
                )
              }
            />
          </div>

          <div
            style={{
              marginTop:
                "20px",
            }}
          >
            <PositionSelector
              value={
                config.position
              }
              onChange={(v) =>
                update(
                  "position",
                  v
                )
              }
            />
          </div>
        </div>

        <div className="preview-card">
          <ChatbotPreview
            config={
              config
            }
          />
        </div>
      </div>
    </>
  );
};

export default Appearance;