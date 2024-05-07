// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { openman } from "./openmen.js"


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
    const userRef = ref(db, `users/${user.uid}`); 
    // Retrieve user data from Realtime Database
    onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
            // Update input fields with user data
            const username = userData.username || '';
            const name = userData.name || '';
            const email = userData.email || '';
            const phone = userData.contact || '';
            const birthday = userData.birthday || '';
            
            document.getElementById("tableaccount");
            var newinfo = document.createElement("tbody");
            newinfo.innerHTML = `
            <tr>
            <td style="width:4cm;text-align:end">
                    <a class="txt">Username</a>
                </td>
                <td>
                    <input readonly id="username1" value="${username}" class="inputc">
                </td>
            </tr>
            <tr>
                <td style="text-align:end">
                    <a class="txt">Name</a>
                </td>
                <td>
                    <input id="name1" value="${name}" class="inputc">
                </td>
            </tr>
            <tr>
                <td style="text-align:end">       
                    <a class="txt">Email</a>
                </td>
                <td>
                    <input id="email1" type="email" value="${email}" class="inputc">
                </td>
            </tr>
            <tr>
                <td style="text-align:end">
                    <a class="txt">Contact Number</a>
                </td>
                <td>
                    <input id="phone1" type="tel" style="appearance: none;" value="${phone}" class="inputc">
                </td>
            </tr>
            <tr>
                <td style="text-align:end">   
                    <a class="txt">Date of Birth</a>
                </td>
                <td>
                    <input id="birthday1" type="date" value="${birthday}" class="inputc">
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <input type="submit" class="submitbutton" value="Save">
                </td>
            `
            tableaccount.appendChild(newinfo);
        } else {
            console.log("User data not found");
        }
    }, (error) => {
        console.error("Error fetching user data:", error);
    });
    openman()
} else {
    console.log("User is not authenticated");
    // Handle the case where the user is not authenticated, redirect to login page or display appropriate message
}})
