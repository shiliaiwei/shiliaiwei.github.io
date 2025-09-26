// Marquee('.marquee', 0.4) // selector, speed (px/frame)
function Marquee(selector, speed = 0.4) {
  const el = document.querySelector(selector);
  if (!el) return;
  let running = true;
  let pos = el.offsetWidth;
  function animate() {
    if (running) {
      pos -= speed;
      if (pos < -el.scrollWidth) pos = el.offsetWidth;
      el.style.transform = `translateX(${pos}px)`;
    }
    requestAnimationFrame(animate);
  }
  el.addEventListener('mouseenter', () => running = false);
  el.addEventListener('mouseleave', () => running = true);
  animate();
}

document.addEventListener('DOMContentLoaded', () => {
  Marquee('.marquee', 0.4);
});
