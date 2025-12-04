document.addEventListener('DOMContentLoaded', () => {
    // Clock Functionality
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false });
        const clockElement = document.getElementById('clock');
        if (clockElement) {
            clockElement.textContent = timeString;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Navigation Logic
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.hud-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            // Update Buttons
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update Sections
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Permutation Animation
    const permCount = document.getElementById('perm-count');
    if (permCount) {
        let count = 0;
        setInterval(() => {
            count = Math.floor(Math.random() * 999999);
            permCount.textContent = count.toString().padStart(6, '0');
        }, 100);
    }

    // Decrypt Animation
    const decryptAnim = document.getElementById('decrypt-anim');
    if (decryptAnim) {
        const originalText = "11010110";
        const chars = "01";
        let interval = setInterval(() => {
            let newText = "";
            for (let i = 0; i < originalText.length; i++) {
                newText += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            decryptAnim.textContent = newText;
        }, 50);
    }

    // GitHub Graph Generation
    const graphContainer = document.getElementById('github-graph');
    if (graphContainer) {
        // 52 weeks * 7 days = 364 cells
        for (let i = 0; i < 364; i++) {
            const cell = document.createElement('div');
            cell.classList.add('graph-cell');

            // Randomly assign activity levels for visual effect
            const rand = Math.random();
            if (rand > 0.9) cell.classList.add('level-4');
            else if (rand > 0.8) cell.classList.add('level-3');
            else if (rand > 0.7) cell.classList.add('level-2');
            else if (rand > 0.5) cell.classList.add('level-1');

            graphContainer.appendChild(cell);
        }
    }

    // --- CYBORG TOOLS LOGIC ---

    const tools = [
        { id: 'ipv4', name: 'IPv4 CALCULATOR', cat: 'network', desc: 'Calculate subnet mask, network, broadcast.' },
        { id: 'mac_gen', name: 'MAC ADDRESS GEN', cat: 'network', desc: 'Generate random MAC addresses.' },
        { id: 'bin_text', name: 'BINARY <-> TEXT', cat: 'converter', desc: 'Convert text to binary and vice versa.' },
        { id: 'base_enc', name: 'BASE ENCODING', cat: 'converter', desc: 'Base64, Base32 encoder/decoder.' },
        { id: 'net_speed', name: 'INTERNET SPEED', cat: 'converter', desc: 'Convert Mbps to MB/s etc.' },
        { id: 'data_store', name: 'DATA STORAGE', cat: 'converter', desc: 'Convert Bytes, KB, MB, GB, TB.' },
        { id: 'kh_lorem', name: 'KHMER LOREM', cat: 'generator', desc: 'Generate Khmer placeholder text.' },
        { id: 'en_para', name: 'ENGLISH PARA', cat: 'generator', desc: 'Generate English paragraphs.' },
        { id: 'qr_code', name: 'QR CODE GEN', cat: 'generator', desc: 'Generate QR Code from text.' },
        { id: 'pass_gen', name: 'PASSWORD GEN', cat: 'generator', desc: 'Strong password generator.' },
        { id: 'aes_cipher', name: 'AES BLOCK CIPHER', cat: 'crypto', desc: 'Encrypt/Decrypt using AES.' },
        { id: 'hmac_gen', name: 'HMAC GENERATOR', cat: 'crypto', desc: 'Generate Hash-based Message Auth Code.' },
        { id: 'tac_sim', name: 'TACTICAL SIM', cat: 'game', desc: 'Simple tactical simulation game.' },
    ];

    const toolsGrid = document.getElementById('tools-grid');
    const toolSearch = document.getElementById('tool-search-input');
    const catBtns = document.querySelectorAll('.cat-btn');
    const currentCatTitle = document.getElementById('current-tool-cat');

    // Render Tools
    function renderTools(filterCat = 'all', searchTerm = '') {
        if (!toolsGrid) return;
        toolsGrid.innerHTML = '';

        const filtered = tools.filter(t => {
            const matchCat = filterCat === 'all' || t.cat === filterCat;
            const matchSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.desc.toLowerCase().includes(searchTerm.toLowerCase());
            return matchCat && matchSearch;
        });

        filtered.forEach(t => {
            const card = document.createElement('div');
            card.className = 'tool-card';
            card.innerHTML = `<h4>${t.name}</h4><span>${t.desc}</span>`;
            card.addEventListener('click', () => openTool(t));
            toolsGrid.appendChild(card);
        });
    }

    // Initial Render
    renderTools();

    // Event Listeners
    if (toolSearch) {
        toolSearch.addEventListener('input', (e) => {
            const activeCat = document.querySelector('.cat-btn.active').dataset.cat;
            renderTools(activeCat, e.target.value);
        });
    }

    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.cat;
            currentCatTitle.textContent = cat === 'all' ? 'ALL SYSTEMS' : cat.toUpperCase();
            renderTools(cat, toolSearch.value);
        });
    });

    // Tool Modal Logic
    const modal = document.getElementById('tool-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.getElementById('close-modal');
    const toolOutput = document.getElementById('tool-output');
    const copyBtn = document.getElementById('copy-btn');

    function openTool(tool) {
        modal.classList.add('active');
        modalTitle.textContent = tool.name;
        toolOutput.textContent = 'WAITING FOR INPUT...';
        renderToolInterface(tool);
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(toolOutput.textContent);
            const original = copyBtn.textContent;
            copyBtn.textContent = 'COPIED!';
            setTimeout(() => copyBtn.textContent = original, 1000);
        });
    }

    function renderToolInterface(tool) {
        modalBody.innerHTML = '';

        if (tool.id === 'ipv4') {
            modalBody.innerHTML = `
                <div class="tool-input-group">
                    <label>IP Address</label>
                    <input type="text" id="ip-input" placeholder="192.168.1.1">
                </div>
                <div class="tool-input-group">
                    <label>CIDR</label>
                    <input type="number" id="cidr-input" placeholder="24" min="0" max="32">
                </div>
                <button class="tool-btn" id="calc-ip">CALCULATE</button>
            `;
            document.getElementById('calc-ip').addEventListener('click', () => {
                const ip = document.getElementById('ip-input').value;
                const cidr = document.getElementById('cidr-input').value;
                // Simple mock calculation for demo
                toolOutput.textContent = `Network: ${ip}/${cidr} | Mask: 255.255.255.0 | Broadcast: 192.168.1.255`;
            });
        } else if (tool.id === 'pass_gen') {
            modalBody.innerHTML = `
                <div class="tool-input-group">
                    <label>Length</label>
                    <input type="number" id="pass-len" value="16" min="8" max="64">
                </div>
                <button class="tool-btn" id="gen-pass">GENERATE</button>
            `;
            document.getElementById('gen-pass').addEventListener('click', () => {
                const len = document.getElementById('pass-len').value;
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
                let pass = "";
                for (let i = 0; i < len; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
                toolOutput.textContent = pass;
            });
        } else if (tool.id === 'bin_text') {
            modalBody.innerHTML = `
                <div class="tool-input-group">
                    <label>Text Input</label>
                    <textarea id="text-input" rows="3"></textarea>
                </div>
                <button class="tool-btn" id="to-bin">TEXT TO BINARY</button>
                <button class="tool-btn" id="to-text" style="margin-top:5px">BINARY TO TEXT</button>
            `;
            document.getElementById('to-bin').addEventListener('click', () => {
                const text = document.getElementById('text-input').value;
                toolOutput.textContent = text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
            });
            document.getElementById('to-text').addEventListener('click', () => {
                const bin = document.getElementById('text-input').value.replace(/\s/g, '');
                let text = '';
                for (let i = 0; i < bin.length; i += 8) {
                    text += String.fromCharCode(parseInt(bin.substr(i, 8), 2));
                }
                toolOutput.textContent = text;
            });
        } else {
            modalBody.innerHTML = `<div style="padding:20px; text-align:center; color:#555;">INTERFACE UNDER CONSTRUCTION</div>`;
        }
    }

    // --- UPLINK LOGIC ---

    const links = [
        // AI
        { name: 'ProfilePicture.ai', url: 'https://www.profilepicture.ai/', cat: 'ai' },
        { name: 'Haikei', url: 'https://haikei.app/', cat: 'design' },
        { name: 'GitStalk', url: 'https://gitstalk.netlify.app/eirsvi', cat: 'dev' },
        { name: 'Khmer CRFSuite', url: 'https://khmer-crfsuite.netlify.app/', cat: 'dev' },
        { name: 'Khmer CharMap', url: 'https://khmercharmap.netlify.app/', cat: 'dev' },
        { name: 'Khmer MMO', url: 'http://khmermmo.netlify.app/', cat: 'game' },
        { name: 'LatLng', url: 'http://latlng.netlify.app/', cat: 'tools' },
        { name: 'WinXP Keys', url: 'https://thorium.rocks/winxp/keys.html', cat: 'tools' },
        { name: 'GetWaves', url: 'https://getwaves.io/', cat: 'design' },
        { name: 'RExpository', url: 'https://jaimepolop.github.io/RExpository/', cat: 'osint' },
        { name: 'Forensic OSINT', url: 'https://www.forensicosint.com/tor', cat: 'osint' },
        { name: 'UserSearch', url: 'https://usersearch.ai/', cat: 'osint' },
        { name: 'LottieFiles', url: 'https://lottiefiles.com/', cat: 'design' },
        { name: 'Motion.dev', url: 'https://motion.dev/', cat: 'design' },
        { name: 'Three.js', url: 'https://threejs.org/', cat: 'dev' },
        { name: 'AOS', url: 'https://michalsnik.github.io/aos/', cat: 'dev' },
        { name: 'GSAP', url: 'https://gsap.com/', cat: 'dev' },
        { name: 'ID Generator', url: 'https://idgenerator-xi.vercel.app/', cat: 'tools' },
        { name: 'Vue Color Avatar', url: 'https://vue-color-avatar.leoku.dev/', cat: 'design' },
        { name: 'Efecto', url: 'https://efecto.app/', cat: 'design' },
        { name: 'CSS Shape', url: 'https://css-shape.com/', cat: 'design' },
        { name: 'Anime.js', url: 'https://animejs.com/', cat: 'dev' },
        { name: 'Shabze Filters', url: 'https://shabzefilters.netlify.app', cat: 'design' },
        { name: 'FontAwesome', url: 'https://fontawesome.com', cat: 'design' },
        { name: 'Flaticon', url: 'https://flaticon.com', cat: 'design' },
        { name: 'IconFinder', url: 'https://iconfinder.com', cat: 'design' },
        { name: 'Material Icons', url: 'https://material.io/resources/icons/', cat: 'design' },
        { name: 'Icons8', url: 'https://icons8.com', cat: 'design' },
        { name: 'Boxicons', url: 'https://boxicons.com', cat: 'design' },
        { name: 'Feather Icons', url: 'https://feathericons.com', cat: 'design' },
        { name: 'IcoFont', url: 'https://icofont.com', cat: 'design' },
        { name: 'SVGHub', url: 'https://svghub.app', cat: 'design' },
        { name: 'Tabler Icons', url: 'https://tabler-icon.io', cat: 'design' },
        { name: 'IconsMind', url: 'https://iconsmind.com', cat: 'design' },
        { name: 'IconMonstr', url: 'https://iconmonstr.com', cat: 'design' },
        { name: 'SVGRepo', url: 'https://svgrepo.com', cat: 'design' },
        { name: 'GreenScreenMemes', url: 'https://greenscreenmemes.com/', cat: 'tools' },
        { name: 'Project Gutenberg', url: 'https://gutenberg.org', cat: 'books' },
        { name: 'Internet Archive', url: 'https://archive.org', cat: 'books' },
        { name: 'Open Library', url: 'https://openlibrary.org', cat: 'books' },
        { name: 'PDFBooksWorld', url: 'https://pdfbooksworld.com', cat: 'books' },
        { name: 'DigiLibraries', url: 'https://digilibrary.com', cat: 'books' },
        { name: 'ManyBooks', url: 'https://manybooks.net', cat: 'books' },
        { name: 'Resume Sach', url: 'https://resume-sach-five.vercel.app', cat: 'dev' },
        { name: 'Neural Flow', url: 'https://neural-flow.netlify.app', cat: 'dev' },
        { name: 'Aetheria', url: 'https://aetheria-dev.netlify.app', cat: 'dev' },
        { name: 'Git Genius', url: 'https://git-genius.netlify.app', cat: 'dev' },
        { name: 'Kaleido Agency', url: 'https://kaleido-agency.netlify.app', cat: 'dev' },
        { name: 'Claude Code', url: 'https://claude-code-dev.netlify.app', cat: 'dev' },
        { name: 'Nova Wrap', url: 'https://nova-wrap.netlify.app', cat: 'dev' },
        { name: 'Feedwall', url: 'https://feedwall.netlify.app', cat: 'dev' },
        { name: 'Aura Dev', url: 'https://aura-dev-1.netlify.app', cat: 'dev' },
        { name: 'Nexus UI', url: 'https://nexus-ui-dev.netlify.app', cat: 'dev' },
        { name: 'Redline Tokyo', url: 'https://redline-tokyo.netlify.app', cat: 'dev' },
        { name: 'Standard Ebooks', url: 'https://standardebooks.org', cat: 'books' },
        { name: 'Lumina', url: 'https://lumina-dev.netlify.app', cat: 'dev' },
        { name: 'Sitara Bolly', url: 'https://sitara-bolly.netlify.app', cat: 'dev' },
        { name: 'Silver Screen', url: 'https://silver-screen-1.netlify.app', cat: 'dev' },
        { name: 'Atlas Web 3', url: 'https://atlas-web-3.netlify.app', cat: 'dev' },
        { name: 'Aetheris', url: 'https://aetheris-dev.netlify.app', cat: 'dev' },
        { name: 'Chronicle Beta', url: 'https://chronicle-beta.vercel.app', cat: 'dev' },
        { name: 'Ather Archieve', url: 'https://ather-archieve.netlify.app', cat: 'dev' },
        { name: 'BookBoon', url: 'https://bookboon.com', cat: 'books' },
        { name: 'Free-Ebooks', url: 'https://free-ebooks.net', cat: 'books' },
        { name: 'Animate.style', url: 'https://animate.style/', cat: 'dev' },
        { name: 'Plotly', url: 'https://plotly.com/graphing-libraries/', cat: 'dev' },
        { name: 'Particles.js', url: 'https://vincentgarreau.com/particles.js/', cat: 'dev' },
        { name: 'Vanta.js', url: 'https://www.vantajs.com/', cat: 'dev' },
        { name: 'Animista', url: 'https://animista.net/', cat: 'dev' },
        { name: 'Cytoscape.js', url: 'https://js.cytoscape.org/', cat: 'dev' },
        { name: 'Babylon.js', url: 'https://www.babylonjs.com/', cat: 'dev' },
        { name: 'WebVM', url: 'https://webvm.io/', cat: 'tools' },
        { name: 'OWASP Calc', url: 'https://javierolmedo.github.io/OWASP-Calculator/', cat: 'osint' },
        { name: 'Hoppscotch', url: 'https://hoppscotch.io/', cat: 'dev' },
        { name: 'GH Intel', url: 'https://ghintel.secrets.ninja', cat: 'osint' },
        { name: 'Phone2Skype', url: 'https://www.vedbex.com/phone2skype', cat: 'osint' },
        { name: 'SQLMapCG', url: 'https://acorzo1983.github.io/SQLMapCG/', cat: 'osint' },
        { name: 'Social Searcher', url: 'https://www.social-searcher.com/google-social-search/', cat: 'osint' },
        { name: 'AvatarAPI', url: 'https://www.avatarapi.com/', cat: 'osint' },
        { name: 'WebMii', url: 'https://webmii.com/', cat: 'osint' },
        { name: 'Epieos', url: 'https://epieos.com/?r=1', cat: 'osint' },
        { name: 'Facebook Search', url: 'https://facebook-all-in-one.com/#/search', cat: 'osint' },
        { name: 'Hotsheet', url: 'https://www.hotsheet.com/inoitsu/', cat: 'osint' },
        { name: 'SkyVector', url: 'https://skyvector.com/', cat: 'tools' },
        { name: 'PlantNet', url: 'https://identify.plantnet.org/', cat: 'ai' },
        { name: 'GTD', url: 'https://www.start.umd.edu/data-tools/GTD', cat: 'osint' },
        { name: 'BirdHunt', url: 'https://birdhunt.huntintel.io/', cat: 'osint' },
        { name: 'PastVu', url: 'https://pastvu.com/?g=', cat: 'osint' },
        { name: 'Otwarte Zrodla', url: 'https://otwartezrodla.pl/', cat: 'osint' },
        { name: 'OsomeNet', url: 'https://osome.iu.edu/tools/osomenet/', cat: 'osint' },
        { name: 'Testing', url: 'https://github.com/mkdev55/testing', cat: 'dev' },
        { name: 'Playgrounds', url: 'https://github.com/mkdev55/awesome-playgrounds', cat: 'dev' },
        { name: 'Dorks', url: 'https://dorks.faisalahmed.me/#', cat: 'osint' },
        { name: 'DorkSearch', url: 'https://dorksearch.com/', cat: 'osint' },
        { name: 'CRT.sh', url: 'https://crt.sh/?q=rpitssr.edu.kh', cat: 'osint' },
        { name: 'WhatCMS', url: 'https://whatcms.org/?s=rpitssr.edu.kh', cat: 'dev' },
        { name: 'Grep.app', url: 'https://grep.app/', cat: 'dev' },
        { name: 'SecurityHeaders', url: 'https://securityheaders.com/', cat: 'dev' },
        { name: 'Investigator', url: 'https://abhijithb200.github.io/investigator/', cat: 'osint' },
        { name: 'Lenso.ai', url: 'https://lenso.ai/', cat: 'ai' },
        { name: 'Signaturely', url: 'https://signaturely.com/online-signature/draw/', cat: 'tools' },
        { name: 'SiteInspire', url: 'https://www.siteinspire.com/', cat: 'design' },
        { name: 'SitesLike', url: 'https://m.siteslike.com/', cat: 'tools' },
        { name: 'SQLPD', url: 'https://sqlpd.com/', cat: 'dev' },
        { name: 'InterfaceInGame', url: 'https://interfaceingame.com/', cat: 'design' },
        { name: 'Checklist Design', url: 'https://www.checklist.design/', cat: 'design' },
        { name: 'SS64', url: 'https://ss64.com/', cat: 'dev' },
        { name: 'Submarine Cable', url: 'http://submarinecablemap.com/', cat: 'tools' },
        { name: 'TextFiles', url: 'http://cd.textfiles.com/directory.html', cat: 'books' },
        { name: 'The Algorithms', url: 'https://the-algorithms.com/', cat: 'dev' },
        { name: 'The Useless Web', url: 'https://theuselessweb.com/', cat: 'game' },
        { name: 'TheySeeYourPhotos', url: 'https://theyseeyourphotos.com/', cat: 'osint' },
        { name: 'Top 1000 Repos', url: 'https://top1000repos.com/', cat: 'dev' },
        { name: 'Accessibility', url: 'https://www.understandingaccessibility.com/', cat: 'dev' },
        { name: 'Wheel of Names', url: 'https://wheelofnames.com/', cat: 'tools' },
        { name: 'WhoIsInSpace', url: 'http://whoisinspace.com/', cat: 'tools' },
        { name: 'MusicFX', url: 'https://aitestkitchen.withgoogle.com/tools/music-fx', cat: 'ai' },
        { name: 'A to Z of AI', url: 'https://atozofai.withgoogle.com/', cat: 'ai' },
        { name: 'Google Experiments', url: 'https://experiments.withgoogle.com/experiments', cat: 'dev' },
        { name: 'Partners Directory', url: 'https://partnersdirectory.withgoogle.com/?premier=true', cat: 'tools' },
        { name: 'Prebunking', url: 'https://prebunking.withgoogle.com/', cat: 'tools' },
        { name: 'QuickDraw', url: 'http://quickdraw.withgoogle.com/', cat: 'game' },
        { name: 'Reader Revenue', url: 'https://readerrevenue.withgoogle.com/', cat: 'tools' },
        { name: 'Visual Blocks', url: 'https://visualblocks.withgoogle.com/#/', cat: 'dev' },
        { name: 'UnknownCheats', url: 'https://www.unknowncheats.me/forum/index.php', cat: 'game' },
        { name: 'Lazarus', url: 'https://lazarus.day/reports/', cat: 'osint' },
        { name: 'ExitNode', url: 'https://exitno.de/', cat: 'osint' },
        { name: 'Jodies IP Calc', url: 'https://jodies.de/ipcalc', cat: 'tools' },
        { name: 'Iconify', url: 'https://icon-sets.iconify.design/', cat: 'design' },
        { name: 'ContainerLab', url: 'https://containerlab.dev/', cat: 'dev' },
        { name: 'MKQL', url: 'https://mkql.deno.dev/', cat: 'dev' },
        { name: 'GeoHints', url: 'https://geohints.com/', cat: 'osint' },
        { name: 'Tiny Helpers', url: 'https://tiny-helpers.dev/latest', cat: 'dev' },
        { name: 'Soar.earth', url: 'https://soar.earth/', cat: 'tools' },
        { name: 'OpenSecurityData', url: 'https://opensecuritydata.eu/', cat: 'osint' },
        { name: 'The Eye', url: 'https://the-eye.eu/', cat: 'books' },
        { name: 'Game Theory', url: 'https://www.zweigmedia.com/RealWorld/gametheory/games.html', cat: 'game' },
        { name: 'Neal.fun', url: 'https://neal.fun/', cat: 'game' },
        { name: 'OG Image Gallery', url: 'https://www.ogimage.gallery/', cat: 'design' },
        { name: 'NASA Eyes', url: 'https://eyes.nasa.gov/apps/mrn/#/mars', cat: 'tools' },
        { name: 'FaceCheck', url: 'http://facecheck.id/', cat: 'ai' },
        { name: 'CryptoPapers', url: 'https://cryptopapers.info/', cat: 'crypto' },
        { name: 'WholeEarth', url: 'https://wholeearth.info/', cat: 'tools' },
        { name: 'Censys', url: 'https://search.censys.io/', cat: 'osint' },
        { name: 'Element', url: 'https://element.io/', cat: 'tools' },
        { name: 'FindEmail', url: 'https://findemail.io/', cat: 'osint' },
        { name: 'Map of GitHub', url: 'https://anvaka.github.io/map-of-github/#2/0/0', cat: 'dev' },
        { name: 'Cipher387', url: 'https://cipher387.github.io/', cat: 'osint' },
        { name: 'Movies for Hackers', url: 'https://entozoon.github.io/movies-for-hackers/', cat: 'tools' },
        { name: 'OSINT Cheat Sheet', url: 'https://jieyab89.github.io/OSINT-Cheat-sheet/Web-Based/', cat: 'osint' },
        { name: 'AI For Beginners', url: 'https://microsoft.github.io/AI-For-Beginners/', cat: 'ai' },
        { name: 'FossFLOW', url: 'https://stan-smith.github.io/FossFLOW/', cat: 'dev' },
        { name: 'GreyNoise', url: 'https://viz.greynoise.io/', cat: 'osint' },
        { name: 'InvestigativeData', url: 'https://investigativedata.io/', cat: 'osint' },
        { name: 'IP Geolocation', url: 'https://ipgeolocation.io/', cat: 'tools' },
        { name: 'K3s', url: 'https://k3s.io/', cat: 'dev' },
        { name: 'KeywordTool', url: 'https://keywordtool.io/', cat: 'tools' },
        { name: 'Linux Learning', url: 'https://labex.io/learn/linux', cat: 'dev' },
        { name: 'Nuclei', url: 'https://nuclei.projectdiscovery.io/', cat: 'osint' },
        { name: 'Shodan', url: 'https://www.shodan.io/', cat: 'osint' },
        { name: 'TTS IDRI', url: 'https://tts.idri.edu.kh/', cat: 'tools' },
        { name: 'ODA CDC', url: 'http://oda.cdc.gov.kh/', cat: 'tools' },
        { name: 'MAFF eLibrary', url: 'https://elibrary.maff.gov.kh/', cat: 'books' },
        { name: 'NCDD DB', url: 'https://db.ncdd.gov.kh/', cat: 'tools' },
        { name: 'Prisoners Dilemma', url: 'http://www.prisoners-dilemma.com/#java', cat: 'game' },
        { name: 'MobLab Games', url: 'https://www.moblab.com/edu/games/catalog/all', cat: 'game' },
        { name: 'Browser.lol', url: 'https://browser.lol/', cat: 'tools' },
        { name: 'Hunch.ly', url: 'https://www.hunch.ly/', cat: 'osint' },
        { name: 'VibeCheck', url: 'https://vibecheck.market/', cat: 'tools' },
        { name: 'KYC Not Me', url: 'https://kycnot.me/', cat: 'osint' },
        { name: 'Trust Game', url: 'https://ncase.me/trust/', cat: 'game' },
        { name: 'OSINT Swiss Knife', url: 'https://start.me/p/QLjzR2/osint-switzerland-army-knife', cat: 'osint' },
        { name: 'Portainer Templates', url: 'https://portainer-templates.as93.net/', cat: 'dev' },
        { name: 'Brand Guidelines', url: 'https://brandguidelines.net/', cat: 'design' },
        { name: 'FMHY', url: 'https://fmhy.net/', cat: 'tools' },
        { name: 'GeoTips', url: 'https://geotips.net/', cat: 'osint' },
        { name: 'NirSoft', url: 'https://nirsoft.net/', cat: 'tools' },
        { name: 'SQLZoo', url: 'https://sqlzoo.net/wiki/SELECT_basics', cat: 'dev' },
        { name: 'Subdomain Finder', url: 'https://subdomainfinder.c99.nl/', cat: 'osint' },
        { name: 'JSLinux', url: 'https://bellard.org/jslinux/', cat: 'tools' },
        { name: 'Deep Learning Book', url: 'https://deeplearningbook.org/', cat: 'books' },
        { name: 'EconGraphs', url: 'https://econgraphs.org/', cat: 'tools' },
        { name: 'Remix Ethereum', url: 'https://remix.ethereum.org/', cat: 'crypto' },
        { name: 'ExifTool', url: 'https://exiftool.org/', cat: 'tools' },
        { name: 'FarmSubsidy', url: 'https://farmsubsidy.org/', cat: 'osint' },
        { name: 'FollowTheGrant', url: 'https://followthegrant.org/', cat: 'osint' },
        { name: 'Godot Engine', url: 'https://godotengine.org/', cat: 'dev' },
        { name: 'Gold Standard', url: 'https://registry.goldstandard.org/', cat: 'tools' },
        { name: 'Levchin Prize', url: 'https://rwc.iacr.org/LevchinPrize/', cat: 'crypto' },
        { name: 'Library of Leaks', url: 'https://search.libraryofleaks.org/', cat: 'osint' },
        { name: 'Aleph OCCRP', url: 'https://aleph.occrp.org/', cat: 'osint' },
        { name: 'Open VSX', url: 'https://open-vsx.org/', cat: 'dev' },
        { name: 'OpenSecrets', url: 'https://www.opensecrets.org/', cat: 'osint' },
        { name: 'Prism Break', url: 'https://prism-break.org/en/all/', cat: 'osint' },
        { name: 'PrivacyTests', url: 'https://privacytests.org/', cat: 'osint' },
        { name: 'Starlink Map', url: 'https://www.starlinkmap.org/', cat: 'tools' },
        { name: 'ToS;DR', url: 'https://tosdr.org/en', cat: 'tools' },
        { name: 'WebSDR', url: 'http://websdr.org/', cat: 'tools' },
        { name: 'ZoomQuilt', url: 'https://zoomquilt.org/', cat: 'game' },
        { name: 'BrandGuide', url: 'https://brandguide.page/', cat: 'design' },
        { name: 'Carbon', url: 'https://carbon.now.sh/', cat: 'dev' },
        { name: 'OSINT.sh', url: 'https://osint.sh/', cat: 'osint' },
        { name: 'Satellite Map', url: 'https://satellitemap.space/', cat: 'tools' },
        { name: 'FollowTheMoney', url: 'https://followthemoney.tech/', cat: 'osint' },
        { name: 'WhatWebCanDo', url: 'https://whatwebcando.today/', cat: 'dev' },
        { name: 'Cobalt Tools', url: 'https://cobalt.tools/', cat: 'tools' },
        { name: 'OffSec Tools', url: 'https://offsec.tools/', cat: 'osint' },
        { name: 'WebCode Tools', url: 'https://webcode.tools/', cat: 'dev' },
        { name: 'YTCH', url: 'https://ytch.tv/', cat: 'tools' },
        { name: 'HackTricks', url: 'https://book.hacktricks.wiki/en/index.html', cat: 'books' },
        { name: 'Public Work', url: 'https://public.work/', cat: 'design' },
        { name: 'Awesome Privacy', url: 'http://awesome-privacy.xyz/', cat: 'osint' },
        { name: 'ODCrawler', url: 'https://odcrawler.xyz/', cat: 'osint' },
        { name: 'WatchIPTV', url: 'https://watchiptv.xyz/', cat: 'tools' },
        { name: 'Web Check', url: 'https://web-check.xyz/', cat: 'osint' },
        { name: 'Illustroke', url: 'https://illustroke.com/en/generate', cat: 'design' },
        { name: 'UI Colors', url: 'https://uicolors.app/generate/', cat: 'design' },
        { name: 'Footer Design', url: 'https://www.footer.design/', cat: 'design' },
        { name: 'Flowbase', url: 'https://www.flowbase.co/illustrations', cat: 'design' },
        { name: 'CodeRocket', url: 'https://www.coderocket.app/', cat: 'dev' }
    ];

    const uplinkGrid = document.getElementById('uplink-grid');
    const uplinkSearch = document.getElementById('uplink-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const totalLinks = document.getElementById('total-links');

    function renderLinks(filter = 'all', search = '') {
        if (!uplinkGrid) return;
        uplinkGrid.innerHTML = '';

        const filtered = links.filter(l => {
            const matchCat = filter === 'all' || l.cat === filter;
            const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
                l.url.toLowerCase().includes(search.toLowerCase());
            return matchCat && matchSearch;
        });

        if (totalLinks) totalLinks.textContent = `${filtered.length} LINKS`;

        filtered.forEach(l => {
            const card = document.createElement('a');
            card.href = l.url;
            card.target = '_blank';
            card.className = 'link-card';
            card.innerHTML = `
                <div>
                    <div class="link-title">${l.name}</div>
                    <div class="link-url">${l.url.replace(/^https?:\/\//, '').substring(0, 30)}...</div>
                </div>
                <div class="link-cat">${l.cat.toUpperCase()}</div>
            `;
            uplinkGrid.appendChild(card);
        });
    }

    // Initial Render
    renderLinks();

    // Event Listeners
    if (uplinkSearch) {
        uplinkSearch.addEventListener('input', (e) => {
            const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
            renderLinks(activeFilter, e.target.value);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderLinks(btn.dataset.filter, uplinkSearch.value);
        });
    });

    // --- NOTES LOGIC ---

    const notes = [
        {
            id: 1,
            title: 'PROJECT: GENESIS',
            date: '2025-12-01',
            content: `
                <p>INITIATING SYSTEM LOG...</p>
                <p>The goal of Project Genesis is to establish a new paradigm in human-computer interaction. By merging biological inputs with digital processing, we can achieve a seamless flow of information.</p>
                <p>Current Status: Alpha Phase. Neural link stability is at 45%. Further calibration required.</p>
                <p>Next Steps: Increase bandwidth of the uplink interface and reduce latency in the feedback loop.</p>
            `
        },
        {
            id: 2,
            title: 'THE CYBORG MANIFESTO',
            date: '2025-11-20',
            content: `
                <p>"We are all cyborgs now."</p>
                <p>This statement is no longer a metaphor. With our smartphones, wearables, and constant connection to the grid, we have extended our biological capabilities.</p>
                <p>The question is not IF we will merge with machines, but HOW. Will we lose our humanity, or will we enhance it?</p>
                <p>I choose enhancement. I choose evolution.</p>
            `
        },
        {
            id: 3,
            title: 'SECURITY PROTOCOLS',
            date: '2025-10-15',
            content: `
                <p>WARNING: UNAUTHORIZED ACCESS ATTEMPT DETECTED.</p>
                <p>Reviewing security logs for Sector 7. Intrusion traces found in the subnet mask.</p>
                <p>Action Taken: Firewall reinforced. Honeypots deployed. Traceroute initiated.</p>
                <p>Reminder: Change root passwords weekly. Do not trust external drives.</p>
            `
        }
    ];

    const notesList = document.getElementById('notes-list');
    const noteTitle = document.getElementById('note-title');
    const noteMeta = document.getElementById('note-meta');
    const noteBody = document.getElementById('note-body');

    function renderNotesList() {
        if (!notesList) return;
        notesList.innerHTML = '';

        notes.forEach(note => {
            const item = document.createElement('div');
            item.className = 'note-item';
            item.textContent = note.title;
            item.addEventListener('click', () => loadNote(note, item));
            notesList.appendChild(item);
        });
    }

    function loadNote(note, itemElement) {
        // Update active state
        document.querySelectorAll('.note-item').forEach(el => el.classList.remove('active'));
        itemElement.classList.add('active');

        // Update content
        noteTitle.textContent = note.title;
        noteMeta.textContent = `DATE: ${note.date} // ID: ${note.id.toString().padStart(4, '0')}`;
        noteBody.innerHTML = note.content;
    }

    // Initial Render
    renderNotesList();
    // Load first note by default if exists
    if (notes.length > 0 && notesList.firstChild) {
        loadNote(notes[0], notesList.firstChild);
    }

    // --- CONTENT PROTECTION ---
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('keydown', event => {
        if (event.ctrlKey && (event.key === 'u' || event.key === 's' || event.key === 'i' || event.key === 'j')) {
            event.preventDefault();
        }
        if (event.key === 'F12') {
            event.preventDefault();
        }
    });

    console.log('SYSTEM ONLINE. WELCOME OPERATIVE.');
});
