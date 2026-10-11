const cartContainer = document.querySelector("#cartContainer");
const cartSummary = document.querySelector("#cartSummary");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
    cartContainer.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartSummary.textContent = "Total: $0";
        return;
    }

    cart.forEach((item) => {
        const subtotal = item.price * item.quantity;

        total += subtotal;

        cartContainer.innerHTML += `
            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    width="100"
                >

                <h3>${item.name}</h3>

                <p>Price: $${item.price}</p>

                <p>Quantity: ${item.quantity}</p>

                <p>Subtotal: $${subtotal}</p>

                <button
                    class="removeItem"
                    data-id="${item.id}"
                    type="button"
                >
                    Remove
                </button>

            </div>
        `;
    });

    cartSummary.textContent = `Total: $${total}`;
}

cartContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("removeItem")) {
        const productId = Number(event.target.dataset.id);

        cart = cart.filter((item) => item.id !== productId);

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();
    }
});

displayCart();
