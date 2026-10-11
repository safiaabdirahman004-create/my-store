import { products } from "./product-data.js";

const productsContainer = document.querySelector("#productsContainer");
const searchInput = document.querySelector("#searchInput");
const categorySelect = document.querySelector("#categoryFilter");

const cart = [];


function displayProducts(products) {

    console.log("DISPLAY:", products);

    productsContainer.innerHTML = "";

    products.forEach((product) => {

        const div = document.createElement("div");
        div.classList.add("product-card");

        const image = document.createElement("img");
        image.src = product.image;
        div.append(image);

        const productName = document.createElement("h3");
        productName.textContent = product.name;
        div.append(productName);

        const productPrice = document.createElement("p");
        productPrice.textContent = product.price;
        div.append(productPrice);

        const productCatagery = document.createElement("h3");
        productCatagery.textContent = product.catagery;
        div.append(productCatagery);
                
        const detailsLink = document.createElement("a");

        detailsLink.href = `product-detail.html?id=${product.id}`;

        detailsLink.textContent = "View Details";

        div.append(detailsLink);


        const cartButton = document.createElement("button");
        cartButton.innerHTML = "cart";
        div.append(cartButton);

    
cartButton.addEventListener("click", () => {

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

    console.log("Cart saved:", cart);

    alert("Product added to cart!");

});

        productsContainer.append(div);
    });
   
}



displayProducts(products);



searchInput.addEventListener("input", () => {

    const search = searchInput.value.toLowerCase();

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search)
    );

    displayProducts(filteredProducts);

});



categorySelect.addEventListener("change", () => {

    const catagery = categorySelect.value.toLowerCase();

    console.log("selected:", catagery);

    const filteredProducts = catagery === "all"
        ? products
        : products.filter((product) =>
            product.catagery.toLowerCase() === catagery
        );

    console.log("filtered:", filteredProducts);

    displayProducts(filteredProducts);

});

