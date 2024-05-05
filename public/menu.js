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
            </div>
            `;
        
            // Attach click event listener to handle item selection
            menuItemElement.addEventListener('click', () => {
                handleMenuItemClick(Name, Price, Image);
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
                handleMenuItemClick(Name, Price, Image);
            });
        
            // Append menu item to menu container
            const menuContainer = document.querySelector('.menu1');
            menuContainer.appendChild(menuItemElement);
        }
    });

// Function to handle menu item click
function handleMenuItemClick(name, price, image) {
        var x = document.getElementsByClassName("orderinterface")[0]; 
        x.style.display = "flex";
        var selectedname = document.getElementById("name");
        var selectedprice =document.getElementById("price");
        var selectedimage =document.getElementById("image");
        selectedimage.src =image;
        selectedname.textContent =name;
        selectedprice.textContent="RM " + price;
    }

