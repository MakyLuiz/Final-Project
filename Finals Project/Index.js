// --------------------------- LOGIN ---------------------------
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginButton').addEventListener('click', function () {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        
        // Check if username and password match the criteria
        if (username === 'sample' && password === '123456') {
            window.location.href = 'Index.html'; // Redirect to Index.html
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });
});


// --------------------------- CART FUNCTIONALITY ---------------------------
function toggleDropdown() {
    var dropdown = document.getElementById("cart");
    if (dropdown.style.display === "none") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
}

var totalPrice = 0;

function addToCart(item, price) {
    var checkout = document.getElementById("checkout");
    var cartContent = document.getElementById('cart-content');
    var totalPriceElement = document.getElementById('total-price');

    checkout.style.display = "flex";
    totalPriceElement.style.display = "flex";

    var cartContent = document.getElementById('cart-content');
    if (cartContent.textContent.trim() === 'Cart is Empty') {
        cartContent.textContent = ''; // Clear the cart prompt
    }
    // Add the item to the cart
    cartContent.innerHTML += `<div>${item} - ₱${price.toFixed(2)} <button class="remove-button" onclick="removeFromCart(this, ${price})">Remove</button></div>`;
  
    // Accumulate the prices
    totalPrice += price;
  
    // Update total price display
    var totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = 'Total Price: ₱' + totalPrice.toFixed(2);

    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({ item: item, price: price });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function removeFromCart(button, price) {
    button.parentElement.remove(); // Remove the item
    totalPrice -= price; // Subtract the price of the removed item from the total price
  
    // Update total price display
    var totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = 'Total Price: ₱' + totalPrice.toFixed(2);
}


//--------------------------- CHECKOUT ---------------------------
function checkout() {
    // Redirect to the checkout page
    window.location.href = 'checkout.html';
}

document.addEventListener('DOMContentLoaded', function() {
    var checkoutCart = document.getElementById('checkout-cart');
    var totalPriceElement = document.getElementById('total-price');
    var visaMasterCardTotalPrice = document.getElementById('visaMasterCardTotalPrice');

    // Retrieve cart items from localStorage
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log(cartItems); // Log the cart items to console

    // Display cart items in the checkout page
    cartItems.forEach(function(item) {
        checkoutCart.innerHTML += `<div>${item.item} - ₱${item.price.toFixed(2)}</div>`;
    });

    // Display total price
    var totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    totalPriceElement.textContent = 'Total Price: ₱' + totalPrice.toFixed(2);

    // Display total price
    visaMasterCardTotalPrice.textContent = 'Total Price: ₱' + totalPrice.toFixed(2);

    // Function to clear cart items from localStorage
    function clearCartItems() {
        localStorage.removeItem('cartItems');
    }

    // Clear cart items when leaving the checkout page
    window.addEventListener('beforeunload', function() {
        clearCartItems();
    });
});


function showPayment() {
    var payment = document.querySelector(".PlaceOrder");
    payment.style.display = (payment.style.display === "none") ? "block" : "none"; // Toggle ON display
}

function closePayment() {
    var payment = document.querySelector(".PlaceOrder");
    payment.style.display = (payment.style.display === "block") ? "none" : "block"; // Toggle OFF display
}

// --------------------------- PAYMENT METHOD FORMS ---------------------------

function showPaymentForm() {
    var method = document.getElementById("method").value;
    var visaMasterCardForm = document.getElementById("visaMasterCardForm");
    var gcashMayaForm = document.getElementById("gcashMayaForm");

    // Hide both forms initially
    visaMasterCardForm.style.display = "none";
    gcashMayaForm.style.display = "none";

    // Show the appropriate form based on the selected payment method
    if (method === "Visa" || method === "MasterCard") {
        visaMasterCardForm.style.display = "block";
    } else if (method === "GCash" || method === "Maya") {
        gcashMayaForm.style.display = "block";
    }
}


// --------------------------- REGISTER FORM ---------------------------

function register(event) {
    event.preventDefault(); // Prevent form submission

    // Get form inputs
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var IGN = generatePlayerID(); // Generate random player ID

    // Display hidden message
    var hiddenMessage = document.getElementById('hiddenMessage');
    hiddenMessage.classList.remove('hidden');

    // Display player ID
    var playerID = document.getElementById('playerID');
    playerID.textContent = formatPlayerID(IGN);
}

function generatePlayerID() {
    var playerID = '';
    for (var i = 0; i < 12; i++) {
        playerID += Math.floor(Math.random() * 10); // Generate random digit (0-9)
        if (i % 4 === 3 && i !== 11) playerID += ' '; // Add space after every 4 digits except the last one
    }
    return playerID;
}

function formatPlayerID(playerID) {
    return playerID.replace(/(\d{4})/g, '$1 '); // Add space after every 4 digits
}
