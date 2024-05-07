// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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
    const auth = getAuth(app);

auth.onAuthStateChanged(function(user){
    if (user){
        document.getElementById("man").addEventListener('click',function(){
            window.location.href="game.html"
        })
    } else {
        document.getElementById("man").addEventListener('click',function(){
            window.location.href="login.html"
        })
}})
