import { updateGround, setupGround } from "./ground.js"
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"
import { updateCoin, setupCoin, getCoinRects } from "./coin.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
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
const db = getDatabase(app);
const auth = getAuth();
const user = auth.currentUser;



const WORLD_WIDTH = 1
const WORLD_HEIGHT = 0.4
const SPEED_SCALE_INCREASE = 0.00001

const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")
const start = document.getElementById("start")

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)

auth.onAuthStateChanged(function(user){
if (user){
  const userRef = ref(db, `users/${user.uid}/gameData`); 
  onValue(userRef, (snapshot) =>{
    const gameData = snapshot.val();
    if (gameData){
      const lastplay = new Date(gameData.lastplay).toLocaleDateString() || '';
      const currentDate = new Date().toLocaleDateString();
      if (lastplay == currentDate){
          start.textContent="Try Again Tommorow!"
      } else {
        start.textContent="Press Any Key To Start"
      
      document.addEventListener("keydown", handleStart, { once: true })
      }
    } else {
      start.textContent="Press Any Key To Start"
    
    document.addEventListener("keydown", handleStart, { once: true })
    }
  }
  )
}})

let lastTime
let speedScale
let score
let coin

function handleKeyDown(event) {
  if (event.code === "ArrowUp" || event.code === "ArrowDown") {
    event.preventDefault();
  }
}

document.addEventListener("keydown", handleKeyDown);


function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime

  updateGround(delta, speedScale)
  updateDino(delta, speedScale)
  updateCactus(delta, speedScale)
  updateCoin(delta, speedScale)
  updateSpeedScale(delta)
  if (checkLose()) return handleLose()
  if (checkCoin()) {handleCoin()}

  lastTime = time
  window.requestAnimationFrame(update)
}

function checkLose() {
  const dinoRect = getDinoRect()
  return getCactusRects().some(cactusRect => isCollision(cactusRect, dinoRect))
}

function checkCoin() {
  const dinoRect = getDinoRect()
  return getCoinRects().some(coinRect => isCollision(coinRect, dinoRect));
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}


function handleStart() {
  auth.onAuthStateChanged(function(user) {
    if (user) {
        const date = new Date();
        const userId = user.uid;
        const userGameDataRef = ref(db, `users/${userId}/gameData`);

        get(userGameDataRef)
            .then((snapshot) => {
                const existingGameData = snapshot.val() || {};
                const updatedGameData = {
                    ...existingGameData,
                    lastplay: date.valueOf()
                };

                return set(userGameDataRef, updatedGameData);
            })
            .catch((error) => {
                console.error("Error updating game data:", error);
            });
    }
});


  lastTime = null
  speedScale = 1
  coin = 0
  setupGround()
  setupDino()
  setupCactus()
  setupCoin()
  startScreenElem.classList.add("hide")
  window.requestAnimationFrame(update)
  scoreElem.textContent = Math.floor("0")
}

function handleLose() {
  setDinoLose()
  setTimeout(() => {
    startScreenElem.classList.remove("hide")
  }, 100)
  handleCoin(coin)
  auth.onAuthStateChanged(function(user){
    if (user){
  getScoreDatabase()
  .then((currentScore) => {
      const pts = coin + currentScore;
      const userGameDataRef = ref(db, `users/${user.uid}/gameData`);
      get(userGameDataRef)
      .then((snapshot) => {
        const existingGameData = snapshot.val() || {};
        const updatedGameData = {
            ...existingGameData,
            score: pts
        };

        return set(userGameDataRef, updatedGameData);
    })
  })
  .catch((error) => {
      console.error("Error fetching current score:", error);
  });}})
}

function handleCoin() {
  const dinoRect = getDinoRect();
  const coinRects = getCoinRects();

  const collidedCoins = coinRects.filter(coinRect => isCollision(coinRect, dinoRect))
                                  .map(coinRect => findCoinElementByRect(coinRect));

  collidedCoins.forEach(coinElement => {
    if (coinElement) {
      coinElement.remove();
      coin += 2;
      return coin
    }
  });

  scoreElem.textContent = Math.floor(coin)
}

function findCoinElementByRect(coinRect) {
  const coins = document.querySelectorAll(".coin");
  for (const coin of coins) {
    const rect = coin.getBoundingClientRect();
    if (isCollision(rect, coinRect)) {
      return coin;
    }
  }
  return null;
}



function setPixelToWorldScale() {
  let worldToPixelScale
  worldToPixelScale = window.innerHeight 

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}


function getScoreDatabase() {
  return new Promise((resolve, reject) => {
      const userId = auth.currentUser.uid;
      const db = getDatabase();
      const scoreRef = ref(db, `users/${userId}/gameData/score`);

      onValue(scoreRef, (snapshot) => {
          if (snapshot.exists()) {
              const score = snapshot.val();
              const currentScore = score || 0;
              resolve(currentScore); // Resolve the promise with the current score
          } else {
              resolve(0); // Resolve with default score if the data doesn't exist
          }
      }, (error) => {
          console.error("Error fetching score:", error);
          reject(error); // Reject the promise if there's an error
      });
  });
}
