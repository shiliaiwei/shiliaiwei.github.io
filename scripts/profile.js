// Profile grid data and interactivity for sort.html
const users = [
  {
    id: '100025020637830',
    fullName: 'Nitha Chea',
    username: 'nitha.chea.3#',
    college: 'bbu',
    city: 'btmc',
    contact: '',
    gender: 'f',
    dob: '',
    creation: '',
    social: '',
    status: 'single',
    alias: '',
    leaks: '',
    img: 'https://scontent.fpnh1-1.fna.fbcdn.net/v/t39.30808-6/515438265_1939572563553413_1114587538324136783_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Iwu8DKqLWpoQ7kNvwGH_liU&_nc_oc=AdmtkAN6sJgRCDKThPn0BPREbPO3do43dpt9Gu2Fg3OFDhBdnp7mBTgyr8A5nPW1Das&_nc_zt=23&_nc_ht=scontent.fpnh1-1.fna&_nc_gid=dOtHAFLde6ZYJAzVzrVJSA&oh=00_AfY20Hmn-TIpEYRDRD3_FXskRYktFMwVb9JQ0It518kg2w&oe=68E06623',
    other: ''
  },
  {
    id: '100013797181332',
    fullName: 'Moeun Chamroeun',
    username: '/moeun.chamroeun.2025#',
    college: 'sect',
    city: 'sr',
    contact: '',
    gender: 'm',
    dob: '',
    creation: '2016',
    social: '',
    status: 'monk',
    alias: '',
    leaks: '',
    img: 'https://scontent.fpnh1-2.fna.fbcdn.net/v/t39.30808-1/492658356_2211117406024811_4936298124533231963_n.jpg?stp=c4.10.949.948a_dst-jpg_s200x200_tt6&_nc_cat=108&ccb=1-7&_nc_sid=e99d92&_nc_ohc=h7vogvQYSucQ7kNvwEPqhcB&_nc_oc=AdkD3oBGsaBWPWNx3quhEiZPVF5cKVlEY1dz_ZC_5oiTPgVQouapwP-bByqFIxYzHrA&_nc_zt=24&_nc_ht=scontent.fpnh1-2.fna&_nc_gid=_rq_eUqBQd78ccRymlMgQA&oh=00_AfbNsw8apnCdTrxhlAOb9TzbSjVgl_L8RJh7kn3pR7stPg&oe=68D8A90E',
    other: ''
  },
  {
    id: '100007175085665',
    fullName: 'Nao Heng',
    username: '/nao.soheng#',
    college: 'ume kt',
    city: 'kt',
    contact: '',
    gender: 'm',
    dob: '',
    creation: '',
    social: '',
    status: 'maaried',
    alias: '',
    leaks: '',
    img: 'https://scontent.fpnh1-1.fna.fbcdn.net/v/t39.30808-6/488600928_3888226794759785_6615050343673639578_n.jpg?stp=dst-jpg_s160x160_tt6&_nc_cat=106&ccb=1-7&_nc_sid=e09983&_nc_ohc=4vP1pnOJbSQQ7kNvwGrpbFI&_nc_oc=Adlp6KRfRkUDE1ztiRrp9Engv6lGsVEYtfojTcml1R6YlT9Dotde9ee3Nt3Co48g8lc&_nc_zt=23&_nc_ht=scontent.fpnh1-1.fna&_nc_gid=w8j2DIEHHVEGeAGrplKIvg&oh=00_AfbPoJ-QNq_jFn1jeKtkBN25VJ39i2q5R4YuxQkrQJctzQ&oe=68D89C0D',
    other: ''
  },
  {
    id: '100013628291417',
    fullName: 'ប៉ាវ ពិសិដ្ឋ',
    username: '/pavpiseth#',
    college: 'ume kt',
    city: 'kt',
    contact: '',
    gender: 'm',
    dob: '',
    creation: '',
    social: '',
    status: 'married',
    alias: '',
    leaks: '',
    img: 'https://scontent.fpnh1-2.fna.fbcdn.net/v/t39.30808-6/549724447_2263546727442915_4479509241268155034_n.jpg?stp=cp6_dst-jpg_s600x600_tt6&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=m33wpFpR70sQ7kNvwGB3S78&_nc_oc=AdnWgfgaGRYkUUoueLbKVUlZpvJfICVGt7cfRMWC0ndUY0capWZAAi7sZS6vM--wDdo&_nc_zt=23&_nc_ht=scontent.fpnh1-2.fna&_nc_gid=7qtjBcfcxCfr259N_qP-Rg&oh=00_AfYb3beREX3cB3PNIJ78cqZ6pdYRVTjE90UVj4PV1266zw&oe=68D8B062',
    other: ''
  },
  {
    id: '100081434285427',
    fullName: 'ដេ វ៉ា',
    username: '/ug24y1h2br#',
    college: 'rbhs',
    city: 'kt',
    contact: '',
    gender: 'm',
    dob: '',
    creation: '',
    social: '',
    status: 'monk',
    alias: '',
    leaks: '',
    img: 'https://scontent.fpnh1-2.fna.fbcdn.net/v/t39.30808-6/476225580_624267296964408_8149943862244066944_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=uU-YGEZxv_0Q7kNvwE4X6eM&_nc_oc=Adn6Kt-NlifKus9m2VM4UibTFIGiPpt3f1ODP3o8r0fh0pDjZXJscyqoUAWPX2gG91k&_nc_zt=23&_nc_ht=scontent.fpnh1-2.fna&_nc_gid=jHjHoE61PqhqzX9JfrWD6g&oh=00_AfYHoaWScnw5WBeS1-kPT8_NrBIC-j-x_qb83pICKlVQyQ&oe=68D89BF4',
    other: ''
  },
  {
    id: '100074240434157',
    fullName: 'Vanna Thoy',
    username: 'vannathoy26#',
    college: 'rbhs puc',
    city: 'kt',
    contact: '',
    gender: 'm',
    dob: '',
    creation: '',
    social: '',
    status: 'monk',
    alias: '',
    leaks: '',
    img: 'https://scontent.fpnh1-1.fna.fbcdn.net/v/t39.30808-6/481450280_651388984012444_7197942927804544828_n.jpg?stp=dst-jpg_s160x160_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e09983&_nc_ohc=6qieTcKR5i4Q7kNvwGFGQTQ&_nc_oc=AdlgkgR-_tXmpd9UU9Xh1e3YBtPK-b6shhmraM8EI2N86sXyS1QiVPZfAWK_ydGGMLE&_nc_zt=23&_nc_ht=scontent.fpnh1-1.fna&_nc_gid=8iKX-MJ2ixfx4rIIljDoCA&oh=00_Afa3trJTxlGHL7YEXIx736D8wnx2tkS_KgrEFrdp1saggw&oe=68D899D9',
    other: ''
  },
  // ...add more users as needed
];

const cardColors = ['coCard1', 'coCard2', 'coCard3'];

function getLastName(fullName) {
  if (!fullName) return 'Unknown';
  const parts = fullName.trim().split(' ');
  return parts[parts.length - 1] || 'Unknown';
}

function renderProfileGrid() {
  const grid = document.getElementById('profileGrid');
  if (!grid) return;
  grid.innerHTML = '';
  users.forEach((user, i) => {
    const colorClass = cardColors[Math.floor(Math.random() * cardColors.length)];
    const card = document.createElement('div');
    card.className = `profile-card ${colorClass}`;
    card.innerHTML = `
      <img class="profile-img" src="${user.img}" alt="${getLastName(user.fullName)}" />
      <div class="profile-lastname">${getLastName(user.fullName)}</div>
      <div class="profile-username">${user.username || 'Unknown'}</div>
      <div class="terminal-pop" tabindex="-1">
        <button class="terminal-close" title="Close">×</button>
        <div class="terminal-title">User Info</div>
        <div class="terminal-field"><span class="terminal-label">ID:</span> <span class="terminal-value">${user.id || 'Unknown'}</span></div>
        <div class="terminal-field"><span class="terminal-label">Full Name:</span> <span class="terminal-value">${user.fullName || 'Unknown'}</span></div>
        <div class="terminal-field"><span class="terminal-label">username:</span> <span class="terminal-value">${user.username || 'Unknown'}</span></div>
        <div class="terminal-field"><span class="terminal-label">College:</span> <span class="terminal-value">${user.college || 'Unknown'}</span></div>
        <div class="terminal-field"><span class="terminal-label">City:</span> <span class="terminal-value">${user.city || 'Unknown'}</span></div>
        <div class="terminal-field"><span class="terminal-label">Contact info:</span> <span class="terminal-value">${user.contact || 'Unknown'}</span></div>
        <div class="terminal-field"><span class="terminal-label">Gender:</span> <span class="terminal-value">${user.gender || 'Unknown'}</span></div>
        <div class="terminal-field"><span class="terminal-label">DOB:</span> <span class="terminal-value">${user.dob || 'Unknown'}</span></div>
        <div class="terminal-field"><span class="terminal-label">Creation date:</span> <span class="terminal-value">${user.creation || 'Unknown'}</span></div>
        <div class="terminal-field"><span class="terminal-label">social links:</span> <span class="terminal-value">${user.social || 'Unknown'}</span></div>
        <div class="terminal-field"><span class="terminal-label">status:</span> <span class="terminal-value">${user.status || 'Unknown'}</span></div>
        <div class="terminal-field"><span class="terminal-label">Alias names:</span> <span class="terminal-value">${user.alias || 'Unknown'}</span></div>
        <div class="terminal-field"><span class="terminal-label">The number of leaks:</span> <span class="terminal-value">${user.leaks || 'Unknown'}</span></div>
        <div class="terminal-field"><span class="terminal-label">IMG:</span> <span class="terminal-value">${user.img ? '[hidden]' : 'Unknown'}</span></div>
        <div class="terminal-field"><span class="terminal-label">other:</span> <span class="terminal-value">${user.other || 'Unknown'}</span></div>
      </div>
    `;
    // PC: hover, Mobile: click
    const terminal = card.querySelector('.terminal-pop');
    const closeBtn = card.querySelector('.terminal-close');
    function showTerminal() {
      terminal.classList.add('active');
      terminal.focus();
    }
    function hideTerminal() {
      terminal.classList.remove('active');
    }
    // PC hover
    card.addEventListener('mouseenter', () => {
      if (window.innerWidth > 600) showTerminal();
    });
    card.addEventListener('mouseleave', () => {
      if (window.innerWidth > 600) hideTerminal();
    });
    // Mobile click
    card.addEventListener('click', e => {
      if (window.innerWidth <= 600) showTerminal();
    });
    closeBtn.addEventListener('click', e => {
      e.stopPropagation();
      hideTerminal();
    });
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderProfileGrid);