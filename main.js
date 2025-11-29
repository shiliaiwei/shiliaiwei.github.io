document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initToolSystem();
    initResourceSystem();
});

/* --- Navigation System --- */
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.hud-section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });
}

/* --- Tool System --- */
const toolRegistry = [
    // --- NETWORK ---
    {
        id: 'ipv4-calc',
        category: 'network',
        name: 'IPv4 CALCULATOR',
        render: () => `
            <div class="input-group">
                <label class="input-label">IP ADDRESS / CIDR</label>
                <input type="text" id="ipv4-input" placeholder="192.168.1.1/24">
            </div>
            <div class="tool-controls">
                <button id="btn-ipv4-calc" class="action-btn">CALCULATE</button>
            </div>
            <div class="tool-output" id="ipv4-output">Waiting for input...</div>
        `,
        init: () => {
            document.getElementById('btn-ipv4-calc').addEventListener('click', () => {
                const input = document.getElementById('ipv4-input').value.trim();
                const output = document.getElementById('ipv4-output');
                try {
                    const [ip, cidrStr] = input.split('/');
                    const cidr = parseInt(cidrStr || '24');
                    if (!ip || isNaN(cidr)) throw new Error("Invalid Format");

                    const ipParts = ip.split('.').map(Number);
                    if (ipParts.length !== 4 || ipParts.some(p => isNaN(p) || p < 0 || p > 255)) throw new Error("Invalid IP");

                    const mask = ~(2 ** (32 - cidr) - 1);
                    const ipNum = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
                    const netNum = ipNum & mask;
                    const broadNum = netNum | (~mask);

                    const numToIp = (num) => [
                        (num >>> 24) & 255,
                        (num >>> 16) & 255,
                        (num >>> 8) & 255,
                        num & 255
                    ].join('.');

                    output.innerHTML = `
                        Network:   ${numToIp(netNum)}
                        Broadcast: ${numToIp(broadNum)}
                        First IP:  ${numToIp(netNum + 1)}
                        Last IP:   ${numToIp(broadNum - 1)}
                        Hosts:     ${Math.pow(2, 32 - cidr) - 2}
                    `.replace(/\n/g, '<br>');
                } catch (e) {
                    output.textContent = "Error: Invalid IP/CIDR format (e.g., 192.168.1.1/24)";
                }
            });
        }
    },
    {
        id: 'mac-gen',
        category: 'network',
        name: 'MAC ADDRESS GENERATOR',
        render: () => `
            <div class="input-group">
                <label class="input-label">FORMAT</label>
                <select id="mac-format">
                    <option value="colon">Colon (MM:MM:MM:SS:SS:SS)</option>
                    <option value="dash">Dash (MM-MM-MM-SS-SS-SS)</option>
                    <option value="none">None (MMMMMMSSSSSS)</option>
                </select>
            </div>
            <div class="tool-controls">
                <button id="btn-mac-gen" class="action-btn">GENERATE</button>
            </div>
            <div class="tool-output" id="mac-output">Waiting...</div>
        `,
        init: () => {
            document.getElementById('btn-mac-gen').addEventListener('click', () => {
                const format = document.getElementById('mac-format').value;
                const hex = "0123456789ABCDEF";
                let mac = "";
                for (let i = 0; i < 12; i++) {
                    mac += hex[Math.floor(Math.random() * 16)];
                }

                let formatted = "";
                if (format === 'colon') formatted = mac.match(/.{1,2}/g).join(':');
                else if (format === 'dash') formatted = mac.match(/.{1,2}/g).join('-');
                else formatted = mac;

                document.getElementById('mac-output').textContent = formatted;
            });
        }
    },

    // --- CONVERTER ---
    {
        id: 'binary-conv',
        category: 'converter',
        name: 'BINARY TEXT CONVERTER',
        render: () => `
            <textarea id="bin-text" placeholder="Text input..."></textarea>
            <div class="tool-controls">
                <button id="btn-to-bin" class="action-btn">TEXT -> BINARY</button>
                <button id="btn-to-text" class="action-btn">BINARY -> TEXT</button>
            </div>
            <textarea id="bin-output" placeholder="Binary output..." readonly></textarea>
        `,
        init: () => {
            document.getElementById('btn-to-bin').addEventListener('click', () => {
                const text = document.getElementById('bin-text').value;
                document.getElementById('bin-output').value = text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
            });
            document.getElementById('btn-to-text').addEventListener('click', () => {
                const bin = document.getElementById('bin-output').value.trim();
                try {
                    document.getElementById('bin-text').value = bin.split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join('');
                } catch (e) { document.getElementById('bin-text').value = "Error parsing binary"; }
            });
        }
    },
    {
        id: 'base-enc',
        category: 'converter',
        name: 'BASE ENCODING',
        render: () => `
            <textarea id="base-input" placeholder="Input..."></textarea>
            <div class="input-group">
                <select id="base-method">
                    <option value="b64">Base64</option>
                    <option value="hex">Hex (Base16)</option>
                </select>
            </div>
            <div class="tool-controls">
                <button id="btn-base-enc" class="action-btn">ENCODE</button>
                <button id="btn-base-dec" class="action-btn">DECODE</button>
            </div>
            <textarea id="base-output" placeholder="Output..." readonly></textarea>
        `,
        init: () => {
            document.getElementById('btn-base-enc').addEventListener('click', () => {
                const input = document.getElementById('base-input').value;
                const method = document.getElementById('base-method').value;
                if (method === 'b64') document.getElementById('base-output').value = btoa(input);
                if (method === 'hex') document.getElementById('base-output').value = input.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
            });
            document.getElementById('btn-base-dec').addEventListener('click', () => {
                const input = document.getElementById('base-output').value;
                const method = document.getElementById('base-method').value;
                try {
                    if (method === 'b64') document.getElementById('base-input').value = atob(input);
                    if (method === 'hex') document.getElementById('base-input').value = input.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
                } catch (e) { document.getElementById('base-input').value = "Error decoding"; }
            });
        }
    },
    {
        id: 'speed-conv',
        category: 'converter',
        name: 'INTERNET SPEED CONVERTER',
        render: () => `
            <div class="input-group">
                <input type="number" id="speed-val" placeholder="Value">
                <select id="speed-unit">
                    <option value="Mbps">Mbps</option>
                    <option value="Kbps">Kbps</option>
                    <option value="Gbps">Gbps</option>
                    <option value="MBs">MB/s</option>
                </select>
            </div>
            <div class="tool-controls">
                <button id="btn-speed-conv" class="action-btn">CONVERT</button>
            </div>
            <div class="tool-output" id="speed-output">Result...</div>
        `,
        init: () => {
            document.getElementById('btn-speed-conv').addEventListener('click', () => {
                const val = parseFloat(document.getElementById('speed-val').value);
                const unit = document.getElementById('speed-unit').value;
                if (isNaN(val)) return;

                // Normalize to Mbps
                let mbps = 0;
                if (unit === 'Mbps') mbps = val;
                if (unit === 'Kbps') mbps = val / 1000;
                if (unit === 'Gbps') mbps = val * 1000;
                if (unit === 'MBs') mbps = val * 8;

                document.getElementById('speed-output').innerHTML = `
                    ${(mbps * 1000).toFixed(2)} Kbps<br>
                    ${mbps.toFixed(2)} Mbps<br>
                    ${(mbps / 1000).toFixed(4)} Gbps<br>
                    ${(mbps / 8).toFixed(2)} MB/s
                `;
            });
        }
    },
    {
        id: 'storage-conv',
        category: 'converter',
        name: 'DATA STORAGE CONVERTER',
        render: () => `
            <div class="input-group">
                <input type="number" id="store-val" placeholder="Value">
                <select id="store-unit">
                    <option value="B">Bytes</option>
                    <option value="KB">KB</option>
                    <option value="MB">MB</option>
                    <option value="GB">GB</option>
                    <option value="TB">TB</option>
                </select>
            </div>
            <div class="tool-controls">
                <button id="btn-store-conv" class="action-btn">CONVERT</button>
            </div>
            <div class="tool-output" id="store-output">Result...</div>
        `,
        init: () => {
            document.getElementById('btn-store-conv').addEventListener('click', () => {
                const val = parseFloat(document.getElementById('store-val').value);
                const unit = document.getElementById('store-unit').value;
                if (isNaN(val)) return;

                // Normalize to Bytes
                const units = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4 };
                const bytes = val * units[unit];

                document.getElementById('store-output').innerHTML = `
                    ${bytes} Bytes<br>
                    ${(bytes / 1024).toFixed(2)} KB<br>
                    ${(bytes / 1024 ** 2).toFixed(2)} MB<br>
                    ${(bytes / 1024 ** 3).toFixed(2)} GB<br>
                    ${(bytes / 1024 ** 4).toFixed(4)} TB
                `;
            });
        }
    },

    // --- GENERATOR ---
    {
        id: 'khmer-lorem',
        category: 'generator',
        name: 'KHMER LOREM IPSUM',
        render: () => `
            <div class="tool-controls">
                <button id="btn-kh-short" class="action-btn">SHORT</button>
                <button id="btn-kh-med" class="action-btn">MEDIUM</button>
                <button id="btn-kh-long" class="action-btn">LONG</button>
            </div>
            <textarea id="kh-output" readonly placeholder="Output..."></textarea>
        `,
        init: () => {
            const words = ["ខ្ញុំ", "ស្រលាញ់", "ប្រទេស", "កម្ពុជា", "សន្តិភាព", "ការអភិវឌ្ឍ", "បច្ចេកវិទ្យា", "សិក្សា", "ចំណេះដឹង", "វប្បធម៌", "ប្រាសាទ", "អង្គរវត្ត", "សមុទ្រ", "ភ្នំ", "ទន្លេ", "រីករាយ", "ជោគជ័យ", "អនាគត"];
            const gen = (count) => {
                let res = "";
                for (let i = 0; i < count; i++) res += words[Math.floor(Math.random() * words.length)] + " ";
                document.getElementById('kh-output').value = res.trim();
            };
            document.getElementById('btn-kh-short').addEventListener('click', () => gen(10));
            document.getElementById('btn-kh-med').addEventListener('click', () => gen(30));
            document.getElementById('btn-kh-long').addEventListener('click', () => gen(60));
        }
    },
    {
        id: 'eng-lorem',
        category: 'generator',
        name: 'ENGLISH PARAGRAPH GEN',
        render: () => `
            <div class="tool-controls">
                <button id="btn-en-gen" class="action-btn">GENERATE PARAGRAPH</button>
            </div>
            <textarea id="en-output" readonly placeholder="Output..."></textarea>
        `,
        init: () => {
            const phrases = ["The quick brown fox jumps over the lazy dog.", "Innovation distinguishes between a leader and a follower.", "Stay hungry, stay foolish.", "Code is poetry.", "Simplicity is the ultimate sophistication."];
            document.getElementById('btn-en-gen').addEventListener('click', () => {
                let res = "";
                for (let i = 0; i < 5; i++) res += phrases[Math.floor(Math.random() * phrases.length)] + " ";
                document.getElementById('en-output').value = res.trim();
            });
        }
    },
    {
        id: 'qr-gen',
        category: 'generator',
        name: 'QR CODE GENERATOR',
        render: () => `
            <input type="text" id="qr-text" placeholder="Enter text or URL">
            <div class="tool-controls">
                <button id="btn-qr-gen" class="action-btn">GENERATE QR</button>
            </div>
            <div class="qr-output" id="qr-display"></div>
        `,
        init: () => {
            document.getElementById('btn-qr-gen').addEventListener('click', () => {
                const text = document.getElementById('qr-text').value;
                const container = document.getElementById('qr-display');
                container.innerHTML = "";
                if (text) {
                    const qrWrapper = document.createElement('div');
                    new QRCode(qrWrapper, { text: text, width: 128, height: 128 });
                    container.appendChild(qrWrapper);

                    // Add download button
                    const downloadBtn = document.createElement('button');
                    downloadBtn.className = 'download-btn';
                    downloadBtn.textContent = 'DOWNLOAD QR CODE';
                    downloadBtn.onclick = () => {
                        setTimeout(() => {
                            const canvas = qrWrapper.querySelector('canvas');
                            if (canvas) {
                                const link = document.createElement('a');
                                link.download = 'qrcode.png';
                                link.href = canvas.toDataURL();
                                link.click();
                            }
                        }, 100);
                    };
                    container.appendChild(downloadBtn);
                }
            });
        }
    },
    {
        id: 'pass-gen',
        category: 'generator',
        name: 'PASSWORD GENERATOR',
        render: () => `
            <div class="pass-options">
                <label><input type="checkbox" id="pg-up" checked> A-Z</label>
                <label><input type="checkbox" id="pg-num" checked> 0-9</label>
                <label><input type="checkbox" id="pg-sym" checked> #$@</label>
                <input type="number" id="pg-len" value="16" min="8" max="64" style="width:60px">
            </div>
            <div class="tool-controls">
                <button id="btn-pg-gen" class="action-btn">GENERATE</button>
            </div>
            <div class="tool-output" id="pg-output">...</div>
        `,
        init: () => {
            document.getElementById('btn-pg-gen').addEventListener('click', () => {
                const len = parseInt(document.getElementById('pg-len').value);
                const useUp = document.getElementById('pg-up').checked;
                const useNum = document.getElementById('pg-num').checked;
                const useSym = document.getElementById('pg-sym').checked;

                let chars = "abcdefghijklmnopqrstuvwxyz";
                if (useUp) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                if (useNum) chars += "0123456789";
                if (useSym) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

                let pass = "";
                for (let i = 0; i < len; i++) pass += chars[Math.floor(Math.random() * chars.length)];
                document.getElementById('pg-output').textContent = pass;
            });
        }
    },
    {
        id: 'color-pal',
        category: 'generator',
        name: 'COLOR PALETTE GEN',
        render: () => `
            <input type="color" id="cp-input" value="#ff0055" style="width:100%; height:40px;">
            <div class="palette-grid" id="cp-grid"></div>
        `,
        init: () => {
            const update = () => {
                const hex = document.getElementById('cp-input').value;
                const grid = document.getElementById('cp-grid');
                grid.innerHTML = "";
                // Simple logic: generate 5 shades
                for (let i = 0; i < 5; i++) {
                    const div = document.createElement('div');
                    div.className = 'palette-color';
                    div.style.backgroundColor = hex;
                    div.style.opacity = 1 - (i * 0.15);
                    grid.appendChild(div);
                }
            };
            document.getElementById('cp-input').addEventListener('input', update);
            update();
        }
    },

    // --- CRYPTO ---
    {
        id: 'block-cipher',
        category: 'crypto',
        name: 'BLOCK CIPHER (AES)',
        render: () => `
            <textarea id="aes-text" placeholder="Message..."></textarea>
            <input type="text" id="aes-key" placeholder="Secret Key">
            <div class="tool-controls">
                <button id="btn-aes-enc" class="action-btn">ENCRYPT</button>
                <button id="btn-aes-dec" class="action-btn">DECRYPT</button>
            </div>
            <textarea id="aes-output" readonly placeholder="Result..."></textarea>
        `,
        init: () => {
            document.getElementById('btn-aes-enc').addEventListener('click', () => {
                const msg = document.getElementById('aes-text').value;
                const key = document.getElementById('aes-key').value;
                if (msg && key) document.getElementById('aes-output').value = CryptoJS.AES.encrypt(msg, key).toString();
            });
            document.getElementById('btn-aes-dec').addEventListener('click', () => {
                const msg = document.getElementById('aes-output').value;
                const key = document.getElementById('aes-key').value;
                try {
                    if (msg && key) document.getElementById('aes-text').value = CryptoJS.AES.decrypt(msg, key).toString(CryptoJS.enc.Utf8);
                } catch (e) { document.getElementById('aes-text').value = "Decryption Failed"; }
            });
        }
    },
    {
        id: 'hmac-gen',
        category: 'crypto',
        name: 'HMAC GENERATOR',
        render: () => `
            <input type="text" id="hmac-msg" placeholder="Message">
            <input type="text" id="hmac-key" placeholder="Secret Key">
            <select id="hmac-algo">
                <option value="MD5">MD5</option>
                <option value="SHA1">SHA1</option>
                <option value="SHA256">SHA256</option>
            </select>
            <div class="tool-controls">
                <button id="btn-hmac" class="action-btn">GENERATE HMAC</button>
            </div>
            <div class="tool-output" id="hmac-output">...</div>
        `,
        init: () => {
            document.getElementById('btn-hmac').addEventListener('click', () => {
                const msg = document.getElementById('hmac-msg').value;
                const key = document.getElementById('hmac-key').value;
                const algo = document.getElementById('hmac-algo').value;
                if (msg && key) {
                    let hash;
                    if (algo === 'MD5') hash = CryptoJS.HmacMD5(msg, key);
                    if (algo === 'SHA1') hash = CryptoJS.HmacSHA1(msg, key);
                    if (algo === 'SHA256') hash = CryptoJS.HmacSHA256(msg, key);
                    document.getElementById('hmac-output').textContent = hash.toString();
                }
            });
        }
    },

    // --- GAME ---
    {
        id: 'tic-tac-toe',
        category: 'game',
        name: 'TACTICAL SIMULATION',
        render: () => `
            <div class="ttt-grid" id="ttt-board"></div>
            <div class="game-info">
                <span id="ttt-status">TURN: X</span>
                <button id="btn-ttt-reset" class="action-btn small">RESET</button>
            </div>
        `,
        init: () => {
            let board = Array(9).fill(null);
            let turn = 'X';
            const renderBoard = () => {
                const el = document.getElementById('ttt-board');
                el.innerHTML = '';
                board.forEach((cell, i) => {
                    const div = document.createElement('div');
                    div.className = `ttt-cell ${cell ? cell.toLowerCase() : ''}`;
                    div.textContent = cell || '';
                    div.onclick = () => move(i);
                    el.appendChild(div);
                });
            };
            const move = (i) => {
                if (board[i] || checkWin()) return;
                board[i] = turn;
                turn = turn === 'X' ? 'O' : 'X';
                document.getElementById('ttt-status').textContent = checkWin() ? `WINNER: ${checkWin()}` : `TURN: ${turn}`;
                renderBoard();
            };
            const checkWin = () => {
                const wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
                for (let w of wins) {
                    if (board[w[0]] && board[w[0]] === board[w[1]] && board[w[0]] === board[w[2]]) return board[w[0]];
                }
                return null;
            };
            document.getElementById('btn-ttt-reset').addEventListener('click', () => {
                board = Array(9).fill(null);
                turn = 'X';
                document.getElementById('ttt-status').textContent = "TURN: X";
                renderBoard();
            });
            renderBoard();
        }
    }
];

function initToolSystem() {
    const grid = document.getElementById('tools-grid');
    const catButtons = document.querySelectorAll('.cat-btn');

    const renderTools = (category) => {
        grid.innerHTML = '';
        toolRegistry.forEach(tool => {
            if (category === 'all' || tool.category === category) {
                const card = document.createElement('div');
                card.className = 'tool-card';
                card.innerHTML = `
                    <h3 class="tool-title">${tool.name}</h3>
                    <div class="tool-interface">${tool.render()}</div>
                `;
                grid.appendChild(card);
                setTimeout(tool.init, 0); // Init logic after render
            }
        });
    };

    catButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            catButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTools(btn.getAttribute('data-cat'));
        });
    });

    renderTools('all');
}

/* --- Resource System --- */
const resources = [
    { name: "Profile Picture AI", url: "https://www.profilepicture.ai/" },
    { name: "Haikei", url: "https://haikei.app/" },
    { name: "GitStalk", url: "https://gitstalk.netlify.app/eirsvi" },
    { name: "Khmer CRFSuite", url: "https://khmer-crfsuite.netlify.app/" },
    { name: "Khmer CharMap", url: "https://khmercharmap.netlify.app/" },
    { name: "Khmer MMO", url: "http://khmermmo.netlify.app/" },
    { name: "LatLng", url: "http://latlng.netlify.app/" },
    { name: "WinXP Keys", url: "https://thorium.rocks/winxp/keys.html" },
    { name: "GetWaves", url: "https://getwaves.io/" },
    { name: "RExpository", url: "https://jaimepolop.github.io/RExpository/" },
    { name: "Forensic OSINT", url: "https://www.forensicosint.com/tor" },
    { name: "UserSearch AI", url: "https://usersearch.ai/" },
    { name: "LottieFiles", url: "https://lottiefiles.com/" },
    { name: "Motion Dev", url: "https://motion.dev/" },
    { name: "Three.js", url: "https://threejs.org/" },
    { name: "AOS", url: "https://michalsnik.github.io/aos/" },
    { name: "GSAP", url: "https://gsap.com/" },
    { name: "ID Generator", url: "https://idgenerator-xi.vercel.app/" },
    { name: "Vue Color Avatar", url: "https://vue-color-avatar.leoku.dev/" },
    { name: "Efecto", url: "https://efecto.app/" },
    { name: "CSS Shape", url: "https://css-shape.com/" },
    { name: "Anime.js", url: "https://animejs.com/" },
    { name: "FontAwesome", url: "https://fontawesome.com" },
    { name: "FlatIcon", url: "https://flaticon.com" },
    { name: "IconFinder", url: "https://iconfinder.com" },
    { name: "Material Icons", url: "https://material.io/resources/icons/" },
    { name: "Icons8", url: "https://icons8.com" },
    { name: "BoxIcons", url: "https://boxicons.com" },
    { name: "Feather Icons", url: "https://feathericons.com" },
    { name: "IcoFont", url: "https://icofont.com" },
    { name: "SVGHub", url: "https://svghub.app" },
    { name: "Tabler Icons", url: "https://tabler-icon.io" },
    { name: "IconsMind", url: "https://iconsmind.com" },
    { name: "IconMonstr", url: "https://iconmonstr.com" },
    { name: "SVGRepo", url: "https://svgrepo.com" },
    { name: "GreenScreenMemes", url: "https://greenscreenmemes.com/" },
    { name: "Project Gutenberg", url: "https://gutenberg.org" },
    { name: "Internet Archive", url: "https://archive.org" },
    { name: "Open Library", url: "https://openlibrary.org" },
    { name: "PDFBooksWorld", url: "https://pdfbooksworld.com" },
    { name: "DigiLibraries", url: "https://digilibrary.com" },
    { name: "ManyBooks", url: "https://manybooks.net" },
    { name: "BookBoon", url: "https://bookboon.com" },
    { name: "Free-Ebooks", url: "https://free-ebooks.net" },
    { name: "Standard Ebooks", url: "https://standardebooks.org" },
    { name: "Animate.css", url: "https://animate.style/" },
    { name: "Plotly", url: "https://plotly.com/graphing-libraries/" },
    { name: "Particles.js", url: "https://particles.js.org/" },
    { name: "Vanta.js", url: "https://www.vantajs.com/" },
    { name: "Animista", url: "https://animista.net/" },
    { name: "Cytoscape.js", url: "https://js.cytoscape.org/" },
    { name: "Babylon.js", url: "https://www.babylonjs.com/" },
    { name: "WebVM", url: "https://webvm.io/" },
    { name: "OWASP Calculator", url: "https://javierolmedo.github.io/OWASP-Calculator/" },
    { name: "Hoppscotch", url: "https://hoppscotch.io/" },
    { name: "GhIntel", url: "https://ghintel.secrets.ninja" },
    { name: "Phone2Skype", url: "https://www.vedbex.com/phone2skype" },
    { name: "SQLMapCG", url: "https://acorzo1983.github.io/SQLMapCG/" },
    { name: "Social Searcher", url: "https://www.social-searcher.com/google-social-search/" },
    { name: "AvatarAPI", url: "https://www.avatarapi.com/" },
    { name: "WebMii", url: "https://webmii.com/" },
    { name: "Epieos", url: "https://epieos.com/?r=1" },
    { name: "Facebook Search", url: "https://facebook-all-in-one.com/#/search" },
    { name: "Hotsheet", url: "https://www.hotsheet.com/inoitsu/" },
    { name: "SkyVector", url: "https://skyvector.com/" },
    { name: "PlantNet", url: "https://identify.plantnet.org/" },
    { name: "GTD", url: "https://www.start.umd.edu/data-tools/GTD" },
    { name: "BirdHunt", url: "https://birdhunt.huntintel.io/" },
    { name: "PastVu", url: "https://pastvu.com/?g=" },
    { name: "Otwarte Zrodla", url: "https://otwartezrodla.pl/" },
    { name: "OsomeNet", url: "https://osome.iu.edu/tools/osomenet/" },
    { name: "MKDev Testing", url: "https://github.com/mkdev55/testing" },
    { name: "Awesome Playgrounds", url: "https://github.com/mkdev55/awesome-playgrounds" },
    { name: "Google Dorks", url: "https://dorks.faisalahmed.me/#" },
    { name: "DorkSearch", url: "https://dorksearch.com/" },
    { name: "Crt.sh", url: "https://crt.sh/?q=rpitssr.edu.kh" },
    { name: "WhatCMS", url: "https://whatcms.org/?s=rpitssr.edu.kh" },
    { name: "Grep.app", url: "https://grep.app/" },
    { name: "Security Headers", url: "https://securityheaders.com/" },
    { name: "Investigator", url: "https://abhijithb200.github.io/investigator/" },
    { name: "Lenso", url: "https://lenso.ai/" },
    { name: "Signaturely", url: "https://signaturely.com/online-signature/draw/" },
    { name: "SiteInspire", url: "https://www.siteinspire.com/" },
    { name: "SitesLike", url: "https://m.siteslike.com/" },
    { name: "SQLPD", url: "https://sqlpd.com/" },
    { name: "InterfaceInGame", url: "https://interfaceingame.com/" },
    { name: "Checklist Design", url: "https://www.checklist.design/" },
    { name: "SS64", url: "https://ss64.com/" },
    { name: "Submarine Cable Map", url: "http://submarinecablemap.com/" },
    { name: "TextFiles Directory", url: "http://cd.textfiles.com/directory.html" },
    { name: "The Algorithms", url: "https://the-algorithms.com/" },
    { name: "The Useless Web", url: "https://theuselessweb.com/" },
    { name: "They See Your Photos", url: "https://theyseeyourphotos.com/" },
    { name: "Top 1000 Repos", url: "https://top1000repos.com/" },
    { name: "Understanding Accessibility", url: "https://www.understandingaccessibility.com/" },
    { name: "Wheel of Names", url: "https://wheelofnames.com/" },
    { name: "Who Is In Space", url: "http://whoisinspace.com/" },
    { name: "MusicFX", url: "https://aitestkitchen.withgoogle.com/tools/music-fx" },
    { name: "A to Z of AI", url: "https://atozofai.withgoogle.com/" },
    { name: "Google Experiments", url: "https://experiments.withgoogle.com/experiments" },
    { name: "Google Partners", url: "https://partnersdirectory.withgoogle.com/?premier=true" },
    { name: "Prebunking", url: "https://prebunking.withgoogle.com/" },
    { name: "QuickDraw", url: "http://quickdraw.withgoogle.com/" },
    { name: "Reader Revenue", url: "https://readerrevenue.withgoogle.com/" },
    { name: "Visual Blocks", url: "https://visualblocks.withgoogle.com/#/" },
    { name: "Unknown Cheats", url: "https://www.unknowncheats.me/forum/index.php" },
    { name: "Lazarus Reports", url: "https://lazarus.day/reports/" },
    { name: "Exit Node", url: "https://exitno.de/" },
    { name: "IP Calc", url: "https://jodies.de/ipcalc" },
    { name: "Iconify", url: "https://icon-sets.iconify.design/" },
    { name: "ContainerLab", url: "https://containerlab.dev/" },
    { name: "MKQL", url: "https://mkql.deno.dev/" },
    { name: "GeoHints", url: "https://geohints.com/" },
    { name: "Tiny Helpers", url: "https://tiny-helpers.dev/latest" },
    { name: "Soar Earth", url: "https://soar.earth/" },
    { name: "Open Security Data", url: "https://opensecuritydata.eu/" },
    { name: "The Eye", url: "https://the-eye.eu/" },
    { name: "Game Theory Games", url: "https://www.zweigmedia.com/RealWorld/gametheory/games.html" },
    { name: "Neal.fun", url: "https://neal.fun/" },
    { name: "OG Image Gallery", url: "https://www.ogimage.gallery/" },
    { name: "NASA Eyes", url: "https://eyes.nasa.gov/apps/mrn/#/mars" },
    { name: "FaceCheck ID", url: "http://facecheck.id/" },
    { name: "Crypto Papers", url: "https://cryptopapers.info/" },
    { name: "Whole Earth", url: "https://wholeearth.info/" },
    { name: "Censys Search", url: "https://search.censys.io/" },
    { name: "Element", url: "https://element.io/" },
    { name: "FindEmail", url: "https://findemail.io/" },
    { name: "Map of GitHub", url: "https://anvaka.github.io/map-of-github/#2/0/0" },
    { name: "Cipher387", url: "https://cipher387.github.io/" },
    { name: "Movies for Hackers", url: "https://entozoon.github.io/movies-for-hackers/" },
    { name: "OSINT Cheat Sheet", url: "https://jieyab89.github.io/OSINT-Cheat-sheet/Web-Based/" },
    { name: "AI For Beginners", url: "https://microsoft.github.io/AI-For-Beginners/" },
    { name: "FossFLOW", url: "https://stan-smith.github.io/FossFLOW/" },
    { name: "GreyNoise Viz", url: "https://viz.greynoise.io/" },
    { name: "Investigative Data", url: "https://investigativedata.io/" },
    { name: "IP Geolocation", url: "https://ipgeolocation.io/" },
    { name: "K3s", url: "https://k3s.io/" },
    { name: "Keyword Tool", url: "https://keywordtool.io/" },
    { name: "LabEx Linux", url: "https://labex.io/learn/linux" },
    { name: "Nuclei", url: "https://nuclei.projectdiscovery.io/" },
    { name: "Shodan", url: "https://www.shodan.io/" },
    { name: "TTS IDRI", url: "https://tts.idri.edu.kh/" },
    { name: "ODA CDC", url: "http://oda.cdc.gov.kh/" },
    { name: "MAFF eLibrary", url: "https://elibrary.maff.gov.kh/" },
    { name: "NCDD DB", url: "https://db.ncdd.gov.kh/" },
    { name: "Prisoners Dilemma", url: "http://www.prisoners-dilemma.com/#java" },
    { name: "MobLab Games", url: "https://www.moblab.com/edu/games/catalog/all" },
    { name: "Browser.lol", url: "https://browser.lol/" },
    { name: "Hunch.ly", url: "https://www.hunch.ly/" },
    { name: "VibeCheck", url: "https://vibecheck.market/" },
    { name: "KYC Not Me", url: "https://kycnot.me/" },
    { name: "NCase Trust", url: "https://ncase.me/trust/" },
    { name: "OSINT Swiss Army", url: "https://start.me/p/QLjzR2/osint-switzerland-army-knife" },
    { name: "Portainer Templates", url: "https://portainer-templates.as93.net/" },
    { name: "Brand Guidelines", url: "https://brandguidelines.net/" },
    { name: "FMHY", url: "https://fmhy.net/" },
    { name: "Game Theory", url: "https://gametheory.net/" },
    { name: "GeoTips", url: "https://geotips.net/" },
    { name: "NirSoft", url: "https://nirsoft.net/" },
    { name: "OSINT Feeds", url: "https://knowledgebase.plessas.net/OSINT-Feeds-159ccea41cfa808694c2d7245be8f841" },
    { name: "SQLZoo", url: "https://sqlzoo.net/wiki/SELECT_basics" },
    { name: "Subdomain Finder", url: "https://subdomainfinder.c99.nl/" },
    { name: "JSLinux", url: "https://bellard.org/jslinux/" },
    { name: "Deep Learning Book", url: "https://deeplearningbook.org/" },
    { name: "EconGraphs", url: "https://econgraphs.org/" },
    { name: "Remix Ethereum", url: "https://remix.ethereum.org/" },
    { name: "ExifTool", url: "https://exiftool.org/" },
    { name: "FarmSubsidy", url: "https://farmsubsidy.org/" },
    { name: "FollowTheGrant", url: "https://followthegrant.org/" },
    { name: "Godot Engine", url: "https://godotengine.org/" },
    { name: "Gold Standard", url: "https://registry.goldstandard.org/" },
    { name: "Levchin Prize", url: "https://rwc.iacr.org/LevchinPrize/" },
    { name: "Library of Leaks", url: "https://search.libraryofleaks.org/" },
    { name: "OCCRP Aleph", url: "https://aleph.occrp.org/" },
    { name: "Open VSX", url: "https://open-vsx.org/" },
    { name: "OpenSecrets", url: "https://www.opensecrets.org/" },
    { name: "Prism Break", url: "https://prism-break.org/en/all/" },
    { name: "PrivacyTests", url: "https://privacytests.org/" },
    { name: "Starlink Map", url: "https://www.starlinkmap.org/" },
    { name: "ToS;DR", url: "https://tosdr.org/en" },
    { name: "WebSDR", url: "http://websdr.org/" },
    { name: "ZoomQuilt", url: "https://zoomquilt.org/" },
    { name: "BrandGuide", url: "https://brandguide.page/" },
    { name: "Carbon", url: "https://carbon.now.sh/" },
    { name: "OSINT.sh", url: "https://osint.sh/" },
    { name: "Satellite Map", url: "https://satellitemap.space/" },
    { name: "Follow The Money", url: "https://followthemoney.tech/" },
    { name: "What Web Can Do", url: "https://whatwebcando.today/" },
    { name: "Cobalt Tools", url: "https://cobalt.tools/" },
    { name: "OffSec Tools", url: "https://offsec.tools/" },
    { name: "WebCode Tools", url: "https://webcode.tools/" },
    { name: "YTCH", url: "https://ytch.tv/" },
    { name: "HackTricks", url: "https://book.hacktricks.wiki/en/index.html" },
    { name: "Public Work", url: "https://public.work/" },
    { name: "Awesome Privacy", url: "http://awesome-privacy.xyz/" },
    { name: "ODCrawler", url: "https://odcrawler.xyz/" },
    { name: "WatchIPTV", url: "https://watchiptv.xyz/" },
    { name: "Web Check", url: "https://web-check.xyz/" },
    { name: "Illustroke", url: "https://illustroke.com/en/generate" },
    { name: "UI Colors", url: "https://uicolors.app/generate/" },
    { name: "Footer Design", url: "https://www.footer.design/" },
    { name: "Flowbase Illus", url: "https://www.flowbase.co/illustrations" },
    { name: "CodeRocket", url: "https://www.coderocket.app/" }
];

function initResourceSystem() {
    const grid = document.getElementById('resource-grid');
    const search = document.getElementById('resource-search');

    const render = (filter = "") => {
        grid.innerHTML = "";
        const lowerFilter = filter.toLowerCase();
        resources.forEach(res => {
            if (res.name.toLowerCase().includes(lowerFilter)) {
                const card = document.createElement('a');
                card.href = res.url;
                card.target = "_blank";
                card.className = 'resource-card';
                card.innerHTML = `
                    <div class="resource-name">${res.name}</div>
                    <div class="resource-url">${res.url}</div>
                `;
                grid.appendChild(card);
            }
        });
    };

    search.addEventListener('input', (e) => render(e.target.value));
    render();
}
