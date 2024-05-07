    // Import the necessary Firebase SDK modules
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
    import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";


    // Your web app's Firebase configuration
    const firebaseConfig = {
    apiKey: "AIzaSyACZZIyq7T1sU3TtvFJI5FKkAXPYZ4yf8I",
    authDomain: "finalproject-8f27c.firebaseapp.com",
    databaseURL: "https://finalproject-8f27c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "finalproject-8f27c",
    storageBucket: "finalproject-8f27c.appspot.com",
    messagingSenderId: "644459011945",
    appId: "1:644459011945:web:6d4a2d7d2fe00c53a027f8",
    measurementId: "G-HY8X68GH3R"
    };

    const app = initializeApp(firebaseConfig);

    // Get a reference to the Firebase Realtime Database
    const db = getDatabase(app);
    
    // Reference to the 'Menu' node in Firebase
    const menuRef = ref(db, 'Menu');
    
    // Function to render menu items
    onValue(menuRef, (snapshot) => {
        const menuItems = snapshot.val();
    
        // Clear existing menu items
        const menuContainer = document.querySelector('.menu');
        menuContainer.innerHTML = ''; // Clear previous content
    
        for (let key in menuItems) {
            const menuItem = menuItems[key];
        
            // Extract item details (Name, Price, Image) from the menuItem object
            const { Name, Price, Image } = menuItem;
        
            // Create menu item element
            const menuItemElement = document.createElement('div');
            menuItemElement.classList.add('menuframe');
        
            // Set content for the menu item
            menuItemElement.innerHTML = `
            <img src="${Image}" class="menuimage">
            <a class="menuprice">RM ${Price}</a>
            <a class="menuname">${Name}</a>
            <div style="display:none" id="menu">${key}</div>
            </div>
            `;
        
            // Attach click event listener to handle item selection
            menuItemElement.addEventListener('click', () => {
                handleMenuItemClick(Name, Price, Image, key);
            });
        
            // Append menu item to menu container
            const menuContainer = document.querySelector('.menu');
            menuContainer.appendChild(menuItemElement);
        }
    });
    
    const dessertRef = ref(db, 'dessert');
    
    // Function to render menu items
    onValue(dessertRef, (snapshot) => {
        const menuItems = snapshot.val();
    
        // Clear existing menu items
        const menuContainer = document.querySelector('.menu1');
        menuContainer.innerHTML = ''; // Clear previous content
    
        for (let key in menuItems) {
            const menuItem = menuItems[key];
        
            // Extract item details (Name, Price, Image) from the menuItem object
            const { Name, Price, Image } = menuItem;
        
            // Create menu item element
            const menuItemElement = document.createElement('div');
            menuItemElement.classList.add('menuframe');
        
            // Set content for the menu item
            menuItemElement.innerHTML = `
            <img src="${Image}" class="menuimage">
            <a class="menuprice">RM ${Price}</a>
            <a class="menuname">${Name}</a>
            </div>
            `;
        
            // Attach click event listener to handle item selection
            menuItemElement.addEventListener('click', () => {
                handleMenuItemClick(Name, Price, Image, key);
            });
        
            // Append menu item to menu container
            const menuContainer = document.querySelector('.menu1');
            menuContainer.appendChild(menuItemElement);
        }
    });

// Function to handle menu item click
function handleMenuItemClick(name, price, image, key) {
    var x = document.getElementsByClassName("orderinterface")[0]; 
    x.style.display = "flex";
    var selectedname = document.getElementById("name");
    var selectedprice = document.getElementById("price");
    var selectedimage = document.getElementById("image");
    var selectedkey = document.getElementById("menu");
    selectedimage.src = image;
    selectedname.textContent = name;
    selectedprice.textContent = "RM " + price;
    selectedkey.textContent = key;
}

// Function to add item to cart
document.getElementById("addtocart").addEventListener("click", () => {
    var countElement = document.getElementById("count");
    var count = parseInt(countElement.textContent);

    var key = document.getElementById("menu").textContent;
    var name = document.getElementById("name").textContent;
    var priceText = document.getElementById("price").textContent;
    var price = parseFloat(priceText.replace(/[^\d.]/g, '')); // Extract numerical value from price text
    var imgSrc = document.getElementById("image").src;

    // Calculate the total price based on the count and item price
    var totalPrice = price * count;

    // Create a new cart item element
    var newCart = document.createElement("div");
    newCart.className = 'cart';
    newCart.innerHTML = `
        <div style="display:none" id="menuid">${key}</div>
        <img src="${imgSrc}" class="ordermenuimage" id="cartimage">
        <div style="display:flex;flex-direction:column;flex:1;margin-left:20px;">
            <a style="font-weight:bold;" id="cartname">${name}</a>
            <div>
                <span>x</span><span id="cartcount">${count}</span>
            </div>
            <a style="color:#e03e49;font-size:10px;margin-top:5px;cursor:pointer" id="remove">remove</a>
        </div>
        <a id="cartprice">${totalPrice.toFixed(2)}</a>
    `;

    // Append the new cart item to the cart container
    var cartContainer = document.getElementById('cartContainer');
    cartContainer.appendChild(newCart);

    // Close the interface after adding the item to the cart
    closeinterface();

    // Calculate subtotal after adding item to cart
    calcSubtotal();
});

// Function to calculate subtotal and total
export function calcSubtotal() {
    var cartItems = document.getElementsByClassName('cart');
    var subtotal = 0;
    var discount = 0;
    var total = 0;
    const menuInCart = [];

    if (cartItems.length===0){
        total = 0;
        discount = 0;
        subtotal = 0;
        updateSubtotalAndTotal(subtotal, total);
        menuInCart.length = 0;
    }
    // Loop through each cart item and calculate subtotal
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var selectedmenuid = parseFloat(cartItem.querySelector('#menuid').textContent);
        menuInCart.push(selectedmenuid);
        // Fetch price from Firebase based on selectedmenuid
        if (selectedmenuid > 10) {
            const dessertRef = ref(db, 'dessert/' + selectedmenuid);
            onValue(dessertRef, (snapshot) => {
                const menuItem = snapshot.val();
                if (menuItem) {
                    const { Price } = menuItem;
                    subtotal += Price;
                    total = subtotal - discount;
                    updateSubtotalAndTotal(subtotal, total);
                }
            });
        } else {
            const dessertRef = ref(db, 'Menu/0' + selectedmenuid);
            onValue(dessertRef, (snapshot) => {
                const menuItem = snapshot.val();
                if (menuItem) {
                    const { Price } = menuItem;
                    subtotal += Price;
                    total = subtotal - discount;
                    updateSubtotalAndTotal(subtotal, total);
                }
            });
        }
    } return {total: total, subtotal: subtotal, menuInCart, discount:discount}
}

function updateSubtotalAndTotal(subtotal, total) {
    var subtotalElement = document.querySelector('.subtotal a:last-child');
    subtotalElement.textContent = 'RM ' + subtotal.toFixed(2);
    var totalElement = document.querySelector('.subtotal1 a:last-child');
    totalElement.textContent = 'RM ' + total.toFixed(2);
}

// Delegate event to handle remove button clicks
document.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'remove') {
        var cartItem = event.target.closest('.cart');
        if (cartItem) {
            cartItem.parentNode.removeChild(cartItem);
            calcSubtotal(); 
        }
    }
});
