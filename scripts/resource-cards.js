// Add card color classes for cycling
const cardColors = ['coCard1', 'coCard2', 'coCard3'];

// Filter by multiple categories with prioritization
function filterByCategories(selectedCategories) {
  console.log('=== FILTER BY CATEGORIES ===');
  console.log('Input:', selectedCategories);
  console.log('Type:', typeof selectedCategories);
  console.log('Is array:', Array.isArray(selectedCategories));
  
  if (!selectedCategories || selectedCategories.length === 0 || selectedCategories.includes('')) {
    console.log('NO CATEGORIES - RETURNING ALL IN RANDOM ORDER');
    const shuffled = shuffleArray(resources);
    console.log('Returning', shuffled.length, 'shuffled resources');
    return shuffled;
  }
  
  // Limit to maximum 2 categories
  if (selectedCategories.length > 2) {
    selectedCategories = selectedCategories.slice(0, 2);
    console.log('LIMITED TO 2 CATEGORIES:', selectedCategories);
  }
  
  const matchingResources = [];
  const partialMatchResources = [];
  const nonMatchingResources = [];
  
  console.log('Processing', resources.length, 'total resources...');
  
  for (let i = 0; i < resources.length; i++) {
    const resource = resources[i];
    const resourceCategories = resource.categories || [];
    
    // Count how many selected categories this resource matches
    const matchCount = selectedCategories.filter(cat => resourceCategories.includes(cat)).length;
    
    if (matchCount === selectedCategories.length) {
      // Matches all selected categories - highest priority
      matchingResources.push(resource);
      console.log('FULL MATCH:', resource.title, 'categories:', resourceCategories.join(', '));
    } else if (matchCount > 0) {
      // Matches some selected categories - medium priority
      partialMatchResources.push(resource);
      console.log('PARTIAL MATCH:', resource.title, 'matches', matchCount, 'categories');
    } else {
      // No matches - lowest priority
      nonMatchingResources.push(resource);
    }
  }
  
  // Combine results with matching cards at the top
  const prioritizedResults = [
    ...shuffleArray(matchingResources),
    ...shuffleArray(partialMatchResources),
    ...shuffleArray(nonMatchingResources)
  ];
  
  console.log('RESULTS SUMMARY:', {
    fullMatches: matchingResources.length,
    partialMatches: partialMatchResources.length,
    nonMatches: nonMatchingResources.length,
    total: prioritizedResults.length
  });
  
  return prioritizedResults;
}

function renderCards(categories = []) {
  console.log('=== RENDER CARDS CALLED ===');
  console.log('Input categories:', categories);
  console.log('Categories type:', typeof categories);
  console.log('Categories is array:', Array.isArray(categories));
  
  const grid = document.getElementById('resourceGrid');
  if (!grid) {
    console.log('❌ NO GRID FOUND!');
    return;
  }
  
  const filtered = filterByCategories(categories);
  console.log('Filtered results:', filtered.length);
  
  grid.innerHTML = '';
  
  if (filtered.length === 0 && categories.length > 0 && !categories.includes('')) {
    grid.innerHTML = '<div style="color: white; text-align: center; grid-column: 1/-1;">No resources found for the selected categories</div>';
    return;
  }
  
  filtered.forEach((res, i) => {
    const colorClass = cardColors[i % cardColors.length];
    const card = document.createElement('div');
    card.className = `card resource-card ${colorClass}`;
    
    // Add visual indicator for matching cards
    let matchIndicator = '';
    if (categories.length > 0 && !categories.includes('')) {
      const resourceCategories = res.categories || [];
      const matchCount = categories.filter(cat => resourceCategories.includes(cat)).length;
      
      if (matchCount === categories.length) {
        matchIndicator = '<div class="match-indicator full-match">★ Perfect Match</div>';
      } else if (matchCount > 0) {
        matchIndicator = '<div class="match-indicator partial-match">◐ Partial Match</div>';
      }
    }
    
    card.innerHTML = `
      ${matchIndicator}
      <h3>${res.title}</h3>
      <p>${res.description}</p>
      <div class="resource-categories">
        ${(res.categories || []).slice(0,2).map(cat => `<span class='resource-category'>${cat}</span>`).join('')}
      </div>
      <div class="button-container">
        <a href="${res.url}" target="_blank" rel="noopener" class="resource-link">Source</a>
      </div>
    `;
    grid.appendChild(card);
  });
  
  console.log('✅ RENDERED', filtered.length, 'CARDS');
}

// Setup for button-based category filtering
function initFilter() {
  console.log('=== INIT FILTER CALLED ===');
  
  const categoryButtons = document.querySelectorAll('.category-btn');
  if (!categoryButtons.length) {
    console.log('❌ CATEGORY BUTTONS NOT FOUND!');
    return;
  }
  
  console.log('✅ FOUND', categoryButtons.length, 'CATEGORY BUTTONS');
  
  let selectedCategories = [];
  
  categoryButtons.forEach((button, index) => {
    console.log('Setting up button', index, ':', button.getAttribute('data-category'));
    
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      console.log('=== BUTTON CLICKED ===');
      console.log('Category:', category);
      console.log('Button text:', this.textContent);
      
      // Handle "All" button
      if (category === '') {
        console.log('All button clicked - clearing selection');
        selectedCategories = [];
        updateButtonStates(categoryButtons, selectedCategories);
        renderCards([]);
        return;
      }
      
      // Toggle category selection
      if (selectedCategories.includes(category)) {
        // Remove category
        console.log('Removing category:', category);
        selectedCategories = selectedCategories.filter(cat => cat !== category);
      } else {
        // Add category (max 2)
        if (selectedCategories.length < 2) {
          console.log('Adding category:', category);
          selectedCategories.push(category);
        } else {
          console.log('Maximum categories reached');
          alert('Maximum 2 categories can be selected at once.');
          return;
        }
      }
      
      console.log('FINAL SELECTED CATEGORIES:', selectedCategories);
      updateButtonStates(categoryButtons, selectedCategories);
      renderCards(selectedCategories);
    });
  });
  
  console.log('✅ All button listeners added');
}

function updateButtonStates(buttons, selectedCategories) {
  console.log('=== UPDATING BUTTON STATES ===');
  console.log('Selected categories:', selectedCategories);
  
  buttons.forEach(button => {
    const category = button.getAttribute('data-category');
    
    // Remove all state classes
    button.classList.remove('active', 'selected');
    
    if (category === '' && selectedCategories.length === 0) {
      // "All" button is active when no categories selected
      button.classList.add('active');
      console.log('Set "All" button as active');
    } else if (selectedCategories.includes(category)) {
      // Selected category buttons
      button.classList.add('selected');
      console.log('Set button', category, 'as selected');
    }
  });
}

// Shuffle function
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
  console.log('=== DOM LOADED - STARTING INIT ===');
  
  // Add extra delay to ensure everything is ready
  setTimeout(function() {
    console.log('=== DELAYED INITIALIZATION ===');
    
    // First render all cards in random order
    console.log('Step 1: Rendering initial cards...');
    renderCards([]);
    
    // Then setup category filter
    console.log('Step 2: Setting up filter...');
    initFilter();
    
    console.log('=== INITIALIZATION COMPLETE ===');
  }, 1000);
});

// Also try immediate setup
window.addEventListener('load', function() {
  console.log('WINDOW LOADED - BACKUP INIT');
  initSearch();
});

// Resource card data for resource.html
const resources = [
  
  {
    title: "EconGraphs",
    url: "https://econgraphs.org/",
    description: "Interactive economics graphs and visualizations.",
    categories: ["Education", "Visualization", "Economics"]
  },
  {
    title: "Remix Ethereum",
    url: "https://remix.ethereum.org/",
    description: "Ethereum IDE for smart contract development.",
    categories: ["Blockchain", "Development", "Smart Contracts"]
  },
  {
    title: "ExifTool",
    url: "https://exiftool.org/",
    description: "Read, write, and edit meta information in files.",
    categories: ["Tools", "Metadata", "Files"]
  },
  {
    title: "FarmSubsidy",
    url: "https://farmsubsidy.org/",
    description: "European farm subsidy data explorer.",
    categories: ["Data", "Agriculture", "Europe"]
  },
  {
    title: "Follow the Grant",
    url: "https://followthegrant.org/",
    description: "Grant funding transparency platform.",
    categories: ["Transparency", "Funding", "Grants"]
  },
  {
    title: "Godot Engine",
    url: "https://godotengine.org/",
    description: "Open source game development engine.",
    categories: ["Development", "Game Engine", "Open Source"]
  },
  {
    title: "Gold Standard Registry",
    url: "https://registry.goldstandard.org/",
    description: "Climate and development impact registry.",
    categories: ["Climate", "Development", "Registry"]
  },
  {
    title: "RWC Levchin Prize",
    url: "https://rwc.iacr.org/LevchinPrize/",
    description: "Real-world cryptography prize information.",
    categories: ["Cryptography", "Award", "Research"]
  },
  {
    title: "Library of Leaks",
    url: "https://search.libraryofleaks.org/",
    description: "Searchable database of leaked documents.",
    categories: ["OSINT", "Leaks", "Investigation"]
  },
  {
    title: "Aleph OCCRP",
    url: "https://aleph.occrp.org/",
    description: "Investigative data platform.",
    categories: ["OSINT", "Investigation", "Data"]
  },
  {
    title: "Open VSX",
    url: "https://open-vsx.org/",
    description: "Marketplace for VS Code extensions.",
    categories: ["Development", "Marketplace", "Extensions"]
  },
  {
    title: "OpenLibrary",
    url: "https://openlibrary.org/",
    description: "Online library catalog.",
    categories: ["Education", "Library", "Books"]
  },
  {
    title: "OpenSecrets",
    url: "https://www.opensecrets.org/",
    description: "US political finance transparency.",
    categories: ["Transparency", "Finance", "Politics"]
  },
  {
    title: "Prism Break",
    url: "https://prism-break.org/en/all/",
    description: "Privacy-respecting software alternatives.",
    categories: ["Privacy", "Software", "Alternatives"]
  },
  {
    title: "Privacy Tests",
    url: "https://privacytests.org/",
    description: "Browser privacy testing and comparison.",
    categories: ["Privacy", "Browser", "Testing"]
  },
  {
    title: "Starlink Map",
    url: "https://www.starlinkmap.org/",
    description: "Real-time Starlink satellite tracking.",
    categories: ["Satellite", "Tracking", "Space"]
  },
  {
    title: "Terms of Service Didn't Read",
    url: "https://tosdr.org/en",
    description: "Terms of service analysis and ratings.",
    categories: ["Privacy", "Terms", "Analysis"]
  },
  {
    title: "WebSDR",
    url: "http://websdr.org/",
    description: "Web-based software defined radio.",
    categories: ["Radio", "SDR", "Communications"]
  },
  {
    title: "Zoomquilt",
    url: "https://zoomquilt.org/",
    description: "Infinite zoom art experience.",
    categories: ["Art", "Interactive", "Visual"]
  },
  {
    title: "Brand Guide Page",
    url: "https://brandguide.page/",
    description: "Brand guideline examples and resources.",
    categories: ["Design", "Branding", "Guidelines"]
  },
  {
    title: "Carbon",
    url: "https://carbon.now.sh/",
    description: "Beautiful code snippet images generator.",
    categories: ["Development", "Design", "Code"]
  },
  {
    title: "OSINT Shell",
    url: "https://osint.sh/",
    description: "OSINT tools and resources collection.",
    categories: ["OSINT", "Tools", "Investigation"]
  },
  {
    title: "Satellite Map",
    url: "https://satellitemap.space/",
    description: "Real-time satellite tracking map.",
    categories: ["Satellite", "Maps", "Tracking"]
  },
  {
    title: "Follow the Money Tech",
    url: "https://followthemoney.tech/",
    description: "Technology funding transparency platform.",
    categories: ["Transparency", "Technology", "Funding"]
  },
  {
    title: "What Web Can Do",
    url: "https://whatwebcando.today/",
    description: "Web API capabilities showcase.",
    categories: ["Web", "API", "Capabilities"]
  },
  {
    title: "Cobalt Tools",
    url: "https://cobalt.tools/",
    description: "OSINT and cybersecurity tools.",
    categories: ["OSINT", "Cybersecurity", "Tools"]
  },
  {
    title: "Offsec Tools",
    url: "https://offsec.tools/",
    description: "Offensive security tools directory.",
    categories: ["Security", "Offensive", "Directory"]
  },
  {
    title: "WebCode Tools",
    url: "https://webcode.tools/",
    description: "Web development utilities.",
    categories: ["Development", "Web", "Utilities"]
  },
  {
    title: "YTCH.TV",
    url: "https://ytch.tv/",
    description: "YouTube channel browser.",
    categories: ["Media", "YouTube", "Channels"]
  },
  {
    title: "HackTricks Book",
    url: "https://book.hacktricks.wiki/en/index.html",
    description: "Security tricks and techniques.",
    categories: ["Security", "Tricks", "Techniques"]
  },
  {
    title: "Public.Work",
    url: "https://public.work/",
    description: "Public projects and resources.",
    categories: ["Transparency", "Public", "Resources"]
  },
  {
    title: "Awesome Privacy",
    url: "http://awesome-privacy.xyz/",
    description: "Curated privacy resources.",
    categories: ["Privacy", "Curated", "Resources"]
  },
  {
    title: "ODCrawler",
    url: "https://odcrawler.xyz/",
    description: "Open directory crawler.",
    categories: ["OSINT", "Directory", "Crawler"]
  },
  {
    title: "Watch IPTV",
    url: "https://watchiptv.xyz/",
    description: "IPTV streaming platform.",
    categories: ["Media", "IPTV", "Streaming"]
  },
  {
    title: "Web Check",
    url: "https://web-check.xyz/",
    description: "Website analysis and security checker.",
    categories: ["Security", "Analysis", "Web"]
  },
  {
    title: "Illustroke",
    url: "https://illustroke.com/en/generate",
    description: "AI-powered illustration generator.",
    categories: ["AI", "Design", "Illustrations"]
  },
  {
    title: "UI Colors",
    url: "https://uicolors.app/generate/",
    description: "UI color palette generator.",
    categories: ["Design", "Colors", "UI"]
  },
  {
    title: "Footer Design",
    url: "https://www.footer.design/",
    description: "Footer design inspiration.",
    categories: ["Design", "Footer", "Inspiration"]
  },
  {
    title: "Flowbase Illustrations",
    url: "https://www.flowbase.co/illustrations",
    description: "Free illustrations for web projects.",
    categories: ["Design", "Illustrations", "Web"]
  },
  {
    title: "CodeRocket",
    url: "https://www.coderocket.app/",
    description: "Code learning and practice platform.",
    categories: ["Education", "Code", "Learning"]
  },
  {
    title: "Phonetisaurus",
    url: "https://phonetisaurus.netlify.app/",
    description: "Phonetic transcription tool.",
    categories: ["Tools", "Language", "Phonetics"]
  },
  {
    title: "Split Khmer",
    url: "https://split-khmer.netlify.app/",
    description: "Khmer text splitting utility.",
    categories: ["Tools", "Language", "Text"]
  },
  {
    title: "Omatsuri",
    url: "https://omatsuri.app/",
    description: "Collection of developer tools and utilities.",
    categories: ["Development", "Tools", "Utilities"]
  },
  {
    title: "Railway",
    url: "https://railway.app/",
    description: "Cloud platform for deploying applications.",
    categories: ["Cloud", "Deployment", "Platform"]
  },
  {
    title: "Shademap",
    url: "https://shademap.app/",
    description: "Shadow mapping and visualization tool.",
    categories: ["Visualization", "Maps", "Tools"]
  },
  {
    title: "SVGL",
    url: "https://svgl.app/",
    description: "Beautiful SVG logos collection.",
    categories: ["Design", "SVG", "Logos"]
  },
  {
    title: "App Motion Design",
    url: "https://appmotion.design/",
    description: "UI motion design inspiration.",
    categories: ["Design", "Animation", "UI"]
  },
  {
    title: "Cult UI Blocks",
    url: "https://pro.cult-ui.com/blocks",
    description: "Premium UI component blocks.",
    categories: ["Design", "UI", "Components"]
  },
  {
    title: "YouTube Lookup",
    url: "http://youtube-lookup.vercel.app/",
    description: "YouTube channel and video lookup tool.",
    categories: ["Tools", "YouTube", "OSINT"]
  },
  {
    title: "Design Systems Surf",
    url: "https://designsystems.surf/",
    description: "Curated design systems gallery.",
    categories: ["Design", "Systems", "Gallery"]
  },
  {
    title: "Cloudscape Design",
    url: "https://cloudscape.design/",
    description: "AWS design system components.",
    categories: ["Design", "AWS", "Components"]
  },
  {
    title: "Logggos Club",
    url: "https://www.logggos.club/",
    description: "Logo design inspiration gallery.",
    categories: ["Design", "Logos", "Inspiration"]
  },
  {
    title: "Clip Cafe",
    url: "https://clip.cafe/",
    description: "Video clip discovery platform.",
    categories: ["Media", "Video", "Discovery"]
  },
  {
    title: "Hugging Face Models",
    url: "https://huggingface.co/models",
    description: "Machine learning model repository.",
    categories: ["AI", "Machine Learning", "Models"]
  },
  {
    title: "Binary Domain",
    url: "https://010000010110110001101001011000110110100101100001.com/",
    description: "Binary-themed web experience.",
    categories: ["Fun", "Binary", "Interactive"]
  },
  {
    title: "Admire the Web",
    url: "https://admiretheweb.com/",
    description: "Web design inspiration showcase.",
    categories: ["Design", "Web", "Inspiration"]
  },
  {
    title: "Adobe Spectrum",
    url: "https://spectrum.adobe.com/",
    description: "Adobe's design system.",
    categories: ["Design", "System", "Adobe"]
  },
  {
    title: "Shader Gradient",
    url: "https://www.shadergradient.co/",
    description: "3D gradient generator.",
    categories: ["Design", "Gradient", "3D"]
  },
  {
    title: "AEM1K",
    url: "https://aem1k.com/",
    description: "Creative coding experiments.",
    categories: ["Development", "Creative", "Experiments"]
  },
  {
    title: "Code Blocks",
    url: "https://www.alexwforsythe.com/code-blocks/",
    description: "Beautiful code block styling.",
    categories: ["Development", "Design", "Code"]
  },
  {
    title: "AnalyzeID Username",
    url: "https://analyzeid.com/username/",
    description: "Username analysis across platforms.",
    categories: ["OSINT", "Username", "Investigation"]
  },
  {
    title: "Answer The Public",
    url: "https://answerthepublic.com/",
    description: "Search insights and keyword research.",
    categories: ["SEO", "Research", "Keywords"]
  },
  {
    title: "AutoDraw",
    url: "https://autodraw.com/",
    description: "AI-powered drawing assistant.",
    categories: ["AI", "Drawing", "Design"]
  },
  {
    title: "BMJ Medical Journal",
    url: "https://www.bmj.com/",
    description: "British Medical Journal.",
    categories: ["Medical", "Research", "Journal"]
  },
  {
    title: "Chrome Experiments Stars",
    url: "https://stars.chromeexperiments.com/",
    description: "Interactive star field experiment.",
    categories: ["Interactive", "Experiment", "Visualization"]
  },
  {
    title: "CSS Generators",
    url: "https://css-generators.com/",
    description: "Collection of CSS generators.",
    categories: ["Development", "CSS", "Generators"]
  },
  {
    title: "CybDetective Archive Search",
    url: "https://cybdetective.com/quickcacheandarhivesearch.html",
    description: "Quick cache and archive search tool.",
    categories: ["OSINT", "Archive", "Search"]
  },
  {
    title: "DBMS Tools",
    url: "https://dbmstools.com/",
    description: "Database management tools.",
    categories: ["Database", "Tools", "Management"]
  },
  {
    title: "DDoSecrets",
    url: "https://ddosecrets.com/",
    description: "Transparency collective data leaks.",
    categories: ["Transparency", "Data", "Leaks"]
  },
  {
    title: "Design System Cookbooks",
    url: "https://designsystemcookbooks.com/",
    description: "Design system implementation guides.",
    categories: ["Design", "System", "Guides"]
  },
  {
    title: "DorkGPT",
    url: "https://www.dorkgpt.com/",
    description: "AI-powered Google dorking.",
    categories: ["OSINT", "AI", "Dorking"]
  },
  {
    title: "Tech on the Net",
    url: "https://www.techonthenet.com/index.php",
    description: "Programming tutorials and references.",
    categories: ["Education", "Programming", "Tutorials"]
  },
  {
    title: "Dork Search",
    url: "https://dorksearch.com/",
    description: "Google dork search engine.",
    categories: ["OSINT", "Search", "Dorking"]
  },
  {
    title: "eLibrary Rule",
    url: "http://elibrary-rule.com/",
    description: "Digital library resources.",
    categories: ["Education", "Library", "Resources"]
  },
  {
    title: "Excalidraw",
    url: "https://excalidraw.com/",
    description: "Virtual whiteboard for sketching.",
    categories: ["Tools", "Drawing", "Collaboration"]
  },
  {
    title: "Exploit Database",
    url: "https://www.exploit-db.com/",
    description: "Exploit and vulnerability database.",
    categories: ["Security", "Exploits", "Database"]
  },
  {
    title: "Fagan Finder",
    url: "https://www.faganfinder.com/",
    description: "Search engine directory.",
    categories: ["Search", "Directory", "OSINT"]
  },
  {
    title: "Failory Google",
    url: "https://www.failory.com/google",
    description: "Google algorithm updates tracker.",
    categories: ["SEO", "Google", "Analytics"]
  },
  {
    title: "Fake Image Detector",
    url: "https://www.fakeimagedetector.com/",
    description: "AI-generated image detection.",
    categories: ["AI", "Detection", "Images"]
  },
  {
    title: "Forensic OSINT",
    url: "https://forensicosint.com/",
    description: "Digital forensics and OSINT resources.",
    categories: ["Forensics", "OSINT", "Investigation"]
  },
  {
    title: "Photon GitHub",
    url: "https://github.com/s0md3v/Photon",
    description: "Fast web crawler for OSINT.",
    categories: ["OSINT", "Crawler", "GitHub"]
  },
  {
    title: "FOCA GitHub",
    url: "https://github.com/ElevenPaths/FOCA",
    description: "Document metadata analysis tool.",
    categories: ["OSINT", "Metadata", "GitHub"]
  },
  {
    title: "sn0int GitHub",
    url: "https://github.com/kpcyrd/sn0int",
    description: "Semi-automatic OSINT framework.",
    categories: ["OSINT", "Framework", "GitHub"]
  },
  {
    title: "OneDorkForAll",
    url: "https://github.com/HackShiv/OneDorkForAll",
    description: "Google dorking automation tool.",
    categories: ["OSINT", "Dorking", "GitHub"]
  },
  {
    title: "InfoSec Dorks",
    url: "https://github.com/spekulatius/infosec-dorks",
    description: "Information security Google dorks.",
    categories: ["Security", "Dorking", "GitHub"]
  },
  {
    title: "Security Mindmap",
    url: "https://github.com/Ignitetechnologies/Mindmap/tree/main",
    description: "Cybersecurity knowledge mindmap.",
    categories: ["Security", "Mindmap", "GitHub"]
  },
  {
    title: "OSINT Cheatsheets",
    url: "https://github.com/cipher387/cheatsheets?tab=readme-ov-file#mini-geoint",
    description: "OSINT and GEOINT cheatsheets.",
    categories: ["OSINT", "Cheatsheet", "GitHub"]
  },
  {
    title: "JavaScript Algorithms",
    url: "https://github.com/trekhleb/javascript-algorithms",
    description: "Algorithms and data structures in JavaScript.",
    categories: ["Education", "JavaScript", "Algorithms"]
  },
  {
    title: "ChatGPT Voice Saver",
    url: "https://chromewebstore.google.com/detail/save-the-chatgpt-voice/mnlfmhioejkdnoeeoeepjodagdmglgmh",
    description: "Chrome extension to save ChatGPT voice.",
    categories: ["Chrome", "Extension", "AI"]
  },
  {
    title: "Fast Save Repost",
    url: "https://chromewebstore.google.com/detail/fast-save-and-repost-for/olenolhfominlkfmlkolcahemogebpcj",
    description: "Chrome extension for quick social media saves.",
    categories: ["Chrome", "Extension", "Social"]
  },
  {
    title: "Facebook All in One",
    url: "https://chromewebstore.google.com/detail/facebook-all-in-one/ncncagnhhigemlgiflfgdhcdpipadmmm",
    description: "Chrome extension for Facebook management.",
    categories: ["Chrome", "Extension", "Facebook"]
  },
  {
    title: "Google Scholar Profile",
    url: "https://scholar.google.com/citations?user=HcO_fhsAAAAJ&hl=en",
    description: "Academic research profile.",
    categories: ["Research", "Academic", "Profile"]
  },
  {
    title: "Google Apps Toolbox",
    url: "https://toolbox.googleapps.com/apps/main/",
    description: "Google Workspace troubleshooting tools.",
    categories: ["Google", "Tools", "Workspace"]
  },
  {
    title: "Google Screen Recorder",
    url: "https://toolbox.googleapps.com/apps/screen_recorder/",
    description: "Google's screen recording tool.",
    categories: ["Google", "Tools", "Recording"]
  },
  {
    title: "GTmetrix",
    url: "https://gtmetrix.com/",
    description: "Website performance analysis.",
    categories: ["Performance", "Analysis", "Web"]
  },
  {
    title: "Hack the Logs",
    url: "https://www.hackthelogs.com/mainpage.html",
    description: "Log analysis and cybersecurity.",
    categories: ["Security", "Logs", "Analysis"]
  },
  {
    title: "Information Laundromat",
    url: "https://informationlaundromat.com/",
    description: "Data investigation platform.",
    categories: ["Investigation", "Data", "Platform"]
  },
  {
    title: "Instant Street View",
    url: "https://instantstreetview.com/",
    description: "Quick Google Street View access.",
    categories: ["Maps", "Street View", "Tools"]
  },
  {
    title: "JS Operator Lookup",
    url: "https://www.joshwcomeau.com/operator-lookup?match=subtraction-assignment",
    description: "JavaScript operator reference.",
    categories: ["JavaScript", "Reference", "Operators"]
  },
  {
    title: "Kaggle Datasets",
    url: "https://www.kaggle.com/datasets",
    description: "Machine learning datasets.",
    categories: ["Data", "Machine Learning", "Datasets"]
  },
  {
    title: "Dash Documentation",
    url: "https://www.kapeli.com/dash",
    description: "API documentation browser.",
    categories: ["Development", "Documentation", "API"]
  },
  {
    title: "Killed by Google",
    url: "https://killedbygoogle.com/",
    description: "Google's discontinued products graveyard.",
    categories: ["Google", "History", "Products"]
  },
  {
    title: "KodeKloud Linux Labs",
    url: "https://kodekloud.com/free-labs/linux",
    description: "Free Linux hands-on labs.",
    categories: ["Education", "Linux", "Labs"]
  },
  {
    title: "Krubkrong",
    url: "https://krubkrong.com/",
    description: "Thai language learning resources.",
    categories: ["Education", "Language", "Thai"]
  },
  {
    title: "Library RAC eBooks",
    url: "https://ebooks.libraryrac.com/",
    description: "Digital book library.",
    categories: ["Education", "eBooks", "Library"]
  },
  {
    title: "Linux Command Library",
    url: "https://linuxcommandlibrary.com/",
    description: "Comprehensive Linux command reference.",
    categories: ["Linux", "Commands", "Reference"]
  },
  {
    title: "Linux Journey",
    url: "https://linuxjourney.com/",
    description: "Interactive Linux learning platform.",
    categories: ["Education", "Linux", "Interactive"]
  },
  {
    title: "Live UA Map Asia",
    url: "https://asia.liveuamap.com/",
    description: "Real-time conflict and news map.",
    categories: ["Maps", "News", "Real-time"]
  },
  {
    title: "Lumpy Soft",
    url: "https://lumpysoft.com/",
    description: "Software tools and utilities.",
    categories: ["Tools", "Software", "Utilities"]
  },
  {
    title: "Managing AI Risks",
    url: "https://managing-ai-risks.com/",
    description: "AI risk management resources.",
    categories: ["AI", "Risk", "Management"]
  },
  {
    title: "Meta Sketch",
    url: "https://sketch.metademolab.com/",
    description: "AI-powered sketching tool.",
    categories: ["AI", "Drawing", "Meta"]
  },
  {
    title: "NgxPageSpeed Build Guide",
    url: "https://www.modpagespeed.com/doc/build_ngx_pagespeed_from_source",
    description: "Nginx PageSpeed module build guide.",
    categories: ["Performance", "Nginx", "Guide"]
  },
  {
    title: "Observable HQ",
    url: "https://observablehq.com/",
    description: "Data visualization notebooks.",
    categories: ["Data", "Visualization", "Notebooks"]
  },
  {
    title: "OSINT Framework",
    url: "https://osintframework.com/",
    description: "Comprehensive OSINT tool collection.",
    categories: ["OSINT", "Framework", "Tools"]
  },
  {
    title: "Papers With Code",
    url: "https://paperswithcode.com/",
    description: "Machine learning papers with code.",
    categories: ["Research", "Machine Learning", "Papers"]
  },
  {
    title: "Pentest Tools Google Hacking",
    url: "https://pentest-tools.com/information-gathering/google-hacking",
    description: "Google hacking database for pentesters.",
    categories: ["Security", "Pentest", "Google"]
  },
  {
    title: "PimEyes",
    url: "https://pimeyes.com/",
    description: "Facial recognition search engine.",
    categories: ["OSINT", "Facial Recognition", "Search"]
  },
  {
    title: "Pranx",
    url: "https://pranx.com/",
    description: "Fake screen pranks collection.",
    categories: ["Fun", "Pranks", "Fake"]
  },
  {
    title: "PulseDive",
    url: "https://pulsedive.com/",
    description: "Threat intelligence platform.",
    categories: ["Security", "Threat Intelligence", "OSINT"]
  },
  {
    title: "Raycast",
    url: "https://raycast.com/",
    description: "Productivity launcher for Mac.",
    categories: ["Productivity", "Mac", "Launcher"]
  },
  {
    title: "Real Python",
    url: "https://realpython.com/",
    description: "Python tutorials and learning resources.",
    categories: ["Education", "Python", "Tutorials"]
  },
  {
    title: "Reason and Meaning",
    url: "https://reasonandmeaning.com/",
    description: "Philosophy and logic resources.",
    categories: ["Philosophy", "Logic", "Education"]
  },
  {
    title: "Regex101",
    url: "https://regex101.com/",
    description: "Regular expression testing and debugging.",
    categories: ["Development", "Regex", "Testing"]
  },
  {
    title: "Shadcn UI",
    url: "https://shadcn.com/",
    description: "Modern React UI components.",
    categories: ["Development", "React", "UI"]
  },
  {
    title: "Signaturely Draw",
    url: "https://signaturely.com/online-signature/draw/",
    description: "Online signature drawing tool.",
    categories: ["Tools", "Signature", "Online"]
  },
  {
    title: "Site Inspire",
    url: "https://www.siteinspire.com/",
    description: "Web design inspiration showcase.",
    categories: ["Design", "Web", "Inspiration"]
  },
  {
    title: "Sites Like",
    url: "https://m.siteslike.com/",
    description: "Find similar websites to any site.",
    categories: ["Discovery", "Websites", "Similar"]
  },
  {
    title: "SQLpd",
    url: "https://sqlpd.com/",
    description: "SQL practice and learning platform.",
    categories: ["Education", "SQL", "Database"]
  },
  {
    title: "Interface in Game",
    url: "https://interfaceingame.com/",
    description: "Video game UI design gallery.",
    categories: ["Design", "Gaming", "UI"]
  },
  {
    title: "Checklist Design",
    url: "https://www.checklist.design/",
    description: "Design checklists and best practices.",
    categories: ["Design", "Checklist", "Best Practices"]
  },
  {
    title: "SS64 Command Reference",
    url: "https://ss64.com/",
    description: "Command line reference for all platforms.",
    categories: ["Reference", "Command Line", "Documentation"]
  },
  {
    title: "Submarine Cable Map",
    url: "http://submarinecablemap.com/",
    description: "Interactive map of submarine internet cables.",
    categories: ["Maps", "Internet", "Infrastructure"]
  },
  {
    title: "CD Text Files",
    url: "http://cd.textfiles.com/directory.html",
    description: "Archive of historical CD-ROM collections.",
    categories: ["Archive", "History", "Software"]
  },
  {
    title: "The Algorithms",
    url: "https://the-algorithms.com/",
    description: "Algorithm implementations in multiple languages.",
    categories: ["Education", "Algorithms", "Programming"]
  },
  {
    title: "The Useless Web",
    url: "https://theuselessweb.com/",
    description: "Random useless websites for entertainment.",
    categories: ["Fun", "Random", "Entertainment"]
  },
  {
    title: "They See Your Photos",
    url: "https://theyseeyourphotos.com/",
    description: "Photo metadata privacy awareness tool.",
    categories: ["Privacy", "Metadata", "Photos"]
  },
  {
    title: "TikTok Profile",
    url: "https://tiktok.com/@eirsvi",
    description: "Personal TikTok profile.",
    categories: ["Social", "TikTok", "Profile"]
  },
  {
    title: "Top 1000 Repos",
    url: "https://top1000repos.com/",
    description: "Most popular GitHub repositories.",
    categories: ["GitHub", "Popular", "Repositories"]
  },
  {
    title: "Understanding Accessibility",
    url: "https://www.understandingaccessibility.com/",
    description: "Web accessibility learning resource.",
    categories: ["Accessibility", "Education", "Web"]
  },
  {
    title: "Wheel of Names",
    url: "https://wheelofnames.com/",
    description: "Random name picker wheel tool.",
    categories: ["Tools", "Random", "Names"]
  },
  {
    title: "Who Is In Space",
    url: "http://whoisinspace.com/",
    description: "Current astronauts in space tracker.",
    categories: ["Space", "Astronauts", "Tracker"]
  },
  {
    title: "Google AI Music FX",
    url: "https://aitestkitchen.withgoogle.com/tools/music-fx",
    description: "AI-powered music generation tool.",
    categories: ["AI", "Music", "Google"]
  },
  {
    title: "A to Z of AI",
    url: "https://atozofai.withgoogle.com/",
    description: "Comprehensive AI terminology guide.",
    categories: ["AI", "Education", "Google"]
  },
  {
    title: "Google Experiments",
    url: "https://experiments.withgoogle.com/experiments",
    description: "Interactive technology experiments.",
    categories: ["Experiments", "Interactive", "Google"]
  },
  {
    title: "Google Partners Directory",
    url: "https://partnersdirectory.withgoogle.com/?premier=true",
    description: "Google Premier Partners directory.",
    categories: ["Google", "Partners", "Directory"]
  },
  {
    title: "Prebunking",
    url: "https://prebunking.withgoogle.com/",
    description: "Misinformation prebunking initiative.",
    categories: ["Education", "Misinformation", "Google"]
  },
  {
    title: "Quick Draw",
    url: "http://quickdraw.withgoogle.com/",
    description: "AI guessing game for drawings.",
    categories: ["AI", "Game", "Google"]
  },
  {
    title: "Reader Revenue",
    url: "https://readerrevenue.withgoogle.com/",
    description: "Publisher revenue optimization tools.",
    categories: ["Publishing", "Revenue", "Google"]
  },
  {
    title: "Visual Blocks",
    url: "https://visualblocks.withgoogle.com/#/",
    description: "Visual programming interface.",
    categories: ["Programming", "Visual", "Google"]
  },
  {
    title: "Unknown Cheats",
    url: "https://www.unknowncheats.me/forum/index.php",
    description: "Game hacking and reverse engineering forum.",
    categories: ["Gaming", "Hacking", "Forum"]
  },
  {
    title: "Unicode Domain",
    url: "https://xn--j2e7beiw1lb2hqg.com/",
    description: "Unicode domain demonstration.",
    categories: ["Unicode", "Domain", "Demo"]
  },
  {
    title: "YouTube Channel",
    url: "https://youtube.com/@eirsvi",
    description: "Personal YouTube channel.",
    categories: ["Social", "YouTube", "Profile"]
  },
  {
    title: "Lazarus Reports",
    url: "https://lazarus.day/reports/",
    description: "Cybersecurity threat intelligence reports.",
    categories: ["Security", "Threat Intelligence", "Reports"]
  },
  {
    title: "Exit Node",
    url: "https://exitno.de/",
    description: "Tor exit node information.",
    categories: ["Privacy", "Tor", "Network"]
  },
  {
    title: "IP Calculator",
    url: "https://jodies.de/ipcalc",
    description: "IP address calculator and subnet tool.",
    categories: ["Networking", "IP", "Calculator"]
  },
  {
    title: "Iconify Icon Sets",
    url: "https://icon-sets.iconify.design/",
    description: "Comprehensive icon set collection.",
    categories: ["Design", "Icons", "Collection"]
  },
  {
    title: "ContainerLab",
    url: "https://containerlab.dev/",
    description: "Network topology containerization tool.",
    categories: ["Networking", "Containers", "Topology"]
  },
  {
    title: "MKQL Deno",
    url: "https://mkql.deno.dev/",
    description: "Deno-based query language tool.",
    categories: ["Development", "Deno", "Query"]
  },
  {
    title: "GeoHints",
    url: "https://geohints.com/",
    description: "Geography guessing game hints.",
    categories: ["Geography", "Game", "Hints"]
  },
  {
    title: "Tiny Helpers",
    url: "https://tiny-helpers.dev/latest",
    description: "Collection of useful web dev tools.",
    categories: ["Development", "Tools", "Web"]
  },
  {
    title: "SOAR Earth",
    url: "https://soar.earth/",
    description: "Satellite imagery and earth observation.",
    categories: ["Satellite", "Earth", "Imagery"]
  },
  {
    title: "Open Security Data",
    url: "https://opensecuritydata.eu/",
    description: "Open source security data platform.",
    categories: ["Security", "Data", "Open Source"]
  },
  {
    title: "The Eye Archive",
    url: "https://the-eye.eu/",
    description: "Digital preservation archive.",
    categories: ["Archive", "Preservation", "Data"]
  },
  {
    title: "Game Theory Games",
    url: "https://www.zweigmedia.com/RealWorld/gametheory/games.html",
    description: "Interactive game theory simulations.",
    categories: ["Education", "Game Theory", "Interactive"]
  },
  {
    title: "Neal Fun",
    url: "https://neal.fun/",
    description: "Collection of interactive web experiments.",
    categories: ["Fun", "Interactive", "Experiments"]
  },
  {
    title: "OG Image Gallery",
    url: "https://www.ogimage.gallery/",
    description: "Open Graph image inspiration gallery.",
    categories: ["Design", "Social Media", "Images"]
  },
  {
    title: "NASA Mars Real-time",
    url: "https://eyes.nasa.gov/apps/mrn/#/mars",
    description: "Real-time Mars exploration visualization.",
    categories: ["Space", "Mars", "NASA"]
  },
  {
    title: "FaceCheck ID",
    url: "http://facecheck.id/",
    description: "Facial recognition search engine.",
    categories: ["OSINT", "Facial Recognition", "Search"]
  },
  {
    title: "Crypto Papers",
    url: "https://cryptopapers.info/",
    description: "Cryptocurrency research papers.",
    categories: ["Cryptocurrency", "Research", "Papers"]
  },
  {
    title: "Whole Earth Info",
    url: "https://wholeearth.info/",
    description: "Earth system science information.",
    categories: ["Earth Science", "Information", "Research"]
  },
  {
    title: "Censys Search",
    url: "https://search.censys.io/",
    description: "Internet-wide security scanning platform.",
    categories: ["Security", "Scanning", "OSINT"]
  },
  {
    title: "Element Matrix",
    url: "https://element.io/",
    description: "Secure messaging and collaboration.",
    categories: ["Communication", "Security", "Matrix"]
  },
  {
    title: "Find Email",
    url: "https://findemail.io/",
    description: "Email address finding tool.",
    categories: ["OSINT", "Email", "Search"]
  },
  {
    title: "GitHub Map",
    url: "https://anvaka.github.io/map-of-github/#2/0/0",
    description: "Interactive map of GitHub repositories.",
    categories: ["GitHub", "Visualization", "Map"]
  },
  {
    title: "Cipher387 Tools",
    url: "https://cipher387.github.io/",
    description: "OSINT tools and resources collection.",
    categories: ["OSINT", "Tools", "Collection"]
  },
  {
    title: "Movies for Hackers",
    url: "https://entozoon.github.io/movies-for-hackers/",
    description: "Curated list of hacker movies.",
    categories: ["Movies", "Hacking", "Entertainment"]
  },
  {
    title: "OSINT Cheat Sheet",
    url: "https://jieyab89.github.io/OSINT-Cheat-sheet/Web-Based/",
    description: "Web-based OSINT tools cheat sheet.",
    categories: ["OSINT", "Cheatsheet", "Web"]
  },
  {
    title: "AI for Beginners",
    url: "https://microsoft.github.io/AI-For-Beginners/",
    description: "Microsoft's AI learning curriculum.",
    categories: ["AI", "Education", "Microsoft"]
  },
  {
    title: "FossFLOW",
    url: "https://stan-smith.github.io/FossFLOW/",
    description: "Free and open source software workflow.",
    categories: ["FOSS", "Workflow", "Open Source"]
  },
  {
    title: "GreyNoise Visualizer",
    url: "https://viz.greynoise.io/",
    description: "Internet noise visualization tool.",
    categories: ["Security", "Visualization", "Network"]
  },
  {
    title: "Hoppscotch",
    url: "https://hoppscotch.io/",
    description: "Open source API development ecosystem.",
    categories: ["API", "Development", "Open Source"]
  },
  {
    title: "Investigative Data",
    url: "https://investigativedata.io/",
    description: "Data tools for investigative journalism.",
    categories: ["Investigation", "Data", "Journalism"]
  },
  {
    title: "IP Geolocation",
    url: "https://ipgeolocation.io/",
    description: "IP address geolocation API service.",
    categories: ["Geolocation", "IP", "API"]
  },
  {
    title: "K3s Kubernetes",
    url: "https://k3s.io/",
    description: "Lightweight Kubernetes distribution.",
    categories: ["Kubernetes", "Containers", "DevOps"]
  },
  {
    title: "Keyword Tool",
    url: "https://keywordtool.io/",
    description: "Keyword research and SEO tool.",
    categories: ["SEO", "Keywords", "Research"]
  },
  {
    title: "LabEx Linux",
    url: "https://labex.io/learn/linux",
    description: "Interactive Linux learning labs.",
    categories: ["Education", "Linux", "Interactive"]
  },
  {
    title: "Nuclei Scanner",
    url: "https://nuclei.projectdiscovery.io/",
    description: "Fast vulnerability scanner.",
    categories: ["Security", "Vulnerability", "Scanner"]
  },
  {
    title: "Shodan",
    url: "https://www.shodan.io/",
    description: "Internet-connected device search engine.",
    categories: ["OSINT", "IoT", "Search"]
  },
  {
    title: "TTS IDRI Cambodia",
    url: "https://tts.idri.edu.kh/",
    description: "Text-to-speech for Khmer language.",
    categories: ["TTS", "Khmer", "Language"]
  },
  {
    title: "Open Data Cambodia",
    url: "http://oda.cdc.gov.kh/",
    description: "Cambodia open data portal.",
    categories: ["Data", "Cambodia", "Government"]
  },
  {
    title: "eLibrary MAFF Cambodia",
    url: "https://elibrary.maff.gov.kh/",
    description: "Cambodia agriculture ministry library.",
    categories: ["Library", "Agriculture", "Cambodia"]
  },
  {
    title: "NCDD Database Cambodia",
    url: "https://db.ncdd.gov.kh/",
    description: "Cambodia decentralization database.",
    categories: ["Database", "Government", "Cambodia"]
  },
  {
    title: "Prisoner's Dilemma",
    url: "http://www.prisoners-dilemma.com/#java",
    description: "Interactive prisoner's dilemma game.",
    categories: ["Game Theory", "Interactive", "Education"]
  },
  {
    title: "Moblab Games",
    url: "https://www.moblab.com/edu/games/catalog/all",
    description: "Educational economics games.",
    categories: ["Education", "Economics", "Games"]
  },
  {
    title: "Browser LOL",
    url: "https://browser.lol/",
    description: "Browser compatibility testing tool.",
    categories: ["Development", "Browser", "Testing"]
  },
  {
    title: "Hunchly",
    url: "https://www.hunch.ly/",
    description: "Web capture tool for investigations.",
    categories: ["Investigation", "OSINT", "Capture"]
  },
  {
    title: "Vibe Check Market",
    url: "https://vibecheck.market/",
    description: "Market sentiment analysis tool.",
    categories: ["Finance", "Sentiment", "Analysis"]
  },
  {
    title: "KYC Not Me",
    url: "https://kycnot.me/",
    description: "Privacy-focused service directory.",
    categories: ["Privacy", "KYC", "Directory"]
  },
  {
    title: "Trust Game",
    url: "https://ncase.me/trust/",
    description: "Interactive game about trust and cooperation.",
    categories: ["Game Theory", "Trust", "Interactive"]
  },
  {
    title: "OSINT Swiss Army Knife",
    url: "https://start.me/p/QLjzR2/osint-switzerland-army-knife",
    description: "Comprehensive OSINT resource collection.",
    categories: ["OSINT", "Resources", "Collection"]
  },
  {
    title: "Telegram Profile",
    url: "https://t.me/eirsvi",
    description: "Personal Telegram profile.",
    categories: ["Social", "Telegram", "Profile"]
  },
  {
    title: "Portainer Templates",
    url: "https://portainer-templates.as93.net/",
    description: "Docker container templates for Portainer.",
    categories: ["Docker", "Containers", "Templates"]
  },
  {
    title: "Brand Guidelines",
    url: "https://brandguidelines.net/",
    description: "Collection of brand style guides.",
    categories: ["Design", "Branding", "Guidelines"]
  },
  {
    title: "FMHY",
    url: "https://fmhy.net/",
    description: "Free media and resources directory.",
    categories: ["Resources", "Media", "Free"]
  },
  {
    title: "Game Theory Net",
    url: "https://gametheory.net/",
    description: "Game theory resources and tools.",
    categories: ["Game Theory", "Education", "Resources"]
  },
  {
    title: "GeoTips",
    url: "https://geotips.net/",
    description: "Geography learning tips and tricks.",
    categories: ["Geography", "Education", "Tips"]
  },
  {
    title: "NirSoft Utilities",
    url: "https://nirsoft.net/",
    description: "Collection of Windows utilities.",
    categories: ["Windows", "Utilities", "Tools"]
  },
  {
    title: "OSINT Knowledge Base",
    url: "https://knowledgebase.plessas.net/OSINT-Feeds-159ccea41cfa808694c2d7245be8f841",
    description: "OSINT feeds and resources knowledge base.",
    categories: ["OSINT", "Knowledge Base", "Feeds"]
  },
  {
    title: "SQL Zoo",
    url: "https://sqlzoo.net/wiki/SELECT_basics",
    description: "Interactive SQL tutorial and practice.",
    categories: ["Education", "SQL", "Tutorial"]
  },
  {
    title: "C99 Subdomain Finder",
    url: "https://subdomainfinder.c99.nl/",
    description: "Subdomain enumeration tool.",
    categories: ["OSINT", "Subdomain", "Enumeration"]
  },
  {
    title: "JS Linux",
    url: "https://bellard.org/jslinux/",
    description: "Linux emulator running in JavaScript.",
    categories: ["Linux", "Emulator", "JavaScript"]
  },
  {
    title: "Deep Learning Book",
    url: "https://deeplearningbook.org/",
    description: "Comprehensive deep learning textbook.",
    categories: ["AI", "Deep Learning", "Education"]
  },
  {
    title: "Profile Picture AI",
    url: "https://www.profilepicture.ai/",
    description: "AI-generated profile pictures.",
    categories: ["AI", "Profile", "Images"]
  },
  {
    title: "Haikei",
    url: "https://haikei.app/",
    description: "Generate unique SVG design assets.",
    categories: ["Design", "SVG", "Assets"]
  },
  {
    title: "GitStalk Profile",
    url: "https://gitstalk.netlify.app/eirsvi",
    description: "GitHub profile stalking tool.",
    categories: ["GitHub", "Profile", "OSINT"]
  },
  {
    title: "Khmer CRF Suite",
    url: "https://khmer-crfsuite.netlify.app/",
    description: "Khmer language CRF suite tool.",
    categories: ["Language", "Khmer", "NLP"]
  },
  {
    title: "Khmer Character Map",
    url: "https://khmercharmap.netlify.app/",
    description: "Khmer character mapping tool.",
    categories: ["Language", "Khmer", "Characters"]
  },
  {
    title: "Khmer MMO",
    url: "http://khmermmo.netlify.app/",
    description: "Khmer MMO gaming resources.",
    categories: ["Gaming", "Khmer", "MMO"]
  },
  {
    title: "Lat Lng Tool",
    url: "http://latlng.netlify.app/",
    description: "Latitude and longitude conversion tool.",
    categories: ["Maps", "Coordinates", "Tools"]
  },
  {
    title: "Thorium WinXP Keys",
    url: "https://thorium.rocks/winxp/keys.html",
    description: "Windows XP product keys archive.",
    categories: ["Windows", "Keys", "Archive"]
  },
  {
    title: "Get Waves",
    url: "https://getwaves.io/",
    description: "SVG wave generator for web design.",
    categories: ["Design", "SVG", "Waves"]
  },
  {
    title: "RExpository",
    url: "https://jaimepolop.github.io/RExpository/",
    description: "Reverse engineering tools repository.",
    categories: ["Security", "Reverse Engineering", "Tools"]
  },
  {
    title: "Forensic OSINT Tor",
    url: "https://www.forensicosint.com/tor",
    description: "Tor network forensic analysis tools.",
    categories: ["Forensics", "OSINT", "Tor"]
  },
  {
    title: "User Search AI",
    url: "https://usersearch.ai/",
    description: "AI-powered user search across platforms.",
    categories: ["OSINT", "AI", "User Search"]
  },
  {
    title: "Lottie Files",
    url: "https://lottiefiles.com/",
    description: "Animation files for web and mobile.",
    categories: ["Animation", "Design", "Lottie"]
  },
  {
    title: "Motion Dev",
    url: "https://motion.dev/",
    description: "Animation library for React.",
    categories: ["Animation", "React", "Library"]
  },
  {
    title: "Three.js",
    url: "https://threejs.org/",
    description: "3D JavaScript library.",
    categories: ["Development", "3D", "JavaScript"]
  },
  {
    title: "AOS Animate on Scroll",
    url: "https://michalsnik.github.io/aos/",
    description: "Animate elements on scroll library.",
    categories: ["Animation", "Scroll", "Library"]
  },
  {
    title: "GSAP",
    url: "https://gsap.com/",
    description: "Professional web animation library.",
    categories: ["Animation", "Web", "Library"]
  },
  {
    title: "Anime.js",
    url: "https://animejs.com/",
    description: "Lightweight JavaScript animation library.",
    categories: ["Animation", "JavaScript", "Library"]
  },
  {
    title: "Shabze Filters",
    url: "https://shabzefilters.netlify.app/",
    description: "Image filter effects tool.",
    categories: ["Design", "Filters", "Images"]
  },
  {
    title: "Green Screen Memes",
    url: "https://greenscreenmemes.com/",
    description: "Green screen meme templates.",
    categories: ["Memes", "Green Screen", "Templates"]
  },
  {
    title: "Animate CSS",
    url: "https://animate.style/",
    description: "CSS animation library.",
    categories: ["Animation", "CSS", "Library"]
  },
  {
    title: "Plotly",
    url: "https://plotly.com/graphing-libraries/",
    description: "Data visualization graphing libraries.",
    categories: ["Visualization", "Data", "Charts"]
  },
  {
    title: "Particles.js Vincent",
    url: "https://vincentgarreau.com/particles.js/",
    description: "Lightweight JavaScript particle library.",
    categories: ["Animation", "Particles", "JavaScript"]
  },
  {
    title: "Vanta.js",
    url: "https://www.vantajs.com/",
    description: "Animated website backgrounds.",
    categories: ["Animation", "Background", "JavaScript"]
  },
  {
    title: "Particles.js Org",
    url: "https://particles.js.org/",
    description: "TypeScript particle animation library.",
    categories: ["Animation", "Particles", "TypeScript"]
  },
  {
    title: "Animista",
    url: "https://animista.net/",
    description: "CSS animation playground and generator.",
    categories: ["Animation", "CSS", "Generator"]
  },
  {
    title: "Cytoscape.js",
    url: "https://js.cytoscape.org/",
    description: "Graph theory visualization library.",
    categories: ["Visualization", "Graphs", "JavaScript"]
  },
  {
    title: "Babylon.js",
    url: "https://www.babylonjs.com/",
    description: "Powerful 3D engine for web.",
    categories: ["Development", "3D", "Engine"]
  },
  {
    title: "WebVM",
    url: "https://webvm.io/",
    description: "Linux virtual machine in browser.",
    categories: ["Linux", "Virtual Machine", "Browser"]
  },
  {
    title: "OWASP Calculator",
    url: "https://javierolmedo.github.io/OWASP-Calculator/",
    description: "OWASP risk rating calculator.",
    categories: ["Security", "OWASP", "Risk Assessment"]
  },
  {
    title: "GH Intel Secrets",
    url: "https://ghintel.secrets.ninja/",
    description: "GitHub intelligence and secrets scanner.",
    categories: ["Security", "GitHub", "Secrets"]
  },
  {
    title: "Phone to Skype",
    url: "https://www.vedbex.com/phone2skype",
    description: "Phone number to Skype username converter.",
    categories: ["OSINT", "Skype", "Phone"]
  },
  {
    title: "SQLMap Code Generator",
    url: "https://acorzo1983.github.io/SQLMapCG/",
    description: "SQLMap command generator tool.",
    categories: ["Security", "SQL Injection", "Tools"]
  },
  {
    title: "Social Searcher Google",
    url: "https://www.social-searcher.com/google-social-search/",
    description: "Google social media search tool.",
    categories: ["OSINT", "Social Media", "Search"]
  },
  {
    title: "Avatar API",
    url: "https://www.avatarapi.com/",
    description: "Avatar generation API service.",
    categories: ["API", "Avatar", "Images"]
  },
  {
    title: "WebMii",
    url: "https://webmii.com/",
    description: "People search engine.",
    categories: ["OSINT", "People Search", "Investigation"]
  },
  {
    title: "Epieos",
    url: "https://epieos.com/?r=1",
    description: "Email and username OSINT tool.",
    categories: ["OSINT", "Email", "Username"]
  },
  {
    title: "Facebook All in One Search",
    url: "https://facebook-all-in-one.com/#/search",
    description: "Comprehensive Facebook search tool.",
    categories: ["OSINT", "Facebook", "Search"]
  },
  {
    title: "HotSheet Intelligence",
    url: "https://www.hotsheet.com/inoitsu/",
    description: "Intelligence gathering hotsheet.",
    categories: ["OSINT", "Intelligence", "Resources"]
  },
  {
    title: "SkyVector",
    url: "https://skyvector.com/",
    description: "Aeronautical charts and flight planning.",
    categories: ["Aviation", "Charts", "Flight"]
  },
  {
    title: "PlantNet Identify",
    url: "https://identify.plantnet.org/",
    description: "Plant identification using AI.",
    categories: ["AI", "Plants", "Identification"]
  },
  {
    title: "Global Terrorism Database",
    url: "https://www.start.umd.edu/data-tools/GTD",
    description: "Comprehensive terrorism incident database.",
    categories: ["Database", "Terrorism", "Research"]
  },
  {
    title: "Bird Hunt Intel",
    url: "https://birdhunt.huntintel.io/",
    description: "Bird intelligence and tracking tool.",
    categories: ["OSINT", "Intelligence", "Animals"]
  },
  {
    title: "PastVu",
    url: "https://pastvu.com/?g=",
    description: "Historical photo mapping platform.",
    categories: ["History", "Photos", "Maps"]
  },
  {
    title: "Otwarte Zrodla",
    url: "https://otwartezrodla.pl/",
    description: "Polish OSINT resources.",
    categories: ["OSINT", "Poland", "Resources"]
  },
  {
    title: "OSoMe Network",
    url: "https://osome.iu.edu/tools/osomenet/",
    description: "Social media network analysis tool.",
    categories: ["Social Media", "Analysis", "Network"]
  },
  {
    title: "MKDev Testing",
    url: "https://github.com/mkdev55/testing",
    description: "Testing tools and resources repository.",
    categories: ["Testing", "Development", "GitHub"]
  },
  {
    title: "Awesome Playgrounds",
    url: "https://github.com/mkdev55/awesome-playgrounds",
    description: "Curated list of code playgrounds.",
    categories: ["Development", "Playgrounds", "GitHub"]
  },
  {
    title: "Dorks Faisal",
    url: "https://dorks.faisalahmed.me/#",
    description: "Google dorks collection and search.",
    categories: ["OSINT", "Dorking", "Search"]
  },
  {
    title: "Certificate Transparency",
    url: "https://crt.sh/?q=rpitssr.edu.kh",
    description: "Certificate transparency log search.",
    categories: ["Security", "Certificates", "Transparency"]
  },
  {
    title: "What CMS",
    url: "https://whatcms.org/?s=rpitssr.edu.kh",
    description: "CMS detection and analysis tool.",
    categories: ["Web", "CMS", "Detection"]
  },
  {
    title: "Grep App",
    url: "https://grep.app/",
    description: "Search across GitHub repositories.",
    categories: ["GitHub", "Search", "Code"]
  },
  {
    title: "Security Headers",
    url: "https://securityheaders.com/",
    description: "HTTP security headers analyzer.",
    categories: ["Security", "Headers", "Analysis"]
  },
  {
    title: "Investigator Tool",
    url: "https://abhijithb200.github.io/investigator/",
    description: "OSINT investigation framework.",
    categories: ["OSINT", "Investigation", "Framework"]
  },
  {
    title: "Lenso AI",
    url: "https://lenso.ai/",
    description: "AI-powered reverse image search.",
    categories: ["AI", "Image Search", "OSINT"]
  }
];

// Make sure to render all cards initially in random order
setTimeout(function() {
  console.log('Auto-initializing cards in random order...');
  if (typeof renderCards === 'function') {
    renderCards([]);
  }
}, 100);

// Also try immediate initialization when script loads
if (document.readyState === 'loading') {
  console.log('Document still loading, will wait...');
} else {
  console.log('Document already loaded, initializing immediately...');
  setTimeout(function() {
    renderCards([]);
  }, 50);
}

// Debug: Log when script finishes loading
console.log('=== RESOURCE SCRIPT LOADED ===');
console.log('Resources array length:', resources ? resources.length : 'undefined');
console.log('renderCards function available:', typeof renderCards);

// Force render cards as final attempt
setTimeout(function() {
  console.log('=== FINAL FORCE RENDER ATTEMPT ===');
  const grid = document.getElementById('resourceGrid');
  console.log('Grid element found:', !!grid);
  if (grid && resources && resources.length > 0) {
    console.log('Forcing render of', resources.length, 'resources in random order');
    renderCards([]);
  } else {
    console.log('Missing requirements:', {
      grid: !!grid,
      resources: !!(resources && resources.length),
      resourcesLength: resources ? resources.length : 0
    });
  }
}, 2000);

// Add global test functions
window.testCategoryFilter = function(category) {
  console.log('=== GLOBAL TEST FOR CATEGORY:', category, '===');
  if (typeof renderCards === 'function') {
    renderCards([category]);
  }
  
  // Also update button states manually
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active', 'selected');
    if (btn.getAttribute('data-category') === category) {
      btn.classList.add('selected');
    }
  });
};

// Add click listener to test category buttons
window.addEventListener('load', function() {
  console.log('=== WINDOW LOADED - ADDING MANUAL LISTENERS ===');
  
  setTimeout(function() {
    const buttons = document.querySelectorAll('.category-btn');
    console.log('Found buttons for manual setup:', buttons.length);
    
    buttons.forEach((btn, index) => {
      console.log('Button', index, ':', btn.textContent, 'category:', btn.getAttribute('data-category'));
      
      // Add manual click handler as backup
      btn.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        console.log('=== MANUAL BACKUP CLICK ===');
        console.log('Clicked category:', category);
        
        if (category === '') {
          window.testCategoryFilter('');
        } else {
          window.testCategoryFilter(category);
        }
      });
    });
  }, 1000);
});
