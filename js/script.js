document.addEventListener('DOMContentLoaded', () => {
    // Initialize the interface
    initInterface();
    
    // Add event listeners
    addEventListeners();
    
    // Add visual effects
    addVisualEffects();
    
    // Add fullscreen functionality
    setupFullscreenMode();
});

// Function to handle fullscreen mode
function setupFullscreenMode() {
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const container = document.querySelector('.container');
    
    fullscreenBtn.addEventListener('click', () => {
        toggleFullScreen();
        playSound('click');
    });
    
    // Also allow double-click on the header to toggle fullscreen
    document.querySelector('.header').addEventListener('dblclick', () => {
        toggleFullScreen();
        playSound('click');
    });
    
    // Function to toggle fullscreen
    function toggleFullScreen() {
        if (!document.fullscreenElement && 
            !document.mozFullScreenElement && 
            !document.webkitFullscreenElement && 
            !document.msFullscreenElement) {
            // Enter fullscreen
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
            fullscreenBtn.innerHTML = "⛶";
            addGlitch();
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            fullscreenBtn.innerHTML = "⛶";
            addGlitch();
        }
    }
    
    // Update button when fullscreen state changes
    document.addEventListener('fullscreenchange', updateFullscreenButtonState);
    document.addEventListener('webkitfullscreenchange', updateFullscreenButtonState);
    document.addEventListener('mozfullscreenchange', updateFullscreenButtonState);
    document.addEventListener('MSFullscreenChange', updateFullscreenButtonState);
    
    function updateFullscreenButtonState() {
        if (document.fullscreenElement || 
            document.webkitFullscreenElement || 
            document.mozFullScreenElement ||
            document.msFullscreenElement) {
            fullscreenBtn.innerHTML = "⛶";
            fullscreenBtn.setAttribute('title', 'EXIT FULLSCREEN');
        } else {
            fullscreenBtn.innerHTML = "⛶";
            fullscreenBtn.setAttribute('title', 'ENTER FULLSCREEN');
        }
    }
}

function initInterface() {
    // Current date and time for logs
    updateDateTime();
    
    // Initialize the terminal typing effect for the first message
    const chatMessages = document.querySelectorAll('.chat-message');
    setTimeout(() => {
        typewriterEffect(chatMessages[0], 50);
    }, 1000);
    
    // Start image switching
    startImageSwitcher();
}

function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    }).replace(/\//g, ':');
    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    
    // Update the log entries with current date and time
    const logEntries = document.querySelectorAll('.log-time');
    logEntries.forEach(entry => {
        entry.textContent = `${date} - ${time}`;
    });
}

function addEventListeners() {
    // Menu navigation
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.section, .chat-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            
            // Update active menu item
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
            
            // Show the target section, hide others
            sections.forEach(section => {
                if (section.id === `${targetSection}-section`) {
                    section.classList.remove('hidden');
                    section.classList.add('visible');
                } else {
                    section.classList.remove('visible');
                    section.classList.add('hidden');
                }
            });
            
            // Add sound effect
            playSound('click');
        });
    });
    
    // Send button functionality
    const sendButton = document.querySelector('.send-btn');
    const textarea = document.querySelector('textarea');
    
    sendButton.addEventListener('click', () => {
        if (textarea.value.trim() !== '') {
            sendMessage(textarea.value);
            textarea.value = '';
            playSound('send');
        }
    });
    
    // Keypad functionality
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.addEventListener('click', () => {
            textarea.value += key.textContent;
            playSound('key');
        });
    });
    
    // Enter key in textarea
    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendButton.click();
        }
    });
}

function sendMessage(message) {
    const chatSection = document.getElementById('chat-section');
    const newMessage = document.createElement('div');
    newMessage.classList.add('chat-message');
    
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-sender');
    messageContent.textContent = `YOU: ${message.toUpperCase()}`;
    
    newMessage.appendChild(messageContent);
    chatSection.insertBefore(newMessage, document.querySelector('.input-area'));
    
    // Add typing effect
    typewriterEffect(newMessage, 30);
    
    // Auto-generate response after a delay
    setTimeout(() => {
        generateResponse(message);
    }, message.length * 30 + 1000);
    
    // Scroll to the new message
    newMessage.scrollIntoView({ behavior: 'smooth' });
}

function generateResponse(userMessage) {
    const responses = [
        "MINDFULNESS IS THE KEY TO EFFECTIVE CODE.",
        "EVERY BUG IS A LESSON IN PATIENCE.",
        "THE PATH TO CLEAN CODE IS LIKE THE BUDDHIST PATH.",
        "PROGRAMMING AND MEDITATION SHARE MUCH IN COMMON.",
        "SIMPLICITY BRINGS CLARITY TO BOTH CODE AND MIND.",
        "IN SIEM REAP, WE CODE WITH BOTH ANCIENT WISDOM AND FUTURE VISION.",
        "BALANCE IN CODE DESIGN REFLECTS BALANCE IN LIFE.",
        "THE MOST ELEGANT SOLUTION IS OFTEN THE SIMPLEST ONE."
    ];
    
    const chatSection = document.getElementById('chat-section');
    const newResponse = document.createElement('div');
    newResponse.classList.add('chat-message');
    
    const responseContent = document.createElement('div');
    responseContent.classList.add('message-sender');
    
    // Select a random response or a more specific one based on user message
    let responseText = '';    if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
        responseText = "ALIAS: GREETINGS FROM KRATIE. HOW MAY I ASSIST YOU TODAY?";
    } else if (userMessage.toLowerCase().includes('code') || userMessage.toLowerCase().includes('programming')) {
        responseText = "ALIAS: CODE IS LIKE A MEDITATION - REQUIRING FOCUS AND CLARITY OF MIND.";
    } else if (userMessage.toLowerCase().includes('buddhism') || userMessage.toLowerCase().includes('monk')) {
        responseText = "ALIAS: BUDDHIST PRINCIPLES GUIDE MY DEVELOPMENT WORK - SIMPLICITY, MINDFULNESS, PATIENCE.";    } else if (userMessage.toLowerCase().includes('cambodia') || userMessage.toLowerCase().includes('khmer')) {
        responseText = "ALIAS: I WAS BORN AND CURRENTLY LIVE IN KRATIE, WHERE I HAVE FOUND MY CALLING IN BOTH TECHNOLOGY AND SPIRITUALITY.";
    } else {
        // Random response
        const randomIndex = Math.floor(Math.random() * responses.length);
        responseText = `ALIAS: ${responses[randomIndex]}`;
    }
    
    responseContent.textContent = responseText;
    newResponse.appendChild(responseContent);
    chatSection.insertBefore(newResponse, document.querySelector('.input-area'));
    
    // Add typing effect
    typewriterEffect(newResponse, 50);
    
    // Scroll to the new message
    newResponse.scrollIntoView({ behavior: 'smooth' });
}

function typewriterEffect(element, speed) {
    const text = element.querySelector('.message-sender').textContent;
    element.querySelector('.message-sender').textContent = '';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.querySelector('.message-sender').textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

function addVisualEffects() {
    // Add random glitches
    setInterval(() => {
        if (Math.random() > 0.8) {
            addGlitch();
        }
    }, 5000);
    
    // Add screen flicker effect
    setInterval(() => {
        if (Math.random() > 0.9) {
            screenFlicker();
        }
    }, 8000);
}

// Age countdown functionality
function startAgeCountdown() {
    const ageElement = document.getElementById('age-countdown');
    let currentAge = 23;
    const birthdate = new Date('2002-01-01'); // Placeholder birthdate
    
    // Update age display initially
    ageElement.textContent = currentAge;
    
    // Calculate exact age in real-time
    setInterval(() => {
        const now = new Date();
        const ageInMilliseconds = now - birthdate;
        const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
        
        // Display age with increasing precision over time
        if (Math.random() > 0.7) {
            // Occasionally show age with decimal points for futuristic effect
            ageElement.textContent = ageInYears.toFixed(Math.floor(Math.random() * 7) + 1);
        } else {
            // Usually show as integer
            ageElement.textContent = Math.floor(ageInYears);
        }
    }, 2000);
}

function addGlitch() {
    const container = document.querySelector('.container');
    
    // Create multiple glitch elements for a more dramatic effect
    for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
        const glitch = document.createElement('div');
        glitch.classList.add('glitch');
        
        // Random position and size
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const width = Math.random() * 150 + 20;
        const height = Math.random() * 15 + 2;
        
        // Randomize the color between green and cyan
        const color = Math.random() > 0.3 ? 
            `rgba(0, ${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 100)}, 0.7)` : 
            `rgba(0, 255, 0, 0.7)`;
        
        glitch.style.cssText = `
            position: absolute;
            top: ${top}%;
            left: ${left}%;
            width: ${width}px;
            height: ${height}px;
            background-color: ${color};
            z-index: 10;
            pointer-events: none;
            box-shadow: 0 0 8px ${color};
            transform: skew(${Math.random() * 20 - 10}deg);
        `;
        
        container.appendChild(glitch);
        
        // Remove after a very short, random duration for a more glitchy effect
        setTimeout(() => {
            glitch.remove();
        }, Math.random() * 100 + 50);
    }
}

function screenFlicker() {
    const container = document.querySelector('.container');
    container.style.opacity = '0.7';
    
    setTimeout(() => {
        container.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        container.style.opacity = '0.8';
    }, 200);
    
    setTimeout(() => {
        container.style.opacity = '1';
    }, 300);
}

function playSound(type) {
    // Create audio element for sound effects
    const audio = new Audio();
    
    switch(type) {
        case 'click':
            audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADmgD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwAc0AAAAAAAAAABSAJAJAQgAAgAAAA5oZtpQHAAAAAAAAAAAAAAAAAAAA//sQxAADwAAB/gAAACAAAD/AAAAAAE9AIAAANJODmIA8DkweDZMH5BD+ykQH/y4PA+D4Pg+wfB8HwfB8AAAMAweD9wff5/nAfiMRDCgQ//s0xA8DwAAB/gAAACAAAD/AAAAAAKBAMBAAY8GRURICDAEMMD5QAFkwIEAXTAoIAtGAQgC6YMCALpg0IAzmFwgDOYLCAMZgYIAumCwgC2YLCAAIaYPC/5xcKmkcUCpph0L/nF31lkYEDBn//wA=';
            break;
        case 'key':
            audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADmgD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwAc0AAAAAAAAAABSAJAJAQgAAgAAAA5oZtpQHAAAAAAAAAAAAAAAAAAAA//sQxAADwAAB/gAAACAAAD/AAAAAAE9AIAAANJODmIA8DkweDZMH5BD+ykQH/y4PA+D4Pg+wfB8HwfB8AAAMAweD9wff5/nAfiMRDCgQ//skxA8DwAAB/gAAACAAAD/AAAAAAAKBAMBAAY8GRUfDBAYKGA8EAUzAgQBXMChAFkwOEAWTBgQBXMGBAG0wSEAVzAQQBdMDBACMwaEAQA=';
            break;
        case 'send':
            audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADmgD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwAc0AAAAAAAAAABSAJAJAQgAAgAAAA5oZtpQHAAAAAAAAAAAAAAAAAAAA//sQxAADwAAB/gAAACAAAD/AAAAAAE9AIAAANJODmIA8DkweDZMH5BD+ykQH/y4PA+D4Pg+wfB8HwfB8AAAMAweD9wff5/nAfiMRDCgQ//tExA8DwAAB/gAAACAAAD/AAAAAAPeBQQAALLy4ImAziMVBAQACxgKFAVzAgQBXMChAFswOEAVzBgQBXMGhAFswWEAYTBAQBlMFBAGcwSEAaTBIQBfMCBAGMwIEAYDAgQBgMCBAF4wGEAXzAYQBeMBhAGEwKEAOA=';
            break;
    }
    
    audio.volume = 0.3;
    audio.play();
}

// Image switching functionality
function startImageSwitcher() {    const profileImage = document.getElementById('profile-image');
    const profilePhoto = document.querySelector('.profile-photo');
    const images = [
        'img/photo_1.jpg', 
        'img/photo_2.jpg', 
        'img/photo_3.jpg',
        'img/photo_4.jpg'
    ];
    let currentIndex = 0;
      // Preload all images for smoother transitions
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Change image initially to ensure it's visible
    profileImage.src = images[currentIndex];
    
    // Add scanner effect overlay to profile
    const scannerOverlay = document.createElement('div');
    scannerOverlay.classList.add('scan-overlay');
    profilePhoto.appendChild(scannerOverlay);
    
    // Add data readout effect
    const dataReadout = document.createElement('div');
    dataReadout.classList.add('data-readout');
    dataReadout.innerHTML = "<span class='scanning'>SCANNING</span>";
    profilePhoto.appendChild(dataReadout);
      // Set interval to switch images faster (200ms instead of 300ms)
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        profileImage.src = images[currentIndex];
        
        // Add multiple glitch effects during image switch
        addGlitch();
        if (Math.random() > 0.5) {
            setTimeout(() => addGlitch(), 50);
        }
        
        // Update data readout randomly
        if (Math.random() > 0.7) {
            dataReadout.innerHTML = "<span class='scanning'>SCANNING</span> <span class='data'>" + 
                Math.floor(Math.random() * 10000).toString(16).padStart(4, '0') + "</span>";
        }
        
        // Add flickering effect randomly
        if (Math.random() > 0.8) {
            screenFlicker();
        }
        
        // Play sound effect occasionally
        if (Math.random() > 0.7) {
            playSound('click');
        }
    }, 300);
    
    // Start the age countdown
    startAgeCountdown();
}
