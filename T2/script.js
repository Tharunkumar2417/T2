// Define an array to store cart items
let cart = [];

// Function to add item to cart
function addToCart(productId) {
    // Find the product in the list of products (assuming products are stored in an array named 'products')
    let product = products.find(item => item.id === productId);

    // Check if the product is already in the cart
    let cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        // If the product is already in the cart, increase its quantity
        cartItem.quantity++;
    } else {
        // If the product is not in the cart, add it with a quantity of 1
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    // Update the cart display
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    // Find the cart element in the DOM
    let cartElement = document.querySelector('.cart');

    // Clear the previous content of the cart
    cartElement.innerHTML = '';

    // Loop through the cart items and display them
    cart.forEach(item => {
        let itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <div>${item.name} - $${item.price} x ${item.quantity}</div>
        `;
        cartElement.appendChild(itemElement);
    });

    // Display total price
    let totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    let totalPriceElement = document.createElement('div');
    totalPriceElement.textContent = `Total: $${totalPrice}`;
    cartElement.appendChild(totalPriceElement);

    // Display checkout button
    let checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'Checkout';
    checkoutButton.addEventListener('click', checkout);
    cartElement.appendChild(checkoutButton);
}

// Function to handle checkout process
function checkout() {
    // Here you can implement the backend code to process the order, such as sending the cart data to the server for further processing
    console.log('Checkout:', cart);
}

// Assuming products are stored in an array named 'products', you need to fetch them from the backend
let products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
    // Add more products as needed
];

// Function to initialize the product listing
function initProductListing() {
    let productListElement = document.querySelector('.products');

    products.forEach(product => {
        let productElement = document.createElement('div');
        productElement.innerHTML = `
            <div>${product.name} - $${product.price}</div>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productListElement.appendChild(productElement);
    });
}

// Initialize the product listing when the page loads
window.addEventListener('load', initProductListing);
