import { updateGround, setupGround } from "./ground.js"
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"
import { updateCoin, setupCoin, getCoinRects } from "./coin.js"


const WORLD_WIDTH = 1
const WORLD_HEIGHT = 0.4
const SPEED_SCALE_INCREASE = 0.00001

const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

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
    document.addEventListener("keydown", handleStart, { once: true })
    startScreenElem.classList.remove("hide")
  }, 100)
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
