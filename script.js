function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
    const cart = getCart();
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    saveCart(cart);
    displayCart();
}
function displayCart() {
    var cartItems = document.getElementById("cart-items") || document.getElementById("cartItems");
    var cart = getCart(); 

    if (!cartItems) return;

    if (!cart || cart.length === 0) {
        cartItems.innerHTML = "Le panier est vide.";
        return;
    }

    cartItems.innerHTML = "";

    cart.forEach(function(item, index) {
        var div = document.createElement("div");
        div.className = "cart-item";

        // Nom du produit
        var pName = document.createElement("p");
        var strong = document.createElement("strong");
        strong.textContent = item.name;
        pName.appendChild(strong);
        div.appendChild(pName);

        // Prix du produit
        var pPrice = document.createElement("p");
        pPrice.textContent = "Prix: " + item.price + " DA";
        div.appendChild(pPrice);

        // Quantité du produit
        var pQty = document.createElement("p");
        pQty.textContent = "Quantité: " + item.quantity;
        div.appendChild(pQty);

        // Bouton supprimer
        var button = document.createElement("button");
        button.type = "button";
        button.textContent = "Supprimer";
        button.addEventListener("click", function() {
            removeFromCart(index);
        });
        div.appendChild(button);

        cartItems.appendChild(div);
    });
}
function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    displayCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
}

document.addEventListener("DOMContentLoaded", displayCart);