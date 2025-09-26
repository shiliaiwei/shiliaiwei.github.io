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
