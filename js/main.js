import { renderGarageSaleItems } from './itemsTemplate.mjs';
import { LoadTheSnipcart } from './snipcart.js';

// 1) Load & render on page load
document.addEventListener("DOMContentLoaded", () => {
  renderGarageSaleItems();
  LoadTheSnipcart();
});

document.addEventListener('snipcart.ready', function () {
  Snipcart.subscribe('checkout.error', function (errors) {
    // Check if one of the errors contains the price mismatch message
    if (errors && errors.some(error => error.message.includes('Price of products in the cart may have changed'))) {
      // Instead of displaying the error, redirect to home page
      window.location.href = '/';
    }
  });
});
