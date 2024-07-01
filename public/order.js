    // Import the necessary Firebase SDK modules
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
    import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
    import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
    import { calcSubtotal } from "./menu.js";


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
    var rewardselected;


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

        const { total, subtotal, menuInCart, countInCart, discountsum } = calcSubtotal();
        const formattedSubtotal = `RM ${subtotal.toFixed(2)}`;
        const formattedDiscount = `RM ${discountsum.toFixed(2)}`;
        const formattedTotal = `RM ${total.toFixed(2)}`;
        const currentDate = new Date();

        if (menuInCart == 0) {
            alert("Please add item to cart");
            return;
        }

        window.location.href = "pay.html";
        document.getElementById("pricetxt").textContent = formattedTotal;

    });
    
    
    document.getElementById("pay").addEventListener('click', function(e) {
        e.preventDefault();

        const userId = user.uid;


        // Generate a unique order ID
        const orderId = generateOrderId();
    

        const selectedref = ref(db, `users/${userId}/selectedReward`)
        onValue(selectedref,(snapshot)=>{
            rewardselected = snapshot.val();
        })
    
        // Set order details in the 'orders' collection using the generated order ID
        set(ref(db, `users/${userId}/orders/${orderId}`), {
            date: currentDate.valueOf(),
            menu: menuInCart,
            subtotal: formattedSubtotal,
            discount: formattedDiscount,
            total: formattedTotal,
            count: countInCart,
            rewardselected: rewardselected
        }).then(()=> {
            set(ref(db, `users/${userId}/selectedReward`), {
        })})
        .then(() => {
            alert("Checkout Successful!");
            window.location.href="purchase.html";
        })
        .catch((error) => {
            console.error("Error writing order details: ", error);
            alert("Failed to Check Out");
        });
    });
    
    