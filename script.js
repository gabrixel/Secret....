const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const msgs = [
  "collecting courage...",
  "overthinking everything...",
  "writing this instead of saying it normally...",
  "okay, we're doing this...",
  "almost there..."
];

let progress = 0;
let i = 0;

const timer = setInterval(() => {
  progress += 2;

  if ($("#bar")) {
    $("#bar").style.width = progress + "%";
  }

  if (progress % 20 === 0 && i < msgs.length) {
    $("#loadingText").textContent = msgs[i++];
  }

  if (progress >= 100) {
    clearInterval(timer);

    $("#loadingText").textContent = "I think I'm ready.";

    const b = $("#openBtn");

    if (b) {
      b.hidden = false;
      b.style.display = "inline-block";
    }
  }
}, 60);


// OPEN THE WEBSITE
$("#openBtn").addEventListener("click", () => {
  $("#loader").remove();

  $("#site").hidden = false;
  $("#site").style.display = "block";

  window.scrollTo(0, 0);

  startHearts();
  startMusic();
});


// NAVIGATION
$$("[data-scroll]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = $(btn.dataset.scroll);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


// REVEAL BUTTONS
$$("[data-reveal]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = $(btn.dataset.reveal);

    if (target) {
      target.hidden = false;
      target.classList.add("revealed");

      btn.style.display = "none";
    }
  });
});


// CARDS
$$(".thing-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});


// SECRET MESSAGE
const secretBtn = $("#secretBtn");

if (secretBtn) {
  secretBtn.addEventListener("click", () => {
    const secret = $("#secretMessage");

    if (secret) {
      secret.hidden = false;
      secret.classList.add("revealed");

      secretBtn.style.display = "none";
    }
  });
}


// SECOND PLACE JOKE
const secondBtn = $("#secondBtn");

if (secondBtn) {
  secondBtn.addEventListener("click", () => {
    const joke = $("#secondPlace");

    if (joke) {
      joke.hidden = false;
      joke.classList.add("revealed");

      secondBtn.style.display = "none";
    }
  });
}


// CONFESSION RESPONSE
$$("[data-response]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const response = btn.dataset.response;
    const reply = $("#responseMessage");

    if (!reply) return;

    if (response === "yes") {
      reply.textContent =
        "Okay... then maybe we can just take our time and see where this goes. ♡";
    } else {
      reply.textContent =
        "That's okay. No pressure at all. I just wanted you to know. ♡";
    }

    reply.hidden = false;
    reply.classList.add("revealed");

    heartBurst();
  });
});


// FLOATING HEARTS + FLOWERS
function startHearts() {
  const container = $("#hearts");

  if (!container) return;

  setInterval(() => {
    const heart = document.createElement("span");

    const symbols = ["♡", "♥", "✿", "❀", "✦"];
    heart.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    heart.className = "floating-heart";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration =
      5 + Math.random() * 5 + "s";

    heart.style.fontSize =
      12 + Math.random() * 18 + "px";

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 10000);
  }, 700);
}


// HEART BURST
function heartBurst() {
  const container = document.body;

  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");

    heart.textContent = "♡";
    heart.className = "burst-heart";

    heart.style.left = "50%";
    heart.style.top = "50%";

    heart.style.setProperty(
      "--x",
      (Math.random() - 0.5) * 500 + "px"
    );

    heart.style.setProperty(
      "--y",
      (Math.random() - 0.5) * 500 + "px"
    );

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1200);
  }
}


// ORIGINAL BROWSER-GENERATED AMBIENT MUSIC
let audioStarted = false;
let audioContext;
let masterGain;

function startMusic() {
  if (audioStarted) return;

  audioStarted = true;

  try {
    audioContext =
      new (window.AudioContext || window.webkitAudioContext)();

    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.035;

    masterGain.connect(audioContext.destination);

    const notes = [261.63, 329.63, 392.00, 523.25];

    notes.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = freq;

      gain.gain.value = 0.08;

      oscillator.connect(gain);
      gain.connect(masterGain);

      oscillator.start();

      setInterval(() => {
        oscillator.frequency.value =
          notes[(index + Math.floor(Math.random() * notes.length)) % notes.length];
      }, 3500 + index * 500);
    });
  } catch (error) {
    console.log("Ambient audio unavailable.");
  }
}
