import { renderGarageSaleItems } from './itemsTemplate.mjs';
import { LoadTheSnipcart } from './snipcart.js';
import { wiggleAnimation } from './animation.js';

const wiggleLink = document.querySelector(".homePageLink");

// 1) Load & render on page load
document.addEventListener("DOMContentLoaded", () => {
  renderGarageSaleItems();
  LoadTheSnipcart();
  wiggleAnimation(wiggleLink);
});