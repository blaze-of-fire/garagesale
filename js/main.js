import { renderGarageSaleItems } from './itemsTemplate.mjs';
import { LoadTheSnipcart } from './snipcart.js';

// 1) Load & render on page load
document.addEventListener("DOMContentLoaded", () => {
  renderGarageSaleItems();
  LoadTheSnipcart();
});

document.addEventListener('snipcart.ready', () => {
  // Create a MutationObserver to watch for error modals being added
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        // Check if an element representing the error modal was added.
        // The class names used here are internal and may change.
        if (node.nodeType === 1 && node.matches('.snipcart-modal')) {
          const errorModal = node.querySelector('.snipcart-modal--error');
          if (errorModal) {
            const placeOrderButton = node.querySelector('.snipcart-btn-place-order');
            if (placeOrderButton) {
              // Remove any previous click events (if necessary)
              placeOrderButton.onclick = null;
              // Override click behavior to redirect home instead of processing order
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

  // Observe the document body for added nodes (subtree: true to catch deep changes)
  observer.observe(document.body, { childList: true, subtree: true });
});