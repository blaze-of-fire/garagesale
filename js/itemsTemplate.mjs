import { GetItems, getPixabayImage } from "./utils.mjs";

export async function renderGarageSaleItems() {
  try {
    const items = await GetItems("json/items.json");
    const container = document.querySelector("#items");

    if (!items || items.length === 0) {
      container.innerHTML = "<p>No items found.</p>";
      return;
    }

    // Map each item into our template asynchronously
    const htmlItemsArr = await Promise.all(
      items.map(async (item) => await garageSaleItemsTemplate(item))
    );
    const htmlItems = htmlItemsArr.join("");

    container.innerHTML = htmlItems;
  } catch (err) {
    console.error("Failed to load items.json:", err);
    document.querySelector("#items").innerHTML =
      "<p>Error loading items.</p>";
  }
}

// Our card + Snipcart button template
async function garageSaleItemsTemplate(item) {
  const imageUrl = await getPixabayImage(item.Pixabay || item.Name);
  return `
    <div class="product-card" id="${item.Id}">
      <p class="name">${item.Name}</p>
      <div class="image-container">
        <img
          src="${imageUrl}"
          alt="${item.Name}"
          loading="lazy"
          class="image"
        />
      </div>
      <p class="price"><span class="listings">Price</span>: $${parseFloat(item.Price).toFixed(2)}</p>
      <p class="quantity"><span class="listings">Available</span>: ${item.Available}</p>
      <button
        class="snipcart-add-item"
        data-item-id="${item.Id}"
        data-item-name="${item.Name}"
        data-item-price="${item.Price}"
        data-item-description="${item.Description}"
        data-item-image="${imageUrl}"
        data-item-max-quantity="${item.Available}"
        data-item-url="${window.location.origin + window.location.pathname}"
      >
        Add to cart
      </button>
      <p class="description">${item.Description}</p>
      <div class="decoration-line"></div>
      <div class="separation-line"></div>
    </div>
  `;
}