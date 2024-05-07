// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";


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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

auth.onAuthStateChanged(function(user){
if (user){
    var pts = 0
    const userRef = ref(db, `users/${user.uid}`); 
    // Retrieve user data from Realtime Database
    onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
            // Update input fields with user data
            const username = userData.username || '';
            document.getElementById("accname").textContent = username
            console.log(username)
            const gameRef = ref(db, `users/${user.uid}/gameData`); 
            onValue(gameRef, (snapshot)=>{
                const gameData = snapshot.val();
                if (gameData.score>0) {
                    pts = gameData.score
                    document.getElementById("accpts").textContent = pts+" pts"
                } else {
                    document.getElementById("accpts").textContent = "0 pts"
                }
            })

        }
    })}else {
        document.getElementById("accname").textContent = "Login first to get rewards!"
        const ptstxt = document.getElementById("accpts")
        ptstxt.style.color = "#2E77E5"
        ptstxt.style.fontWeight = "normal";
        ptstxt.style.cursor = "pointer";
        ptstxt.textContent = "Login now!"
        ptstxt.addEventListener('click', function() {
            window.location.href="login.html"
        })

    }})
    
    const menuRef = ref(db, 'rewards');

    // Function to render menu items
    onValue(menuRef, (snapshot) => {
        const menuItems = snapshot.val();
    
        const menuContainer = document.querySelector('.menu');
        const menuContainer1 = document.querySelector('.menu1');
        menuContainer.innerHTML = ''; // Clear previous content
        menuContainer1.innerHTML = ''; // Clear previous content
    
        for (let key in menuItems) {
            const menuItem = menuItems[key];
        
            // Extract item details (Name, Price, Image, Description) from the menuItem object
            const { name, price, image, des } = menuItem;
        
            // Create menu item element
            const menuItemElement = document.createElement('div');
            const menuItemElement1 = document.createElement('div');
            menuItemElement.classList.add('menuframe');
            menuItemElement1.classList.add('menuframe');
        
            if (key > 200) {
                // Set content for the menu item if key > 200
                menuItemElement.innerHTML = `
                    <img src="${image}" class="menuimage">
                    <a class="menuname">${name}</a>
                    <a class="menuprice">${price}pts</a>
                    <div style="display:none" id="menu">${key}</div>
                    </div>
                `;
                // Append menu item to menuContainer (for key > 200)
                menuContainer.appendChild(menuItemElement);
            } else {
                // Set content for the menu item if key <= 200
                const menuItemElement1 = document.createElement('div');
                menuItemElement.classList.add('menuframe');
                menuItemElement.innerHTML = `
                    <img src="${image}" class="menuimage">
                    <a class="menuname">${name}</a>
                    <a class="menuprice">${price}pts</a>
                    <a class="des">${des}</a>
                    <div style="display:none" id="menu">${key}</div>
                    </div>
                `;
                menuContainer1.appendChild(menuItemElement);
            }
        
            // Attach click event listener to handle item selection
            menuItemElement.addEventListener('click', () => {
                handleMenuItemClick(name, price, image, key);
            });
            
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
selectedprice.textContent = price+"pts";
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

