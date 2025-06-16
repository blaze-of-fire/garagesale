import { GetItems } from "./utils.mjs";

function returnGarageSaleItems() {
const filepath = "../json/items.json";


const htmlItems = cartItems.map((item, index) => garageSaleItemsTemplate(item, index));
document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function garageSaleItemsTemplate(item, index) {
    `<h3 class="name">${itemName}</h3>
    // img src="${image}" alt="${itemName}" class="image">
    // <p class="price">Price: $${price}</p>
    // <p class="quantity">Quantity: ${quantity}</p>
    // <button></button>
    // <p class="description">${description}</p>
    // <div class="decoration-line"></div>
    // <div class="seperation-line"></div>`
}