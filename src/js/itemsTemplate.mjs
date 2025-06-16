import { GetItems, getPixabayImage } from "./utils.mjs";

export async function renderGarageSaleItems() {
  try {
    // adjust the path to your built JSON if needed
    const items = await GetItems("json/items.json");
    const container = document.querySelector("#items");

    if (!items || items.length === 0) {
      container.innerHTML = "<p>No items found.</p>";
      return;
    }

    // 2) Map each item into our template, join into one HTML blob
    const htmlItems = items
      .map((item) => garageSaleItemsTemplate(item))
      .join("");

    // 3) Inject into the DOM
    container.innerHTML = htmlItems;
  } catch (err) {
    console.error("Failed to load items.json:", err);
    document.querySelector("#items").innerHTML =
      "<p>Error loading items.</p>";
  }
}

// Our card + Snipcart button template
function garageSaleItemsTemplate(item) {
  return `
    <div class="product-card">
      <h3 class="name">${item.Name}</h3>
      <img
        src="https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg"
        alt="${item.Name}"
        class="image"
      />
      <p class="price">Price: $${parseFloat(item.Price).toFixed(2)}</p>
      <p class="quantity">Available: ${item.Available}</p>
      <button
        class="snipcart-add-item"
        data-item-id="${item.Id}"
        data-item-name="${item.Name}"
        data-item-price="${item.Price}"
        data-item-url="${location.origin + location.pathname}"
        data-item-description="${item.Description}"
        data-item-image="https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg"
      >
        Add to cart
      </button>
      <p class="description">${item.Description}</p>
      <div class="decoration-line"></div>
      <div class="separation-line"></div>
    </div>
  `;
}

// old template
/* <div class="cart-item">
    <h3 class="name">Japanese Folding Fan</h3>
    <img src="https://img.freepik.com/free-vector/japanese-folding-fan_1284-13334.jpg?ga=GA1.1.1424288835.1739828773&semt=ais_hybrid&w=250" alt="Japanese Folding Fan" class="image">
    <p class="price">Price: $20</p>
    <p class="quantity">Quantity: 1</p>
    <button></button>
    <p class="description">A Japanese Folding Fan with amazing artwork that will allow you to feel the wonderful feelings and power of japanese cherry tree</p>
    <div class="decoration-line"></div>
    <div class="seperation-line"></div>
</div> */