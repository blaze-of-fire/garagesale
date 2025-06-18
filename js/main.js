import { renderGarageSaleItems } from './itemsTemplate.mjs';
import { LoadTheSnipcart } from './snipcart.js';

// 1) Load & render on page load
document.addEventListener("DOMContentLoaded", () => {
  renderGarageSaleItems();
  LoadTheSnipcart();
});

document.addEventListener('snipcart.ready', function () {
  // Use a small delay to ensure the checkout modal is visible
  setTimeout(function () {
    const placeOrderButton = document.querySelector('.snipcart-btn-place-order');
    if (placeOrderButton) {
      placeOrderButton.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the default validation/error handling
        // Redirect to your home page
        window.location.href = '/';
      });
    }
  }, 1000); // Adjust the delay as needed
});