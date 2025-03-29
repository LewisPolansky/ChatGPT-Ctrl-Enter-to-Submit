// ==UserScript==
// @name         ChatGPT Ctrl+Enter to Submit
// @namespace    https://github.com/LewisPolansky/ChatGPT-Keyboard-Shortcuts
// @version      1.0
// @description  Enables Ctrl+Enter to submit ChatGPT prompts
// @author       Lewis Polansky
//
// @match        *://chatgpt.com/*
// @match        *://chat.openai.com/*
// @match        *://*.chatgpt.com/*
// @match        *://*.chat.openai.com/*
//
// @grant        GM_registerMenuCommand
//
// ==/UserScript==

(function() {
  'use strict';

  // By default, the feature is enabled
  let enabled = true;

  // This will let you toggle on/off via the Tampermonkey extension icon
  // (Click the Tampermonkey icon in your browser, and you’ll see the menu command)
  GM_registerMenuCommand('Toggle Ctrl+Enter Submit', function() {
    enabled = !enabled;
    alert('ChatGPT Ctrl+Enter to Submit is now ' + (enabled ? 'ENABLED' : 'DISABLED'));
  });

  // Listen for keydown events. If Ctrl+Enter is pressed, attempt to submit
  document.addEventListener('keydown', function(e) {
    if (!enabled) return; // Don’t do anything if the feature is disabled

    // Check if Ctrl+Enter is pressed
    if (e.ctrlKey && e.key === 'Enter') {
      // Look for the Send button (data-testid="send-button")
      const sendButton = document.querySelector('button[data-testid="send-button"]');
      if (sendButton && !sendButton.disabled) {
        sendButton.click();
        e.preventDefault(); // Prevent any default behavior
      }
    }
  });
})();
