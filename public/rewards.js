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
            