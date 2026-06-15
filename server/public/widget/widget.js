(function () {
  const currentScript = document.currentScript;

  const BOT_ID = currentScript.getAttribute("data-bot-id");

  const getPublicBaseUrl = () => {
    try {
      const cfg = window.__CHATBOT_CONFIG__;
      if (cfg && cfg.publicBaseUrl) return cfg.publicBaseUrl;
    } catch (e) {}

    // Fallback: infer from the script src that loaded this widget
    const s = document.currentScript || currentScript;
    if (s && s.src) {
      try {
        return new URL(".", s.src).origin;
      } catch (e) {}
    }

    return "";
  };

  const PUBLIC_BASE_URL = getPublicBaseUrl();

  const API_BASE = PUBLIC_BASE_URL
    ? PUBLIC_BASE_URL + "/api/public/bot/"
    : "http://localhost:8000/api/public/bot/";

  let config = null;

  // ====================================
  // Markdown Renderer Loader
  // ====================================
  const loadMarked = () => {
    return new Promise((resolve, reject) => {
      if (window.marked) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load marked.js"));
      document.head.appendChild(script);
    });
  };

  const loadCSS = () => {
    const link = document.createElement("link");
    link.rel = "stylesheet";

    const href = window.__CHATBOT_CONFIG__?.publicBaseUrl
      ? window.__CHATBOT_CONFIG__.publicBaseUrl + "/widget.css"
      : PUBLIC_BASE_URL
        ? PUBLIC_BASE_URL + "/widget.css"
        : "http://localhost:8000/widget.css";

    link.href = href;
    document.head.appendChild(link);
  };

  const fetchConfig = async () => {
    const response = await fetch(API_BASE + BOT_ID);
    config = await response.json();
    buildWidget();
  };

  const buildWidget = () => {
    const launcher = document.createElement("div");
    launcher.id = "cf-launcher";

    launcher.style[
      config.position === "bottom-left" ? "left" : "right"
    ] = "20px";

    launcher.style.bottom = "20px";
    launcher.style.background = config.theme.primaryColor;

    launcher.innerHTML = config.launcherLogo
      ? `<img src="${config.launcherLogo}" />`
      : "🤖";

    document.body.appendChild(launcher);

    const windowDiv = document.createElement("div");
    windowDiv.id = "cf-window";

    windowDiv.style[
      config.position === "bottom-left" ? "left" : "right"
    ] = "20px";

    windowDiv.style.bottom = "95px";

    windowDiv.innerHTML = `
      <div id="cf-header" style="background:${config.theme.primaryColor}">
        ${config.chatbotName}
      </div>

      <div id="cf-body">
        <div class="cf-message cf-bot" style="background:${config.theme.secondaryColor}; color:${config.theme.textColor}">
          ${config.welcomeMessage}
        </div>
      </div>

      <div id="cf-input">
        <input id="cf-input-box" placeholder="Type your message..." />
        <button id="cf-send-btn" type="button" aria-label="Send message">➤</button>
      </div>

    `;

    document.body.appendChild(windowDiv);

    launcher.onclick = () => {
      windowDiv.style.display =
        windowDiv.style.display === "flex" ? "none" : "flex";
    };

    const input = document.getElementById("cf-input-box");
    const sendBtn = document.getElementById("cf-send-btn");

    const trySend = async () => {
      const message = input.value.trim();
      if (!message) return;

      addUserMessage(message);
      input.value = "";

      await sendToWebhook(message);
    };

    input.addEventListener("keypress", async (event) => {
      if (event.key !== "Enter") return;
      await trySend();
    });

    sendBtn.addEventListener("click", async () => {
      await trySend();
      input.focus();
    });
  };

  const addUserMessage = (text) => {
    const body = document.getElementById("cf-body");
    const div = document.createElement("div");

    div.className = "cf-message cf-user";
    div.style.background = config.theme.primaryColor;
    div.textContent = text;

    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  };

  const addBotMessage = (text) => {
    const body = document.getElementById("cf-body");

    const div = document.createElement("div");

    div.className = "cf-message cf-bot";

    div.style.background = config.theme.secondaryColor;
    div.style.color = config.theme.textColor;

    const content = String(text || "");

    if (window.marked) {
      div.innerHTML = marked.parse(content);
    } else {
      div.innerHTML = content.replace(/\n/g, "<br>");
    }

    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  };

  function showTypingIndicator() {
    const body = document.getElementById("cf-body");
    if (document.getElementById("cf-typing")) return;

    const typing = document.createElement("div");
    typing.id = "cf-typing";
    typing.className = "cf-message cf-bot cf-typing";

    typing.style.background = config.theme.secondaryColor;

    typing.innerHTML = `
      <span class="cf-dot"></span>
      <span class="cf-dot"></span>
      <span class="cf-dot"></span>
    `;

    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;
  }

  function removeTypingIndicator() {
    const typing = document.getElementById("cf-typing");
    if (typing) typing.remove();
  }

  const sendToWebhook = async (message) => {
    try {
      showTypingIndicator();

      const response = await fetch(config.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          sessionId,
          botId: config._id,
          companyName: config.companyName,
          chatbotName: config.chatbotName,
          page: window.location.href,
          hostname: window.location.hostname,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      removeTypingIndicator();

      const rawReply =
        data.output || data.response || data.message || "No response received.";

      const reply = String(rawReply || "").trim();

      addBotMessage(reply);
    } catch (error) {
      removeTypingIndicator();
      addBotMessage("Sorry, I couldn't process your request.");
      console.error(error);
    }
  };

  // Persistent Visitor Session ID
  const SESSION_KEY = `cf_session_${BOT_ID}`;
  let sessionId = localStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    sessionId =
      "cf_" +
      (window.crypto && crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString(36) +
          Math.random().toString(36).substring(2, 10));

    localStorage.setItem(SESSION_KEY, sessionId);
  }

  (async () => {
    try {
      await loadMarked();
      loadCSS();
      await fetchConfig();
    } catch (err) {
      console.error("Widget initialization failed:", err);
    }
  })();
})();

