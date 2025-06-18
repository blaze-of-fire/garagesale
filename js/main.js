import { renderGarageSaleItems } from './itemsTemplate.mjs';
import { LoadTheSnipcart } from './snipcart.js';

// 1) Load & render on page load
document.addEventListener("DOMContentLoaded", () => {
  renderGarageSaleItems();
  LoadTheSnipcart();
});

document.addEventListener('snipcart.ready', () => {
  // Only proceed if we’re on the checkout page
  if (!window.location.hash.includes('#/checkout')) return;

  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Look for the base label elements.
          const labels = node.querySelectorAll('.snipcart-base-button__label');
          labels.forEach((label) => {
            // Option 1: Check if the label text equals "Place Order"
            if (label.textContent.trim() === 'Place Order') {
              // Add a custom class or ID. For example, adding the class "custom-place-order-label":
              label.classList.add('custom-place-order-label');
              // Now, target its closest button. That ensures you're working with the right button.
              const placeOrderButton = label.closest('button');
              if (placeOrderButton) {
                // Remove any preexisting click handlers if necessary.
                placeOrderButton.onclick = null;
                // Attach your override handler.
                placeOrderButton.addEventListener('click', (e) => {
                  e.preventDefault();
                  // For instance, redirecting to home page.
                  window.location.href = '/';
                });
              }
            }
          });
        }
      });
    });
  });

  // Observe the document body for added nodes.
  observer.observe(document.body, { childList: true, subtree: true });
});