
import { products } from "./product-data.js";

const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

const product = products.find((item) => item.id === productId);

const productDetail = document.querySelector("#productDetails");

if (product) {
    productDetail.innerHTML = `
        <img
            src="${product.image}"
            alt="${product.name}"
            width="250"
        >

        <h1>${product.name}</h1>

        <p>Category: ${product.catagery}</p>

        <p>Price: $${product.price}</p>

        <button id="addToCart" type="button">
            Add to Cart
        </button>
    `;
} else {
    productDetail.innerHTML = "<p>Product not found.</p>";
}

if (product) {
    const addToCartButton = document.querySelector("#addToCart");

    addToCartButton.addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProduct = cart.find(
            (item) => item.id === product.id
        );

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Product added to cart!");
    });
}