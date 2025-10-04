// Simple client-side router for SPA navigation
const routes = {
  home: '/pages/home.html',
  article: '/pages/article.html',
  resource: '/pages/resource.html',
  matrix: '/pages/matrix.html',
  sort: '/pages/sort.html',
};

function setActiveNav(route) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.route === route) item.classList.add('active');
  });
}

function loadRoute(route) {
  const page = routes[route] || routes.home;
  fetch(page)
    .then(res => res.text())
    .then(html => {
      document.getElementById('page-content').innerHTML = html;
      setActiveNav(route);
      window.scrollTo(0, 0);

      // If loading home.html, inject permutation script
      if (page.endsWith('home.html')) {
        const permScript = document.createElement('script');
        permScript.textContent = `
function getPermutations(str) {
  const results = [];
  function permute(arr, l, r) {
    if (l === r) {
      results.push(arr.join(''));
    } else {
      for (let i = l; i <= r; i++) {
        [arr[l], arr[i]] = [arr[i], arr[l]];
        permute(arr, l + 1, r);
        [arr[l], arr[i]] = [arr[i], arr[l]];
      }
    }
  }
  permute(str.split(''), 0, str.length - 1);
  return Array.from(new Set(results));
}
const nameStr = 'EIRSVi';
let perms = getPermutations(nameStr);
perms = perms.filter(p => p.length === nameStr.length);
perms.sort();
const startIdx = perms.indexOf('SRIEVi');
let idx = startIdx >= 0 ? startIdx : 0;
function animatePermName() {
  const el = document.getElementById('permName');
  if (el) {
    el.textContent = perms[idx];
    idx = (idx + 1) % perms.length;
  }
}
setInterval(animatePermName, 20);
`;
        document.getElementById('page-content').appendChild(permScript);
      }

      // If loading resource.html, inject resource-cards.js
      if (page.endsWith('resource.html')) {
        const script = document.createElement('script');
        script.src = '/scripts/resource-cards.js';
        script.onload = function() {
          if (typeof renderResourceCards === 'function') renderResourceCards();
        };
        document.getElementById('page-content').appendChild(script);
      }
    });
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const route = item.dataset.route;
      history.pushState({ route }, '', '#' + route);
      loadRoute(route);
    });
  });
  // Initial load
  const hash = window.location.hash.replace('#', '') || 'home';
  loadRoute(hash);
});

window.addEventListener('popstate', e => {
  const route = (e.state && e.state.route) || 'home';
  loadRoute(route);
});
