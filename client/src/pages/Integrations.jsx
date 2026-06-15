import { useState } from "react";
import toast from "react-hot-toast";

import api from "../api/axios";
import EmbedCodeBox from "../components/EmbedCodeBox";

const Integrations = () => {
  const [webhookUrl, setWebhookUrl] =
    useState("");

  const [testing, setTesting] =
    useState(false);

  const testWebhook =
    async () => {
      if (!webhookUrl) {
        return toast.error(
          "Enter webhook URL."
        );
      }

      try {
        setTesting(true);

        await api.post(
          "/bot/test-webhook",
          {
            webhookUrl,
          }
        );

        toast.success(
          "Webhook responded successfully!"
        );
      } catch (error) {
        toast.error(
          "Webhook test failed."
        );
      } finally {
        setTesting(false);
      }
    };

  return (
    <>
      <div className="page-header">
        <h1>
          Integrations
        </h1>

        <p>
          Connect your n8n
          workflow and
          generate your
          widget embed code.
        </p>
      </div>

      <div className="settings-card">
        <div className="form-group">
          <label>
            n8n Webhook URL
          </label>

          <input
            value={
              webhookUrl
            }
            onChange={(
              e
            ) =>
              setWebhookUrl(
                e.target
                  .value
              )
            }
            placeholder="https://your-n8n-instance/webhook/..."
          />
        </div>

        <button
          className="save-btn"
          onClick={
            testWebhook
          }
          disabled={
            testing
          }
        >
          {testing
            ? "Testing..."
            : "Test Connection"}
        </button>
      </div>

      <EmbedCodeBox botId="YOUR_BOT_ID" />
    </>
  );
};

export default Integrations;