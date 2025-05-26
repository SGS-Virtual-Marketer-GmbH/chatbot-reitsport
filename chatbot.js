
(function() {
  // Configuration
  var WIDGET_APP_URL = 'https://reitsport-ch-ai-chat-widget-394370849364.us-west1.run.app/';
  var IFRAME_ID = 'virtual-marketer-chat-widget-iframe';

  // Helper function to log messages
  function log(message) {
    console.log('Virtual Marketer Chat Widget Loader: ' + message);
  }
  
  // Helper function to log warnings (though less likely to be needed now)
  function warn(message) {
    console.warn('Virtual Marketer Chat Widget Loader: ' + message);
  }

  // Check if the widget is already loaded to prevent multiple injections
  if (document.getElementById(IFRAME_ID)) {
    log('Already loaded.');
    return;
  }

  // Create the iframe element
  var iframe = document.createElement('iframe');
  iframe.id = IFRAME_ID;
  iframe.src = WIDGET_APP_URL;
  iframe.title = 'Virtual Marketer AI Chat Assistant'; // Accessibility: Descriptive title

  // Style the iframe for fixed positioning, size, and appearance
  iframe.style.position = 'fixed';
  iframe.style.right = '16px';
  iframe.style.bottom = '16px';
  iframe.style.width = '400px';   // Matches the max-width of your chat window in ChatWidgetContainer
  iframe.style.height = '664px';  // Accommodates chat window (max 600px) + bubble offset and header (approx 64px total)
  iframe.style.border = 'none';
  iframe.style.zIndex = '2147483640'; // A very high z-index to appear above most other content
  iframe.style.backgroundColor = 'transparent'; // Essential for seamless integration of the bubble
  iframe.setAttribute('allowTransparency', 'true'); // For older browser compatibility

  // No API key injection logic here. The iframe's content (your React app)
  // is responsible for sourcing its own API key (e.g., from its process.env).

  iframe.onload = function() {
    log('Iframe content loaded from ' + WIDGET_APP_URL);
    // You could add post-load checks here if needed, but API key injection is removed.
  };
  
  iframe.onerror = function() {
    warn('Failed to load iframe content from ' + WIDGET_APP_URL + '. Check the URL and network connectivity.');
  };

  // Append the iframe to the host page's body
  // Wait for DOMContentLoaded if the body is not yet available (e.g. script in <head> without defer)
  if (document.body) {
      document.body.appendChild(iframe);
      log('Iframe appended to body.');
  } else {
      document.addEventListener('DOMContentLoaded', function() {
          if (document.body) {
            document.body.appendChild(iframe);
            log('Iframe appended to body after DOMContentLoaded.');
          } else {
            warn('Document body not found even after DOMContentLoaded. Iframe cannot be appended.');
          }
      });
  }

})();
