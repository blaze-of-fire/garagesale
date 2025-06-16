const cart = document.querySelector('#cart-items');

function CreateTemplate() {
    // `<h3 class="name">${name}</h3>
    // img src="${image}" alt="${name}" class="image">
    // <p class="price">Price: $${price}</p>
    // <p class="quantity">Quantity: ${quantity}</p>
    // <button></button>
    // <p class="description">${description}</p>
    // <div class="decoration-line"></div>
    // <div class="seperation-line"></div>`

    return `
        <div class="cart-item">
            <h3 class="name">Japanese Folding Fan</h3>
            <img src="https://img.freepik.com/free-vector/japanese-folding-fan_1284-13334.jpg?ga=GA1.1.1424288835.1739828773&semt=ais_hybrid&w=250" alt="Japanese Folding Fan" class="image">
            <p class="price">Price: $20</p>
            <p class="quantity">Quantity: 1</p>
            <button></button>
            <p class="description">A Japanese Folding Fan with amazing artwork that will allow you to feel the wonderful feelings and power of japanese cherry tree</p>
            <div class="decoration-line"></div>
            <div class="seperation-line"></div>
        </div>
        <div class="cart-item">
            <h3 class="name">Japanese Folding Fan</h3>
            <img src="https://img.freepik.com/free-vector/japanese-folding-fan_1284-13334.jpg?ga=GA1.1.1424288835.1739828773&semt=ais_hybrid&w=250" alt="Japanese Folding Fan" class="image">
            <p class="price">Price: $20</p>
            <p class="quantity">Quantity: 1</p>
            <button></button>
            <p class="description">A Japanese Folding Fan with amazing artwork that will allow you to feel the wonderful feelings and power of japanese cherry tree</p>
            <div class="decoration-line"></div>
            <div class="seperation-line"></div>
        </div>
        <div class="cart-item">
            <h3 class="name">Japanese Folding Fan</h3>
            <img src="https://img.freepik.com/free-vector/japanese-folding-fan_1284-13334.jpg?ga=GA1.1.1424288835.1739828773&semt=ais_hybrid&w=250" alt="Japanese Folding Fan" class="image">
            <p class="price">Price: $20</p>
            <p class="quantity">Quantity: 1</p>
            <button></button>
            <p class="description">A Japanese Folding Fan with amazing artwork that will allow you to feel the wonderful feelings and power of japanese cherry tree</p>
            <div class="decoration-line"></div>
            <div class="seperation-line"></div>
        </div>`
}

cart.innerHTML = CreateTemplate();
cart.querySelectorAll('button').forEach(button => {
    button.textContent = 'Remove';
    button.setAttribute('class', 'remove-item');
});