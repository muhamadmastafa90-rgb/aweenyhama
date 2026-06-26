const ASSETS = {
  pandaMain:
    "https://sspark.genspark.ai/cfimages?u1=4S%2BtGRkmkOYQCMt2KZ1Xp7M6dPCi97S4f6Gm80Tz1MCMgnmJu%2Bg5f6UkSjVFchvmUJiUp7zYkmM6%2FHKVYRAP54MB7onAQkZkxrKbykq8d3aoufZQr5k6gGeddHabAWMQJYC6tHPqeczgdQznpfYo95EI7A%3D%3D&u2=TccJGztSNYHOrKMz&width=2560",

  pandaSuccess:
    "https://sspark.genspark.ai/cfimages?u1=05hemmA%2FcR7bsIGYdMP62HI9FaUXa1r4RzI2azSOgj7FTdYFkHTqxYY8TC6Adg6IBJhLF9YCpYr%2FBcTXxJlkH1dRcZEJmSX8EVS5ZjjDyX6nigi%2BB6OYh9pKf9P8Qi2FsYbITVZg%2B6YsTfyVPJbsDi8%3D&u2=pWLreQwBxpM30t7O&width=2560",

  heartsGif:
    "https://sspark.genspark.ai/cfimages?u1=ah4G2CQ0bKv3vIxP97EUpjhDiIQQNGkYU673%2BxcDGnZT%2BoTxNSewDLVkCViga8LgNaPBUbf48b1TzGqGYS0cz%2BUTxXYw9ck%3D&u2=vGI%2FKAvb64ITi4x4&width=2560"
};

const pandaImg = document.getElementById("pandaImg");
const pandaImg2 = document.getElementById("pandaImg2");
const sparkGif = document.getElementById("sparkGif");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const actionsBox = document.getElementById("actionsBox");
const askView = document.getElementById("askView");
const successView = document.getElementById("successView");
const loveVideo = document.getElementById("loveVideo");
const replayBtn = document.getElementById("replayBtn");

pandaImg.src = ASSETS.pandaMain;
pandaImg2.src = ASSETS.pandaSuccess;
sparkGif.src = ASSETS.heartsGif;

let dodgeCount = 0;

function moveNoButton() {
  const areaRect = actionsBox.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = Math.max(0, areaRect.width - btnRect.width - 6);
  const maxY = Math.max(0, areaRect.height - btnRect.height - 6);

  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.right = "auto";

  dodgeCount++;

  const texts = [
    "ئەی نا 😝",
    "هێشتا نا 🙈",
    "تەنها بەڵێ بکە 🥹",
    "دڵم مەشکێنە 💔",
    "تکایە ڕازی بە 💕",
    "باشە... بەڵێ بکە 😭"
  ];

  noBtn.textContent = texts[dodgeCount % texts.length];

  noBtn.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.07)" },
      { transform: "scale(1)" }
    ],
    { duration: 180, easing: "ease-out" }
  );
}

["mouseenter", "touchstart", "click"].forEach((eventName) => {
  noBtn.addEventListener(eventName, (e) => {
    e.preventDefault();
    moveNoButton();
  });
});

yesBtn.addEventListener("click", () => {
  askView.style.display = "none";
  successView.classList.add("show");

  createHeartBurst();

  if (loveVideo) {
    loveVideo.muted = false;
    const playPromise = loveVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // if autoplay blocked on some mobile browsers, controls stay available
      });
    }
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
});

replayBtn.addEventListener("click", () => {
  askView.style.display = "block";
  successView.classList.remove("show");
  noBtn.style.right = "16px";
  noBtn.style.left = "auto";
  noBtn.style.top = "24px";
  noBtn.textContent = "هێشتا نا 🙈";
  dodgeCount = 0;

  if (loveVideo) {
    loveVideo.pause();
    loveVideo.currentTime = 0;
  }
});

function createHeartBurst() {
  const icons = ["💜", "🤍", "💕", "✨", "💞", "🫶"];
  const total = 34;

  for (let i = 0; i < total; i++) {
    const el = document.createElement("span");
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.position = "fixed";
    el.style.left = `${Math.random() * 100}vw`;
    el.style.top = `${70 + Math.random() * 20}vh`;
    el.style.fontSize = `${16 + Math.random() * 18}px`;
    el.style.zIndex = "9999";
    el.style.pointerEvents = "none";
    el.style.transition =
      `transform ${1.8 + Math.random() * 1.2}s ease-out, ` +
      `opacity ${1.8 + Math.random() * 1.2}s ease-out, ` +
      `top ${1.8 + Math.random() * 1.2}s ease-out`;

    document.body.appendChild(el);

    requestAnimationFrame(() => {
      el.style.transform = `translate(${(Math.random() - 0.5) * 180}px, -${180 + Math.random() * 260}px) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = "0";
      el.style.top = `${10 + Math.random() * 20}vh`;
    });

    setTimeout(() => el.remove(), 3200);
  }
}
