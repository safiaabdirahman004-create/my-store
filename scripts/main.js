import { products } from "./product-data.js";

const homeProducts = products.slice(0, 4);
console.log(homeProducts)

homeProducts.forEach((product) => {

    const emptyDiv = document.createElement('div')
    emptyDiv.classList.add("product-card")

    const featuredProducts = document.querySelector("#featuredProducts");
    featuredProducts.append(emptyDiv);

    const image = document.createElement('img');
    image.src = product.image ;
    emptyDiv.append(image);

    const productName = document.createElement('h3')
    productName.textContent = product.name ;
    emptyDiv.append(productName);

    const productPrice = document.createElement('p')
    productPrice.textContent = product.price
    emptyDiv.append(productPrice)

    const productCatagery = document.createElement('h3')
    productCatagery.textContent = product.catagery
    emptyDiv.append(productCatagery)

    const cartButton = document.createElement('button')
    cartButton.innerHTML = 'cart';
    emptyDiv.append(cartButton)

  const cart = [];

   
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

})