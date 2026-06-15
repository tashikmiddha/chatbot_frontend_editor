import { FaRobot } from "react-icons/fa";

const ChatbotPreview = ({
  config,
}) => {
  const isLeft =
    config.position ===
    "bottom-left";

  return (
    <div className="preview-wrapper">
      <div
        className={`chat-window ${
          isLeft
            ? "left"
            : "right"
        }`}
      >
        <div
  className="chat-header"
  style={{
    background: config.primaryColor,
  }}
>
  <div>
    <div>{config.chatbotName}</div>
    <small>Online</small>
  </div>
</div>

        <div
          className="chat-body"
          style={{
            background:
              config.backgroundColor,
          }}
        >
          <div
            className="bot-message"
            style={{
              background:
                config.secondaryColor,
              color:
                config.textColor,
            }}
          >
            {
              config.welcomeMessage
            }
          </div>

          <div
            style={{
              display:
                "flex",
              justifyContent:
                "flex-end",
            }}
          >
            <div
              className="bot-message"
              style={{
                background:
                  config.primaryColor,
                color:
                  "white",
              }}
            >
              Tell me about your
              services.
            </div>
          </div>

          <div
            className="bot-message"
            style={{
              background:
                config.secondaryColor,
              color:
                config.textColor,
            }}
          >
            I'd be happy to help!
            What would you like
            to know?
          </div>
        </div>

        <div className="chat-input">
          <input
            disabled
            placeholder="Type your message..."
          />
        </div>
      </div>

      <div
  className={`floating-button ${
    config.position === "bottom-left"
      ? "left"
      : "right"
  }`}
  style={{
    background: config.primaryColor,
  }}
>
  {config.launcherLogo ? (
    <img
      src={config.launcherLogo}
      alt="launcher"
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  ) : (
    <FaRobot />
  )}
</div>
    </div>
  );
};

export default ChatbotPreview;