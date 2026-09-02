import confetti from "canvas-confetti";

export const fireConfetti = () => {
  const end = Date.now() + 600;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};
