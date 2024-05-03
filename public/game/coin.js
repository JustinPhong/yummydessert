import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  const CACTUS_INTERVAL_MIN = 1000
  const CACTUS_INTERVAL_MAX = 2000
  const worldElem = document.querySelector("[data-world]")
  
  let nextCactusTime
  export function setupCoin() {
    nextCactusTime = CACTUS_INTERVAL_MIN
    document.querySelectorAll("[data-coin]").forEach(coin => {
      coin.remove()
    })
  }
  
  export function updateCoin(delta, speedScale) {
    document.querySelectorAll("[data-coin]").forEach(coin => {
      incrementCustomProperty(coin, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(coin, "--left") <= -100) {
        coin.remove()
      }
    })
  
    if (nextCactusTime <= 0) {
      createCactus()
      nextCactusTime =
        randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
    }
    nextCactusTime -= delta
  }
  
  export function getCoinRects() {
    return [...document.querySelectorAll("[data-coin]")].map(coin => {
      return coin.getBoundingClientRect()
    })
  }
  
  function createCactus() {
    const coin = document.createElement("img")
    coin.dataset.coin = true
    coin.src = "imgs/coin.gif"
    coin.classList.add("coin")
    setCustomProperty(coin, "--left", 100)
    worldElem.append(coin)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  