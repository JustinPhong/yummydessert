// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, onValue, get, set } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
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
        document.getElementById("accname").textContent = "Login first to get your rewards!"
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
        const { name, price, image, des } = menuItem;

        if (key > 200) {
            // Create menu item element for key > 200
            const menuItemElement = document.createElement('div');
            menuItemElement.classList.add('menuframe');
            menuItemElement.innerHTML = `
                <div style="display:none" id="menuid">${key}</div>
                <img src="${image}" class="menuimage">
                <a class="menuname">${name}</a>
                <a class="menuprice">${price}pts</a>
            `;
            // Check user's points and apply grayscale filter if insufficient
            auth.onAuthStateChanged(function(user) {
                if (user) {
                    const userRef = ref(db, `users/${user.uid}/gameData`);
                    onValue(userRef, (snapshot) => {
                        const userData = snapshot.val();
                        const pts = userData ? userData.score || 0 : 0;
                        if (pts < price) {
                            menuItemElement.style.filter = "grayscale(1)";
                            menuItemElement.addEventListener('click', () => {
                                window.alert("You have insufficient points to purchase this item.");
                            });
                        } else {
                            menuItemElement.addEventListener('click', () => {
                                handleMenuItemClick(name, price, image, key, pts);
                            });
                        }
                    });
                }
            });
            menuContainer.appendChild(menuItemElement);
        } else {
            // Create menu item element for key <= 200
            const menuItemElement1 = document.createElement('div');
            menuItemElement1.classList.add('menuframe');
            menuItemElement1.innerHTML = `
                <div style="display:none" id="menuid">${key}</div>
                <img src="${image}" class="menuimage">
                <a class="menuname">${name}</a>
                <a class="menuprice">${price}pts</a>
                <a class="des">${des}</a>
            `;
            auth.onAuthStateChanged(function(user) {
                if (user) {
                    const userRef = ref(db, `users/${user.uid}/gameData`);
                    onValue(userRef, (snapshot) => {
                        const userData = snapshot.val();
                        const pts = userData ? userData.score || 0 : 0;
                        if (pts < price) {
                            menuItemElement1.style.filter = "grayscale(1)";
                            menuItemElement1.addEventListener('click', () => {
                                window.alert("You have insufficient points to purchase this item.");
                            });
                        } else {
                            menuItemElement1.addEventListener('click', () => {
                                handleMenuItemClick(name, price, image, key, pts);
                            });
                        }
                    });
                }
            });
            menuContainer1.appendChild(menuItemElement1);
        }
    }
});

// Function to handle menu item click
function handleMenuItemClick(name, price, image, key, pts) {
    // Display the order interface with selected menu item details
    var orderInterface = document.querySelector('.orderinterface');
    orderInterface.style.display = "flex";

    var selectedName = document.getElementById("name");
    var selectedPrice = document.getElementById("price");
    var selectedImage = document.getElementById("image");
    var selectedKey = document.getElementById("menu");

    selectedName.textContent = name;
    selectedPrice.textContent = price + "pts";
    selectedImage.src = image;
    selectedKey.textContent = key;

    // Add event listener to "Add to Cart" button
    document.getElementById("addtocart").addEventListener("click", () => {
        const user = auth.currentUser
            if (user) {
                const selectedReward = ref(db, `users/${user.uid}/selectedReward`)
                onValue(selectedReward, (snapshot) =>{
                    const selectedReward1 = snapshot.val();
                    if (!selectedReward1) {
                        const newPts = pts - price;
                        const userRef = ref(db, `users/${user.uid}/gameData`);
                        get(userRef).then((snapshot) => {
                            const userData = snapshot.val();
                            const updatedGameData = { ...userData, score: newPts };
                            set(userRef, updatedGameData);
                            closeInterface();
                        }, {
                            onlyOnce: true
                          }).then(()=>{
                            set(ref(db, `users/${user.uid}/selectedReward`), {
                                id:key
                        })
                        }).then(()=>{
                            window.location.href="order.html"
                        })
                    } else {
                        window.alert("You only can redeem one reward per time")
                    }
                }, {
                    onlyOnce: true
                  })
                
            }
            })
    }

function closeInterface() {
    var orderInterface = document.querySelector('.orderinterface');
    orderInterface.style.display = "none";
}

    



