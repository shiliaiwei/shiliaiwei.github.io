// Fetch and render GitHub stats for EIRSVi
async function renderGitHubProfile() {
  const profileUrl = 'https://api.github.com/users/eirsvi';
  const profile = await fetch(profileUrl).then(r => r.json());
  document.getElementById('gh-public-repos').textContent = profile.public_repos;
  document.getElementById('gh-public-gists').textContent = profile.public_gists;
  document.getElementById('gh-followers').textContent = profile.followers;
  document.getElementById('gh-following').textContent = profile.following;
}

document.addEventListener('DOMContentLoaded', renderGitHubProfile);