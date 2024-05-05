    // Import the necessary Firebase SDK modules
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
    import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
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


    // Generates a random string
    function generateOrderId() {
        return Math.random().toString(36).substr(2, 9); 
    }
    
    document.getElementById("checkout").addEventListener('click', function(e) {
        e.preventDefault();

        const user = auth.currentUser;
        if (!user){
            alert("Please Login First");
            window.location.href="login.html";
            return;
        }
        const userId = user.uid;


        // Generate a unique order ID
        const orderId = generateOrderId();
    
        // Get order details from input fields
        const subtotalValueElement = document.getElementById("subtotalvalue");
        const discountValueElement = document.getElementById("discountvalue");
        const totalValueElement = document.getElementById("totalvalue");
    
        // Validate and parse subtotal value
        const subtotalValue = parseFloat(subtotalValueElement.textContent.trim().replace('RM ', ''));
        if (isNaN(subtotalValue)) {
            console.error("Invalid subtotal value:", subtotalValueElement.textContent);
            return; // Exit function if subtotal value is invalid
        }
    
        // Validate and parse discount value
        const discountValue = parseFloat(discountValueElement.textContent.trim().replace('RM ', ''));
        if (isNaN(discountValue)) {
            console.error("Invalid discount value:", discountValueElement.textContent);
            return; // Exit function if discount value is invalid
        }
    
        // Validate and parse total value
        const totalValue = parseFloat(totalValueElement.textContent.trim().replace('RM ', ''));
        if (isNaN(totalValue)) {
            console.error("Invalid total value:", totalValueElement.textContent);
            return; // Exit function if total value is invalid
        }
    
        // Format values with "RM" prefix before storing in the database
        const formattedSubtotal = `RM ${subtotalValue.toFixed(2)}`;
        const formattedDiscount = `RM ${discountValue.toFixed(2)}`;
        const formattedTotal = `RM ${totalValue.toFixed(2)}`;

    
        // Set order details in the 'orders' collection using the generated order ID
        set(ref(db, `users/${userId}/orders/${orderId}`), {
            subtotal: formattedSubtotal,
            discount: formattedDiscount,
            total: formattedTotal
        })
        .then(() => {
            alert("Checkout Successful!");
        })
        .catch((error) => {
            console.error("Error writing order details: ", error);
            alert("Failed to Check Out");
        });
    });
    
    