import { renderGarageSaleItems } from './itemsTemplate.mjs';
import { LoadTheSnipcart } from './snipcart.js';

// 1) Load & render on page load
document.addEventListener("DOMContentLoaded", () => {
  renderGarageSaleItems();
  LoadTheSnipcart();
});

document.addEventListener('snipcart.ready', () => {
  // Only run if we're on the checkout page
  if (!window.location.hash.includes('#/checkout')) {
    console.log("Not on checkout, override code not running.");
    return;
  }

  console.log("On checkout. Starting to poll for Place Order button...");

  // Poll every 500ms to find the Place Order button
  const intervalId = setInterval(() => {
    const labelElements = document.querySelectorAll('.snipcart-base-button__label');
    labelElements.forEach((label) => {
      if (label.textContent.trim() === 'Place Order') {
        console.log("Found the Place Order label:", label);
        const placeOrderButton = label.closest('button');
        if (placeOrderButton) {
          // Remove previous click handlers if any (if using some frameworks you can do a clone)
          placeOrderButton.onclick = null;
          // Attach our custom override click handler
          placeOrderButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Override in effect, redirecting to home page.");
            window.location.href = '/';
          });
          // Optionally add a custom class to mark the overridden button (for debugging)
          placeOrderButton.classList.add('custom-overridden-button');
          clearInterval(intervalId); // Stop polling after successfully attaching
          console.log("Polling stopped after attaching the custom handler.");
        }
      }
    });
  }, 500);
});