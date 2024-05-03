import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const dinoElem = document.querySelector("[data-dino]")
const JUMP_SPEED = 0.2
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let GRAVITY
let isJumping
let dinoFrame
let currentFrameTime
let yVelocity
export function setupDino() {
  isJumping = false
  GRAVITY = 0.0008
  dinoFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(dinoElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.removeEventListener("keydown", onDown)
  document.addEventListener("keydown", onJump)
  document.addEventListener("keydown", onDown)
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getDinoRect() {
  return dinoElem.getBoundingClientRect()
}

export function setDinoLose() {
  dinoElem.src = "imgs/menlose.png"
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElem.src = `imgs/men0.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dinoElem.src = `imgs/men${dinoFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
  GRAVITY = 0.0008
}

function onJump(e) {
  if ((e.code !== "ArrowUp" && e.code !== "Space"  )|| isJumping) return
  yVelocity = JUMP_SPEED
  isJumping = true
}

function onDown(e) {
  if (e.code !== "ArrowDown") return
  GRAVITY = 0.008
}
