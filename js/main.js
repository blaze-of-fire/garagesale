import { renderGarageSaleItems } from './itemsTemplate.mjs';
import { LoadTheSnipcart } from './snipcart.js';

// 1) Load & render on page load
document.addEventListener("DOMContentLoaded", () => {
  renderGarageSaleItems();
  LoadTheSnipcart();
});

  // Create a MutationObserver to watch for new nodes in the Snipcart modal
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Search for the label element in the newly added nodes
          const buttonLabel = node.querySelector('.snipcart-base-button__label');
          if (buttonLabel) {
            // Find the closest button element that contains this label
            const placeOrderButton = buttonLabel.closest('button');
            if (placeOrderButton) {
              // Remove any previous click handlers if necessary
              placeOrderButton.onclick = null;
              // Attach our override click handler that redirects to home instead of processing the order
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

  // Observe the document body for childList changes throughout the subtree
  observer.observe(document.body, { childList: true, subtree: true });
