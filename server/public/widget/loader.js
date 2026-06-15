(function () {
  // Simple loader entrypoint for the widget.
  // Loads widget.js and lets it pick up data-bot-id from the script tag.

  var currentScript = document.currentScript;
  if (!currentScript) {
    // fallback
    var scripts = document.getElementsByTagName('script');
    currentScript = scripts[scripts.length - 1];
  }

  var botId = currentScript && currentScript.getAttribute
    ? currentScript.getAttribute('data-bot-id')
    : null;

  // Expose bot id for widget.js (it can read __CHATBOT_BOT_ID__)
  // without changing widget.js internals.
  window.__CHATBOT_BOT_ID__ = botId;

  // Determine base URL from loader.js URL.
  // Prefer the explicit loader src, but fall back to currentScript.src if needed.
  var base = '';
  try {
    var src = currentScript && currentScript.src;
    if (src) {
      base = new URL('.', src).href; // ensures trailing slash
    }
  } catch (e) {}

  // Ensure we only load widget.js.
  var widgetSrc = base + 'widget.js';

  // If we couldn't infer base, try relative path as a last resort.
  if (!widgetSrc || widgetSrc === 'widget.js') {
    widgetSrc = 'widget.js';
  }


  var s = document.createElement('script');
  s.src = widgetSrc;
  s.async = true;
  s.onload = function () {
    // nothing
  };

  s.onerror = function () {
    console.error('Chatbot widget failed to load:', widgetSrc);
  };

  document.head.appendChild(s);
})();

