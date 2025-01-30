document.addEventListener("DOMContentLoaded", () => {
    loadCart();
});

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price: parseFloat(price), quantity: 1 }); // Ensure price is stored as a number
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

function loadCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    if (!cartItemsContainer) return; // Prevent errors on index.html

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    cartItemsContainer.innerHTML = ""; // Clear previous items
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removeFromCart(index);

        li.appendChild(removeButton);
        cartItemsContainer.appendChild(li);
        total += item.price;
    });

    // Calculate tax (6.25%)
    const tax = total * 0.0625;
    const totalWithTax = total + tax;

    // Display total and tax
    totalPriceElement.innerHTML = `Subtotal: $${total.toFixed(2)}<br>Tax: $${tax.toFixed(2)}<br>Total: $${totalWithTax.toFixed(2)}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); // Reload cart display
}

document.getElementById("clear-cart")?.addEventListener("click", () => {
    localStorage.removeItem("cart");
    loadCart();
});

document.addEventListener("DOMContentLoaded", () => {
    // Add event listeners to each category link
    document.getElementById("all").addEventListener("click", () => filterProducts("all"));
    document.getElementById("skis").addEventListener("click", () => filterProducts("skis"));
    document.getElementById("ski-poles").addEventListener("click", () => filterProducts("ski-poles"));
    document.getElementById("snowboards").addEventListener("click", () => filterProducts("snowboards"));
    document.getElementById("goggles").addEventListener("click", () => filterProducts("goggles"));
    document.getElementById("ski-boots").addEventListener("click", () => filterProducts("ski-boots"));
    document.getElementById("helmets").addEventListener("click", () => filterProducts("helmets"));
});

// Function to filter products based on category
function filterProducts(category) {
    const allProducts = document.querySelectorAll(".product");
    
    if (category === "all") {
        allProducts.forEach(product => {
            product.style.display = "block"; // Show all products
        });
    } else {
        allProducts.forEach(product => {
            if (product.classList.contains(category)) {
                product.style.display = "block"; // Show only the matching category
            } else {
                product.style.display = "none"; // Hide the non-matching products
            }
        });
    }
}

function setActiveCategory(category) {
    const categoryLinks = document.querySelectorAll(".categories a");
    categoryLinks.forEach(link => {
        link.classList.remove("active");
    });
    document.getElementById(category).classList.add("active");
}



/*Checkout stuff*/

