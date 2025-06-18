import { GetItems, getPixabayImage } from "./utils.mjs";

export async function renderGarageSaleItems() {
  try {
    const items = await GetItems("products.json");
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
  const imageUrl = await getPixabayImage(item.pixabay || item.name, item.id);
  console.log(`The image url for ${item.name}: ${imageUrl}`);
  return `
    <div class="product-card" id="${item.id}">
      <p class="name">${item.name}</p>
      <div class="image-container">
        <img
          src="${imageUrl}"
          alt="${item.name}"
          loading="lazy"
          class="image"
        />
      </div>
      <p class="price"><span class="listings">Price</span>: $${parseFloat(item.price).toFixed(2)}</p>
      <p class="quantity"><span class="listings">Available</span>: ${item.available}</p>
      <p class="condition"><span class="listings">Condition</span>: ${item.condition}</p>
      <button
        class="snipcart-add-item"
        data-item-id="${item.id}"
        data-item-name="${item.name}"
        data-item-price="${item.price}"
        data-item-description="${item.description}"
        data-item-image="${item.image}"
        data-item-max-quantity="${item.available}"
        data-item-url="https://garagesalefun.netlify.app/products.json"
      >
        Add to cart
      </button>
      <p class="description">${item.description}</p>
    </div>
  `;
}