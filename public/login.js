// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";


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

// Assuming you have initialized Firebase app and imported necessary Firebase modules (auth, firestore
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();

// Function to display user information based on userID
function displayUserInfo(userID) {
const userRef = ref(db, 'users/' + userID); // Construct reference to user data in Firestore

// Retrieve user data from Firestore
get(userRef).then((snapshot) => {
if (snapshot.exists()) {
const userData = snapshot.val();
// Update input fields with user data
document.getElementById("username").value = userData.username || '';
document.getElementById("name").value = userData.name || '';
document.getElementById("email").value = userData.email || '';
document.getElementById("phone").value = userData.contact || '';
document.getElementById("birthday").value = userData.birthday || '';
console.log("hi")
} else {
console.log("User data not found");
}
}).catch((error) => {
console.error("Error fetching user data:", error);
});
}

document.getElementById("login").addEventListener('click', function(e) {
    e.preventDefault(); 
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Authenticate user using Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        var user = auth.currentUser;
        displayUserInfo(user.uid)
        sessionStorage.setItem("login", "yes");
        setTimeout(function() {
            window.location.href = "index.html";
        }, 100); 

    })
    .catch((error) => {
        // Handle sign-in errors
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert(errorMessage);
    });
});