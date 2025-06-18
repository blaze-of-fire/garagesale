import { renderGarageSaleItems } from './itemsTemplate.mjs';
import { LoadTheSnipcart } from './snipcart.js';

// 1) Load & render on page load
document.addEventListener("DOMContentLoaded", () => {
  renderGarageSaleItems();
  LoadTheSnipcart();
});

document.addEventListener('snipcart.ready', () => {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Look inside added nodes for our error label
          const buttonLabel = node.querySelector('.snipcart-base-button__label');
          if (buttonLabel) {
            // Find the closest button element that contains this label
            const placeOrderButton = buttonLabel.closest('button');
            if (placeOrderButton) {
              // Remove any previously attached click handlers (if necessary)
              placeOrderButton.onclick = null;
              // Override click behavior: prevent normal processing and send the user our homepage
              placeOrderButton.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = '/';
              });
            }
          }
        }
      });
    });
  });
  // Observe the whole body—from now on, any new nodes (including the error modal)
  observer.observe(document.body, { childList: true, subtree: true });
});