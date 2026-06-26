const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const buttonsArea = document.getElementById("buttonsArea");
const questionView = document.getElementById("questionView");
const successView = document.getElementById("successView");
const loveVideo = document.getElementById("loveVideo");

let moveCount = 0;

function moveNoButton() {
  const areaRect = buttonsArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = areaRect.width - btnRect.width;
  const maxY = areaRect.height - btnRect.height;

  const randomX = Math.max(0, Math.floor(Math.random() * maxX));
  const randomY = Math.max(0, Math.floor(Math.random() * maxY));

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.right = "auto";

  moveCount++;

  const messages = [
    "هەوڵ مەدە 😝",
    "ناتوانیت بیگری 😹",
    "تەنها بەڵێ بکە 💕",
    "تکایە ڕازی بە 🥺",
    "منیش خەمگینم 💜"
  ];

  noBtn.textContent = messages[moveCount % messages.length];
}

["mouseenter", "touchstart"].forEach(eventType => {
  noBtn.addEventListener(eventType, (e) => {
    e.preventDefault();
    moveNoButton();
  });
});

yesBtn.addEventListener("click", () => {
  questionView.style.display = "none";
  successView.style.display = "block";

  if (loveVideo) {
    loveVideo.play().catch(() => {});
  }

  createConfetti();
});

function createConfetti() {
  for (let i = 0; i < 36; i++) {
    const confetti = document.createElement("span");
    confetti.textContent = ["💜", "🤍", "💕", "✨", "🫶"][Math.floor(Math.random() * 5)];
    confetti.style.position = "fixed";
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = `-20px`;
    confetti.style.fontSize = `${18 + Math.random() * 16}px`;
    confetti.style.zIndex = "9999";
    confetti.style.pointerEvents = "none";
    confetti.style.transition = `transform ${2 + Math.random() * 2}s linear, top ${2 + Math.random() * 2}s linear, opacity 0.5s`;
    document.body.appendChild(confetti);

    requestAnimationFrame(() => {
      confetti.style.top = "110vh";
      confetti.style.transform = `translateX(${(Math.random() - 0.5) * 160}px) rotate(${Math.random() * 720}deg)`;
      confetti.style.opacity = "0.2";
    });

    setTimeout(() => confetti.remove(), 4500);
  }
}

