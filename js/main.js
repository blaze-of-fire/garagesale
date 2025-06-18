import { renderGarageSaleItems } from './itemsTemplate.mjs';
import { LoadTheSnipcart } from './snipcart.js';

// 1) Load & render on page load
document.addEventListener("DOMContentLoaded", () => {
  renderGarageSaleItems();
  LoadTheSnipcart();
});

  document.addEventListener('snipcart.ready', () => {
  // Only proceed if we're on the checkout page
  if (!window.location.hash.includes('#/checkout')) return;

  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Find all labels that match "Place Order"
          const labels = node.querySelectorAll('.snipcart-base-button__label');
          labels.forEach((label) => {
            if (label.textContent.trim() === 'Place Order') {
              const placeOrderButton = label.closest('button');
              if (placeOrderButton) {
                placeOrderButton.onclick = null;
                placeOrderButton.addEventListener('click', (e) => {
                  e.preventDefault();
                  window.location.href = '/';
                });
              }
            }
          });
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});