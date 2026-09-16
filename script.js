document.addEventListener("DOMContentLoaded", () => {

// =========================
// HELPER
// =========================

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// =========================
// GOOGLE SHEETS RESPONSE
// =========================

const RESPONSE_URL = "https://script.google.com/macros/s/AKfycbzWvg_oqanSkxv_Y7URoLL7YIVCrfVMPg_kzV2KyJAg90SbGIxIyokGGbCTaXdqEvuj/exec";

function sendResponse(responseText) {

  fetch(RESPONSE_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify({
      response: responseText
    })
  }).catch(() => {
    console.log("Response could not be sent.");
  });

}


// =========================
// LOADING SCREEN
// =========================

const loader = $("#loader");
const openBtn = $("#openBtn");
const bar = $("#bar");
const loadingText = $("#loadingText");

const messages = [
"collecting courage...",
"overthinking everything...",
"writing this instead of saying it normally...",
"okay, we're doing this...",
"almost there..."
];

let progress = 0;
let messageIndex = 0;

const loadingTimer = setInterval(() => {

progress += 2;

if (bar) {
  bar.style.width = progress + "%";
}

if (progress % 20 === 0 && messageIndex < messages.length) {
  if (loadingText) {
    loadingText.textContent = messages[messageIndex];
  }

  messageIndex++;
}

if (progress >= 100) {

  clearInterval(loadingTimer);

  if (loadingText) {
    loadingText.textContent = "I think I'm ready.";
  }

  if (openBtn) {
    openBtn.hidden = false;
    openBtn.style.display = "inline-block";
  }
}

}, 60);


// =========================
// OPEN WEBSITE
// =========================

if (openBtn) {

openBtn.addEventListener("click", () => {

  if (loader) {
    loader.remove();
  }

  const site = $("#site");

  if (site) {
    site.hidden = false;
    site.style.display = "block";
  }

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

  startFloatingHearts();
  startMusic();

});

}


// =========================
// ALL SCROLL BUTTONS
// =========================

$$("[data-go]").forEach((button) => {

button.addEventListener("click", (event) => {

  event.preventDefault();

  const targetId = button.getAttribute("data-go");
  const target = document.getElementById(targetId);

  if (target) {

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }

});

});


// =========================
// REVEAL BUTTONS
// =========================

$$("[data-reveal]").forEach((button) => {

button.addEventListener("click", () => {

  const targetId = button.getAttribute("data-reveal");
  const target = document.getElementById(targetId);

  if (!target) return;

  const isShowing = target.classList.contains("show");

  if (isShowing) {

    target.classList.remove("show");

    if (targetId === "futureNote") {
      button.textContent = "Open a little note";
    } else {
      button.textContent = "There's more ↓";
    }

  } else {

    target.classList.add("show");

    if (targetId === "futureNote") {
      button.textContent = "Hide note ↑";
    } else {
      button.textContent = "Hide note ↑";
    }

  }

});

});


// =========================
// THINGS I LIKE CARDS
// =========================

$$("[data-pop]").forEach((card) => {

card.addEventListener("click", () => {

  const popup = $("#pop");

  if (!popup) return;

  popup.textContent = card.getAttribute("data-pop");

  popup.hidden = false;

  popup.classList.remove("show");

  // Small delay so the animation can replay
  setTimeout(() => {
    popup.classList.add("show");
  }, 10);

});

});


// =========================
// SECRET MESSAGE
// =========================

const secretBtn = $("#secretBtn");
const secret = $("#secret");

if (secretBtn && secret) {

secretBtn.addEventListener("click", () => {

  secret.hidden = false;
  secret.classList.add("show");

  secretBtn.textContent = "🔓 Hidden message opened";

  secret.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

});

}


// =========================
// SECOND PLACE JOKE
// =========================

const secondBtn = $("#secondBtn");
const secondPlace = $("#secondPlace");

if (secondBtn && secondPlace) {

secondBtn.addEventListener("click", () => {

  secondPlace.classList.add("show");

  secondBtn.textContent =
    "🤫 Secret classified information";

  heartBurst();

});

}


// =========================
// CONFESSION BUTTONS
// =========================

const yesBtn = $("#yesBtn");
const timeBtn = $("#timeBtn");
const response = $("#response");

function showResponse(message) {

if (!response) return;

response.hidden = false;
response.textContent = message;
response.classList.add("show");

response.scrollIntoView({
  behavior: "smooth",
  block: "center"
});

}


if (yesBtn) {

yesBtn.addEventListener("click", () => {

  // Send response to Google Sheet
  sendResponse("I'd like to know you more");

  showResponse(
    "Okay... that made this whole thing worth it. ♡"
  );

  heartBurst();

});

}


if (timeBtn) {

timeBtn.addEventListener("click", () => {

  // Send response to Google Sheet
  sendResponse("I need some time");

  showResponse(
    "Take all the time you need. Seriously. There's no pressure from me. ♡"
  );

});

}


// =========================
// FLOATING HEARTS + FLOWERS + BABY CHICKENS 🐥
// =========================

let effectsStarted = false;

function startFloatingHearts() {

if (effectsStarted) return;

effectsStarted = true;

setInterval(() => {

  const element = document.createElement("div");

  const random = Math.random();

  // 20% flowers, 15% baby chickens, 65% hearts
  const isFlower = random < 0.20;
  const isChicken = random >= 0.20 && random < 0.35;

  if (isChicken) {

    element.className = "heart";
    element.textContent = "🐥";

  } else if (isFlower) {

    element.className = "flower-float";

    const flowers = ["✿", "❀", "✽"];

    element.textContent =
      flowers[Math.floor(Math.random() * flowers.length)];

  } else {

    element.className = "heart";

    const hearts = ["♡", "♥", "✦", "⋆"];

    element.textContent =
      hearts[Math.floor(Math.random() * hearts.length)];

  }

  element.style.left =
    Math.random() * 100 + "vw";

  element.style.fontSize =
    isChicken
      ? 18 + Math.random() * 18 + "px"
      : 12 + Math.random() * 24 + "px";

  element.style.opacity =
    0.3 + Math.random() * 0.6;

  element.style.animationDuration =
    6 + Math.random() * 7 + "s";

  document.body.appendChild(element);

  setTimeout(() => {
    element.remove();
  }, 14000);

}, 450);

}


// =========================
// HEART BURST
// =========================

function heartBurst() {

for (let i = 0; i < 24; i++) {

  const heart = document.createElement("div");

  heart.className = "burst-heart";
  heart.textContent = "♡";

  heart.style.left = "50%";
  heart.style.top = "55%";

  heart.style.setProperty(
    "--x",
    (Math.random() * 500 - 250) + "px"
  );

  heart.style.setProperty(
    "--y",
    (Math.random() * 400 - 200) + "px"
  );

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1500);

}

}


// =========================
// AMBIENT MUSIC
// =========================

let audioContext = null;
let musicGain = null;
let musicPlaying = false;

function startMusic() {

if (musicPlaying) return;

const AudioContext =
  window.AudioContext ||
  window.webkitAudioContext;

if (!AudioContext) return;

try {

  audioContext = new AudioContext();

  musicGain = audioContext.createGain();

  musicGain.gain.value = 0.025;

  musicGain.connect(
    audioContext.destination
  );

  const notes = [
    261.63,
    329.63,
    392.00,
    493.88
  ];

  notes.forEach((frequency) => {

    const oscillator =
      audioContext.createOscillator();

    const gain =
      audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gain.gain.value = 0.03;

    oscillator.connect(gain);
    gain.connect(musicGain);

    oscillator.start();

  });

  musicPlaying = true;

} catch (error) {

  console.log(
    "Music could not start."
  );

}

}


// =========================
// MUSIC BUTTON
// =========================

const musicButton = $("#music");

if (musicButton) {

musicButton.addEventListener("click", () => {

  if (!audioContext) {
    startMusic();
    return;
  }

  const label =
    musicButton.querySelector("span");

  if (audioContext.state === "running") {

    audioContext.suspend();

    if (label) {
      label.textContent = "music off";
    }

  } else {

    audioContext.resume();

    if (label) {
      label.textContent = "music";
    }

  }

});

}

});
