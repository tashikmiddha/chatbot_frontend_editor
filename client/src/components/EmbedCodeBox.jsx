import toast from "react-hot-toast";

const EmbedCodeBox = ({
  botId,
}) => {
  const code = `<script>
  window.__CHATBOT_CONFIG__ = window.__CHATBOT_CONFIG__ || {};
  window.__CHATBOT_CONFIG__.publicBaseUrl = window.__CHATBOT_CONFIG__.publicBaseUrl || window.location.origin;
</script>
<script src="${(window.__CHATBOT_CONFIG__ && window.__CHATBOT_CONFIG__.publicBaseUrl) || window.location.origin}/widget/loader.js" data-bot-id="${botId}"></script>`;


  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    toast.success("Embed code copied!");
  };

  return (
    <div className="embed-box">
      <h3>Embed Code</h3>

      <div className="embed-code">{code}</div>

      <button
        className="copy-btn"
        onClick={copyCode}
      >
        Copy Embed Code
      </button>
    </div>
  );
};

export default EmbedCodeBox;

