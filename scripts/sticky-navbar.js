// Sticky navbar hide on scroll down, show on scroll up
let lastScrollY = window.scrollY;
let ticking = false;
const navbar = document.querySelector('.navbar');
let navHidden = false;

function onScroll() {
  if (!navbar) return;
  const currentY = window.scrollY;
  if (currentY > lastScrollY + 8 && currentY > 40) {
    // Scrolling down
    if (!navHidden) {
      navbar.style.transform = 'translateY(-120%)';
      navbar.style.transition = 'transform 0.25s cubic-bezier(.4,0,.2,1)';
      navHidden = true;
    }
  } else if (currentY < lastScrollY - 8) {
    // Scrolling up
    if (navHidden) {
      navbar.style.transform = 'translateY(0)';
      navHidden = false;
    }
  }
  lastScrollY = currentY;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// Always show navbar on page load
if (navbar) {
  navbar.style.transform = 'translateY(0)';
}
