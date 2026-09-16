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

      // Sends the response to your Google Sheet
      sendResponse("I'd like to know you more");

      showResponse(
        "Okay... that made this whole thing worth it. ♡"
      );

      heartBurst();

    });
