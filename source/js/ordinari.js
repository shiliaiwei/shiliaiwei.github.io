// User data from the provided list
const userData = `
100075703041229 Ren Mak M
61574482568973 ប្រូ៚ សិដ្ធ៚M
100095181160683 ឧត្ដម ក្រចេះ M
61563305980223 ពូ សាង F
100070087643940 So Ny F
100043358040323 នី សា F
61564019516869 Sang SreyOun F
100084669544449 Mao Pozz Mey (មុី) M
100027374180534 ម៉ៅ ម៉ាន M
100016491605550 Heang Vuth M
100006155678899 លោកម្ចាស់ វុទ្ធី M
100010166683725 Vat Sothoeun M
100012201917268 ព្រះខន្តិរាមមុនី ឡុង ស៊ីនឿន M
100024510792811 Sinoeun Long M
100012118455636 CHEA BUNREN M
100009327437769 សោម M
100029891295441 John Riya M
61565271765003 Vi Bol M
100009435056251 ចាន់ ប៊ុនធឿន (Chan Bunthoeun) M
61576885196874 Rorn Sopi  M
100079622224614 So Nean M
100026836671228 ថាន់ សាមឿត M
100069888900750 MENG SREANG M
100022903484955 Keo Sokme M
100022029937205 អុី សីហា M
100013798372148 Veang Pho M
61550283284870 Ei Thong (TR) M
100003019882032 កែ ឃឿង M
100009269542811 Nal Vannak M
100034263555370 Nal Nal M
100009171541696 ចៅ វង្ស M
100010586868892 Sokchea Moeun M
100011768130764 ផន ចាន់ដា M
100010166659393 Lin Yura M
100012293854476 Sao Wuthy M
fb.com/100037029780038 Ry M
100007569792817 Khol M
100004226287903 Ros Rain M
100035995479702 Oll Manujentra M
100023037140319 Kara Famer M
100035829969623 Venerable Sovanna M
100026348705599 Kun Khmer (ផល សាមុំ) M
100037439796190 Van Daleak M
100036035298907 Yoeun Savly (សាវលី) M
100010981118279 អាចារ្យតូច ជឿន សាវឿន M
100015951275004 ផល សាមុំ M
100046093504373 Hea Kakevy M
100012839554569 Meas Sokraksa M
100001165685214 Piseth Pav M
100007730917659 Porthy Sornn (ស៊ន់ ប៉ោធី) M
100019705172548 សុរិទ្ធី យ៉ា M
100015686027292 Bean Kimeng M
100013867776037 Ahlapu Houy M
100023677371064 Born Phanith M
100055603840685 Chan Rith M
100045501036557 Chan Trea M
100007743076021 Chhean Pholla M
100013647140455 Chhorn Chhay M
100047800320005 Haη ゝ M
100022903484955 Keo Sokme M
100061270958862 Khung Phaet M
100066827455207 Kin Damro M
100057540706980 Lat Youn M
100022948620135 Lim Gentleman's M
100046297483805 Minea Chea M
100051968152610 Song Sambol M 
100013880775942 Muny Kosal ( លីម កុសល) M
100016950767200 NU TH M
100080321752736 Phareak Reap M
100029012521070 Po Daro M
100037731185065 Pőž Ŝâě M
100036873159571 Proeung Sochea KH M
100015658630254 Pu Roo (ឃីន សុខ រ៉ូ) M
100034028374232 Rathy SOk M
100030207202724 Reap Phireak M
100025713696801 Reap Pireak M
100004226287903 Ros Rain M
100019099133838 RY Saphorn Snuol M
100021790635768 Sean Sey M
100014628995675 Sourkea   M
100007569792817 Soy Khol M
100073375749270 Soy Khol Sr. M
100044168371130 Srun Mil M
100047461473474 Steel Person M
100029903375926 Su Thay M
100021322039799 Vannak Kong M
100017650691448 Vinjr La M
100053070217767 Vinjr La M
100009561431296 ឃុន សាយ M
100033423532812 ចាន់ វណ្ណា M
100063623713404 ទិត ការ៉ា M
100030366111282 ទិត៚ សំអាង៚ (មិត) M
100068477161032 នីនី នយ M
100034903295434 បេីយ ប៊ត់ M
100081018579554 ប្រាក់ រដ្ឋា M
100067906196210 ភិក្ខុ ភារធម្មោ ព្រហ្ម ភារម្យ M
100034702540477 ស្មារតី អ្នក ចម្បាំង M
100031058479612 小龙多多 M
100028254458361 已登入 (នី ណាស់) M
100012627976416 Eirs Vi M
100057666978328 Phork Channa F
100086426464475 យ៉ាវ មៀត M
100048376402609 អ៊ារ អុីត M
100034879410842 ផា វីនធីរតនះ M
100047530486540 លីហេង វុទ្ធី M
61560334539816 Seng Sourng M
100074770834689 ជឿន៚ សុខឡា (Stēllā) F
100044448217331 ចក់ គម្ពីរ F
100050241732029 Kdeyy FabBoi M
100051376809222 Chhieng Sauth F
100083112971095 Kounga Kri M
100011053534207 Sereyrith Kol (បូរិទ្ធជា) M
100001215956354 Inn Sodin M
100089381259552 Rong Rong F
100044408447850 ភិក្ខុឧត្តមោ ពាន់ គង់ M
100094081125244 Karout Krit M
100022070173667 ថង វ៉ាន់ធៀវ (Vann) M
100040709837561 បុត្រា សុជាក់ (ព្រហ្មធរោ) M
100010123775528 Cheatok Lon M
100051421644294 Audom Heng M
100007479706591 Cheaton Lon M
100022987866218 Eam Vimorl M
100011455238567 Anek Samnang M
100083983826019 Chhieng Sch F
100007142442442 Daravuth Meas (លោកគ្រូ រ៉ាវុធ) M
100010461674118 យ៉ុង សៃយ៉ាន់ M
100024073085564 សុីថុល (Bhante Sithol) M
100076003470214 ថូវ ថាវ (សីលធនំ) M
100072344584917 Chheang Sophy M
100088903092164 Phuoy Chon M
100006877994502 MEGN LAI YA M
100036283396642 Hang Sengha M
100040342124137 Sum Soeut M
100008264016239 Sath Re M
100013084832918 Chheng Bopha F
100000733852241 Phang Puthy F
100041688198515 Tean Chorn M 
100089381259552 Rong Rong F
100007478869468 Orn Ei Thong M
100009389575618 អុីម បូរី M
100014612536717 Chanry KT M
100015189158337 ផុន សុផៃ M
 
61559374127086 Ńåm Chhēāv M
  
100065679734241 ស្រី ស្តេីង F
100082144860422 Choun Ly M
100068194657426 Dy Heam M
100050478054108 Kers Chong M
100022119012147 Laomkhmer  M
100046476018201 Roub Boeb M
100087582833504 Sak Nak M
100042502368760 VI LA M
100035037711889 Sokleng Tbk M
100037170339679 Pean Kong M
100091675988484 Than Khuoch M
100081179075189 ۦۦ ۦۦ  M
100055609753569 ឃឿប៚ សុខន៚ M
100017187336287 ណែម ណាវ (Nem Nao) M
100060541340158 សែត ដារិទ្ធិ ភិក្ខុ M
100035224263344 ឆេង បុប្ផា F
100041544541246 Pu Seng M
100046656784820 ឡី៚ លីន៚ M
100022054710023 ឡឹត សីហា (Loet Seyha) M
563370747 Sengtha Chay M
100012905835517 ROEUN MARIN M
61577755043247 ក្មេងរិទ្ធី ក្រចេះ រ៉ាវីត   M
61566413654848 Sok Rathy M
100022070173667 ថង វ៉ាន់ធៀវ M
61554255131800 បុត្រត្រី ពៅ F
100010145445517 Seanghay M
100038115375989 Pöv Hüb M
100011056632160 Yin Chanthea M
 
1209128513 Tepken Vannkorn M
100004482186118 ធារី ច័ន្ទលីអ៊ីង M
100074240434157 Vanna Thoy M
100081434285427 ដេ វ៉ា M
100013628291417 ប៉ាវ ពិសិដ្ឋ M
 100007175085665 Nao Heng M
100013797181332 Moeun Chamroeun M
100025020637830 Nitha Chea  F
`;

// Parse user data
function parseUserData(data) {
  const lines = data.trim().split('\n');
  const users = [];
  
  lines.forEach(line => {
    // Extract ID (can be with or without fb.com/)
    const idMatch = line.match(/(?:(?:fb\.com\/)?(\d+))|(?:(\d+))/);
    const id = idMatch ? (idMatch[1] || idMatch[2]) : null;
    
    if (!id) return;
    
    // Extract name and gender
    const namePart = line.replace(/fb\.com\/\d+|^\d+\s*/, '').trim();
    const genderMatch = namePart.match(/\s+([MF])\s*$/i);
    const gender = genderMatch ? genderMatch[1].toLowerCase() : null;
    const name = genderMatch ? namePart.replace(/\s+[MF]\s*$/i, '').trim() : namePart;
    
    // Normalize name (remove extra spaces and parentheses content)
    const normalizedName = name.replace(/\s*\([^)]*\)\s*/g, ' ').trim().replace(/\s+/g, ' ');
    
    // Get first name (first token)
    const firstName = normalizedName.split(' ')[0];
    
    // Get initial (first character of firstName, uppercase)
    const initial = firstName.charAt(0).toUpperCase();
    
    users.push({
      id: id,
      firstName: firstName,
      fullName: normalizedName,
      initial: initial,
      gender: gender
    });
  });
  
  return users;
}

// Partition IDs into ranges and randomize within each range
function partitionAndRandomize(users) {
  // Define ID ranges
  const ranges = [
    { min: 0, max: 9999999999, name: "0-9999999999" },
    { min: 100000000000000, max: 999999999999999, name: "100000000000000-999999999999999" },
    { min: 1000000000000000, max: 9999999999999999, name: "1000000000000000-9999999999999999" }
  ];
  
  // Group users by ranges
  const groupedUsers = {};
  ranges.forEach(range => {
    groupedUsers[range.name] = [];
  });
  
  users.forEach(user => {
    const id = parseInt(user.id);
    for (const range of ranges) {
      if (id >= range.min && id <= range.max) {
        groupedUsers[range.name].push(user);
        break;
      }
    }
  });
  
  // Randomize within each group
  const randomizedUsers = [];
  ranges.forEach(range => {
    const group = groupedUsers[range.name];
    // Fisher-Yates shuffle
    for (let i = group.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [group[i], group[j]] = [group[j], group[i]];
    }
    randomizedUsers.push(...group);
  });
  
  return randomizedUsers;
}

// Generate card sizes based on some criteria
function assignCardSizes(users) {
  return users.map((user, index) => {
    // Assign different card sizes - some randomness and patterns
    let sizeClass = 'card-1x1';
    
    // Every 5th card is 2x2
    if (index % 5 === 0) {
      sizeClass = 'card-2x2';
    } 
    // Every 7th card is 2x1
    else if (index % 7 === 0) {
      sizeClass = 'card-2x1';
    }
    // Every 11th card is 3x3
    else if (index % 11 === 0) {
      sizeClass = 'card-3x3';
    }
    // Every 3rd card is 1x2
    else if (index % 3 === 0) {
      sizeClass = 'card-1x2';
    }
    
    return {
      ...user,
      sizeClass: sizeClass
    };
  });
}

// Create profile cards
function createProfileCards(users) {
  const container = document.querySelector('.profile-grid');
  container.innerHTML = '';
  
  users.forEach(user => {
    const card = document.createElement('div');
    card.className = `profile-card ${user.sizeClass}`;
    card.dataset.id = user.id;
    card.dataset.fullName = user.fullName;
    
    card.innerHTML = `
      <div class="profile-circle" style="background: hsl(${user.id.slice(-3) * 1.4}, 70%, 40%);">
        <div class="initial">${user.initial}</div>
      </div>
      <div class="profile-tooltip">${user.fullName}</div>
    `;
    
    card.addEventListener('click', () => showUserDetails(user));
    container.appendChild(card);
  });
}

// Show user details in modal
function showUserDetails(user) {
  const modal = document.getElementById('user-modal');
  const modalContent = document.querySelector('.modal-content');
  
  // Social links based on user ID (example: Facebook, Telegram, X, YouTube, TikTok, GitHub)
  const id = user.id;
  const socialLinks = [
    { icon: 'fa-brands fa-telegram', label: 'Telegram', url: `https://t.me/${id}` },
    { icon: 'fa-brands fa-x-twitter', label: 'X/Twitter', url: `https://x.com/${id}` },
    { icon: 'fa-brands fa-youtube', label: 'YouTube', url: `https://youtube.com/@${id}` },
    { icon: 'fa-brands fa-tiktok', label: 'TikTok', url: `https://www.tiktok.com/@${id}` },
    { icon: 'fa-brands fa-github', label: 'GitHub', url: `https://github.com/${id}` },
  ];
  modalContent.innerHTML = `
    <button class="modal-close">&times;</button>
    <div class="profile-detail">
      <div class="profile-detail-circle" style="background: hsl(${user.id.slice(-3) * 1.4}, 70%, 40%);">
        <div class="initial">${user.initial}</div>
      </div>
      <h2 class="profile-detail-name">${user.firstName}</h2>
      <p class="profile-detail-fullname">${user.fullName}</p>
      <div class="profile-detail-info">
        <p><span class="label">ID:</span> ${user.id}</p>
        <p><span class="label">Gender:</span> ${user.gender || 'Not specified'}</p>
      </div>
      <div class="profile-social-icons">
        ${socialLinks.map(s => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}"><i class="${s.icon}"></i></a>`).join('')}
      </div>
    </div>
  `;
  
  modal.classList.add('active');
  
  // Add close event
  modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.classList.remove('active');
  });
  
  // Close when clicking outside content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

// Filter users based on search term
function filterUsers(users, searchTerm) {
  if (!searchTerm) return users;
  
  const term = searchTerm.toLowerCase().trim();
  
  // Check if search term is a number (ID search)
  if (/^\d+$/.test(term)) {
    return users.filter(user => user.id.includes(term));
  }
  
  // Name search (partial match)
  return users.filter(user => 
    user.fullName.toLowerCase().includes(term) || 
    user.firstName.toLowerCase().includes(term)
  );
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Parse and process user data
  let users = parseUserData(userData);
  users = partitionAndRandomize(users);
  users = assignCardSizes(users);
  
  // Store original user list
  const originalUsers = [...users];
  
  // Create initial profile cards
  createProfileCards(users);
  
  // Add search functionality
  const searchInput = document.querySelector('.ordinari-search input');
  searchInput.addEventListener('input', (e) => {
    const filteredUsers = filterUsers(originalUsers, e.target.value);
    createProfileCards(filteredUsers);
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.getElementById('user-modal').classList.remove('active');
    }
  });
});