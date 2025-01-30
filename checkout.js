document.addEventListener("DOMContentLoaded", () => {
    loadCheckout();
});

function loadCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const subtotalElement = document.getElementById("subtotal");
    const taxElement = document.getElementById("tax");
    const shippingElement = document.getElementById("shipping");
    const totalElement = document.getElementById("total");

    // Calculate the total price
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    // Calculate tax (6.25%)
    const tax = subtotal * 0.0625;

    // Calculate shipping (for simplicity, we can set a fixed value or calculate based on subtotal)
    let shipping = subtotal * .03; // For example, flat rate shipping

    // Calculate total
    const total = subtotal + tax + shipping;

    // Update the cart summary
    subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    taxElement.textContent = `Tax: $${tax.toFixed(2)}`;
    shippingElement.textContent = `Shipping: $${shipping.toFixed(2)}`;
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

document.getElementById("checkout-form")?.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from actually submitting

    // Get form data
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;
    const payment = document.getElementById("payment").value;

    // Check if all fields are filled out
    if (!name || !address || !email || !payment) {
        alert("Please fill in all fields.");
        return;
    }

    // Process the order (for now, just log the order)
    console.log("Order Submitted!");
    console.log("Name:", name);
    console.log("Address:", address);
    console.log("Email:", email);
    console.log("Payment Info:", payment);

    // Clear cart after order (optional)
    localStorage.removeItem("cart");

    // Redirect to a confirmation page or display a success message
    alert("Your order has been placed successfully!");
    window.location.href = "index.html"; // Redirect to the homepage
});
