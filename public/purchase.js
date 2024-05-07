// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, onValue, orderByValue, query } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
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

auth.onAuthStateChanged(function(user) {
    if (user) {
        const userOrdersRef = ref(db, `users/${user.uid}/orders`);
        const orderedByDateQuery = query(userOrdersRef, orderByValue("date"));

        onValue(orderedByDateQuery, (snapshot) => {
            const orders = snapshot.val();
            const cardContainer = document.getElementById("card");

            for (let orderId in orders) {
                const order = orders[orderId];
                const { date, subtotal, discount, total } = order;
                const orderDate = new Date(date);
                const dayOfWeek = orderDate.toLocaleString('en-AU', { year: "numeric", month: "short", day: "numeric" });
                const timeOfDay = orderDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

                const newCard = document.createElement("div");
                newCard.className = "card";
                newCard.innerHTML = `
                    <div style="padding: 20px 30px;">
                        <a style="font-weight:bold;">${dayOfWeek}</a>
                        <div style="display:flex;justify-content:space-between;margin:10px 0px 20px;" class="txtfont">
                            <a>${timeOfDay}</a>
                            <div class="ref-container">
                                <a>ref:</a>
                                <a>${orderId}</a>
                            </div>
                        </div>`;

                const userMenusRef = ref(db, `users/${user.uid}/orders/${orderId}/menu`);
                const promises = [];

                onValue(userMenusRef, (snapshot) => {
                    const menuIds = snapshot.val();
                    if (menuIds) {
                        for (let id in menuIds) {
                            const menuId = menuIds[id];
                            const menuRef = ref(db, menuId > 10 ? `dessert/${menuId}` : `Menu/0${menuId}`);
                            const promise = new Promise((resolve, reject) => {
                                onValue(menuRef, (menuSnapshot) => {
                                    const menuData = menuSnapshot.val();
                                    if (menuData) {
                                        const { Image, Name, Price } = menuData;

                                        const userCountsRef = ref(db, `users/${user.uid}/orders/${orderId}/count`);
                                        onValue(userCountsRef, (userCountsSnapshot) => {
                                            const userCounts = userCountsSnapshot.val();
                                            const count = userCounts ? userCounts[id] : 0;
                                            const newprice = Price * count
                                            const menuItem = `
                                                <div style="display:flex;justify-content:space-between;margin: 0px 30px 10px">
                                                    <img src="${Image}" class="menuimage">
                                                    <div style="display: flex;flex-direction:column;flex:1;margin-left:20px">
                                                        <a class="txtfont">${Name}</a>
                                                        <div class="txtfont">
                                                            <a>x</a>
                                                            <a>${count}</a>
                                                        </div>
                                                    </div>
                                                    <div class="txtfont">
                                                        <a style="font-weight:bold">RM</a>
                                                        <a style="font-weight:bold">${newprice}</a>
                                                    </div>
                                                </div>`;
                                            resolve(menuItem);
                                        });
                                    } else {
                                        reject(new Error(`Menu with ID ${menuId} not found`));
                                    }
                                });
                            });

                            promises.push(promise);
                        }

                        Promise.all(promises)
                            .then((menuItems) => {
                                menuItems.forEach((menuItem) => {
                                    newCard.innerHTML += menuItem;
                                });

                                // Append the completed card to the container
                                const newCardFooter = `
                                    <div class="calculate">
                                        <div style="flex-direction:column;" class="txtfont">
                                            <div class="line"></div>
                                            <div style="display: flex; justify-content: space-between;margin-bottom:20px">
                                                <a style="margin-right:40px">Subtotal</a>
                                                <a>${subtotal}</a>
                                            </div>
                                            <div style="display: flex; justify-content: space-between;margin-bottom:20px">
                                                <a style="margin-right:40px">Discount</a>
                                                <a>${discount}</a>
                                            </div>
                                            <div class="line"></div>
                                            <div style="display: flex; justify-content: space-between;margin-bottom:20px">
                                                <a style="margin-right:40px">Total</a>
                                                <a>${total}</a>
                                            </div>
                                        </div>
                                    </div>`;

                                newCard.innerHTML += newCardFooter;
                                cardContainer.appendChild(newCard);
                            })
                            .catch((error) => {
                                console.error("Error fetching menu items:", error);
                            });
                    }
                });
            }
        }, (error) => {
            console.error("Error fetching user orders:", error);
        });
    }
});
