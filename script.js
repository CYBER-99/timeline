// ===============================
// ELEMENTS
// ===============================

const output = document.getElementById("output");
const searchBtn = document.getElementById("searchBtn");
const proceedBtn = document.getElementById("proceedBtn");
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

const ambientSound = document.getElementById("ambientSound");
const typeSound = document.getElementById("typeSound");
const errorSound = document.getElementById("errorSound");
const successSound = document.getElementById("successSound");

// 🔁 PUT YOUR ROBLOX LINK HERE
const ROBLOX_LINK = "https://www.roblox.com/games/80748943516594/Timeline";

// ===============================
// VOLUME CONTROL
// ===============================

ambientSound.volume = 0.3;
typeSound.volume = 0.12;
errorSound.volume = 0.5;
successSound.volume = 0.4;

// ===============================
// STARFIELD BACKGROUND
// ===============================

let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createStars() {
  stars = [];
  const count = Math.floor(window.innerWidth / 6);

  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5,
      speed: Math.random() * 0.4
    });
  }
}
createStars();

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    ctx.fillStyle = "white";
    ctx.globalAlpha = Math.random();
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    star.y += star.speed;
    if (star.y > canvas.height) star.y = 0;
  });

  requestAnimationFrame(animateStars);
}
animateStars();

// ===============================
// UTILITIES
// ===============================

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function typeLine(text, className = "") {
  return new Promise(resolve => {
    const line = document.createElement("div");
    line.className = "line " + className;
    output.appendChild(line);

    let i = 0;

    function type() {
      if (i < text.length) {
        line.textContent += text.charAt(i);

        typeSound.currentTime = 0;
        typeSound.play().catch(() => {});

        i++;
        setTimeout(type, 35);
      } else {
        resolve();
      }
    }

    type();
  });
}

// ===============================
// MAIN SEQUENCE
// ===============================

async function runSearch() {

  // Start ambient safely (mobile requires user interaction)
  ambientSound.play().catch(() => {});

  searchBtn.disabled = true;
  searchBtn.textContent = "Scanning...";
  output.innerHTML = "";

  await wait(800);

  await typeLine("Searching for alternate timeline without you...");
  await wait(1200);

  await typeLine("Scanning universe clusters...");
  await wait(1000);

  await typeLine("ERROR: Timeline collapse detected.", "error");
  errorSound.currentTime = 0;
  errorSound.play().catch(() => {});
  await wait(1500);

  await typeLine("Recalibrating reality matrix...");
  await wait(1200);

  await typeLine("ERROR: Identity instability detected.", "error");
  errorSound.currentTime = 0;
  errorSound.play().catch(() => {});
  await wait(1500);

  await typeLine("Stabilizing variables...");
  await wait(1200);

  await typeLine("Timeline Without You Found.", "success");
  successSound.currentTime = 0;
  successSound.play().catch(() => {});
  await wait(1500);

  await typeLine("Result unstable.");
  await wait(1200);

  await typeLine("One stable timeline identified.");
  await wait(1500);

  proceedBtn.classList.remove("hidden");
}

// ===============================
// EVENTS
// ===============================

searchBtn.addEventListener("click", runSearch);

proceedBtn.addEventListener("click", () => {

  successSound.currentTime = 0;
  successSound.play().catch(() => {});

  proceedBtn.textContent = "Connecting...";
  proceedBtn.disabled = true;

  setTimeout(() => {
    window.location.href = ROBLOX_LINK;
  }, 1200);
});