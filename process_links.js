const fs = require('fs');

const rawText = fs.readFileSync('raw_links.txt', 'utf8');

const existingLinks = [
    { name: 'ProfilePicture.ai', url: 'https://www.profilepicture.ai/', cat: 'ai' },
    { name: 'SnapEdit', url: 'https://snapedit.app/', cat: 'design' },
    { name: 'Remove.bg', url: 'https://www.remove.bg/', cat: 'design' },
    { name: 'MagicEraser', url: 'https://magicstudio.com/magiceraser', cat: 'design' },
    { name: 'Cleanup.pictures', url: 'https://cleanup.pictures/', cat: 'design' },
    { name: 'Unscreen', url: 'https://www.unscreen.com/', cat: 'design' },
    { name: 'Palette.fm', url: 'https://palette.fm/', cat: 'design' },
    { name: 'Cutout.pro', url: 'https://www.cutout.pro/', cat: 'design' },
    { name: 'VanceAI', url: 'https://vanceai.com/', cat: 'ai' },
    { name: 'PicWish', url: 'https://picwish.com/', cat: 'design' },
    { name: 'Fotor', url: 'https://www.fotor.com/', cat: 'design' },
    { name: 'Canva', url: 'https://www.canva.com/', cat: 'design' },
    { name: 'PhotoRoom', url: 'https://www.photoroom.com/', cat: 'design' },
    { name: 'Adobe Express', url: 'https://www.adobe.com/express/', cat: 'design' },
    { name: 'Pixlr', url: 'https://pixlr.com/', cat: 'design' },
    { name: 'BeFunky', url: 'https://www.befunky.com/', cat: 'design' },
    { name: 'iLoveIMG', url: 'https://www.iloveimg.com/', cat: 'tools' },
    { name: 'TinyPNG', url: 'https://tinypng.com/', cat: 'tools' },
    { name: 'Squoosh', url: 'https://squoosh.app/', cat: 'tools' },
    { name: 'Vector Magic', url: 'https://vectormagic.com/', cat: 'design' },
    { name: 'Convertio', url: 'https://convertio.co/', cat: 'tools' },
    { name: 'CloudConvert', url: 'https://cloudconvert.com/', cat: 'tools' },
    { name: 'Zamzar', url: 'https://www.zamzar.com/', cat: 'tools' },
    { name: '123Apps', url: 'https://123apps.com/', cat: 'tools' },
    { name: 'PDF Candy', url: 'https://pdfcandy.com/', cat: 'tools' },
    { name: 'SmallPDF', url: 'https://smallpdf.com/', cat: 'tools' },
    { name: 'iLovePDF', url: 'https://www.ilovepdf.com/', cat: 'tools' },
    { name: 'PDF24', url: 'https://tools.pdf24.org/', cat: 'tools' },
    { name: 'Sejda', url: 'https://www.sejda.com/', cat: 'tools' },
    { name: 'PDF Escape', url: 'https://www.pdfescape.com/', cat: 'tools' },
    { name: 'ChatGPT', url: 'https://chat.openai.com/', cat: 'ai' },
    { name: 'Claude', url: 'https://claude.ai/', cat: 'ai' },
    { name: 'Bard (Gemini)', url: 'https://gemini.google.com/', cat: 'ai' },
    { name: 'Perplexity', url: 'https://www.perplexity.ai/', cat: 'ai' },
    { name: 'Bing Chat', url: 'https://www.bing.com/chat', cat: 'ai' },
    { name: 'Hugging Face', url: 'https://huggingface.co/', cat: 'ai' },
    { name: 'Replicate', url: 'https://replicate.com/', cat: 'ai' },
    { name: 'Midjourney', url: 'https://www.midjourney.com/', cat: 'ai' },
    { name: 'DALL-E', url: 'https://openai.com/dall-e-3', cat: 'ai' },
    { name: 'Stable Diffusion', url: 'https://stability.ai/', cat: 'ai' },
    { name: 'GitHub', url: 'https://github.com/', cat: 'dev' },
    { name: 'GitLab', url: 'https://gitlab.com/', cat: 'dev' },
    { name: 'Bitbucket', url: 'https://bitbucket.org/', cat: 'dev' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com/', cat: 'dev' },
    { name: 'Dev.to', url: 'https://dev.to/', cat: 'dev' },
    { name: 'Hashnode', url: 'https://hashnode.com/', cat: 'dev' },
    { name: 'Medium', url: 'https://medium.com/', cat: 'books' },
    { name: 'Hacker News', url: 'https://news.ycombinator.com/', cat: 'osint' },
    { name: 'Product Hunt', url: 'https://www.producthunt.com/', cat: 'tools' },
    { name: 'Indie Hackers', url: 'https://www.indiehackers.com/', cat: 'dev' },
    { name: 'Shodan', url: 'https://www.shodan.io/', cat: 'osint' },
    { name: 'Censys', url: 'https://censys.io/', cat: 'osint' },
    { name: 'Maltego', url: 'https://www.maltego.com/', cat: 'osint' },
    { name: 'SpiderFoot', url: 'https://www.spiderfoot.net/', cat: 'osint' },
    { name: 'OSINT Framework', url: 'https://osintframework.com/', cat: 'osint' },
    { name: 'VirusTotal', url: 'https://www.virustotal.com/', cat: 'osint' },
    { name: 'UrlScan', url: 'https://urlscan.io/', cat: 'osint' },
    { name: 'Wayback Machine', url: 'https://archive.org/web/', cat: 'osint' },
    { name: 'HaveIBeenPwned', url: 'https://haveibeenpwned.com/', cat: 'osint' },
    { name: 'IntelTechniques', url: 'https://inteltechniques.com/', cat: 'osint' },
    { name: 'Google Scholar', url: 'https://scholar.google.com/', cat: 'books' },
    { name: 'ResearchGate', url: 'https://www.researchgate.net/', cat: 'books' },
    { name: 'Academia.edu', url: 'https://www.academia.edu/', cat: 'books' },
    { name: 'Sci-Hub', url: 'https://sci-hub.se/', cat: 'books' },
    { name: 'LibGen', url: 'https://libgen.is/', cat: 'books' },
    { name: 'Z-Library', url: 'https://z-lib.org/', cat: 'books' },
    { name: 'Open Library', url: 'https://openlibrary.org/', cat: 'books' },
    { name: 'Project Gutenberg', url: 'https://www.gutenberg.org/', cat: 'books' },
    { name: 'Standard Ebooks', url: 'https://standardebooks.org/', cat: 'books' },
    { name: 'ManyBooks', url: 'https://manybooks.net/', cat: 'books' }
];

const lines = rawText.split('\n').map(l => l.trim()).filter(l => l);
const newLinksMap = new Map();

function guessCat(url) {
    let check = url.toLowerCase();
    if (check.includes('osint') || check.includes('leak') || check.includes('geo') || check.includes('hunter') || check.includes('censys') || check.includes('shodan') || check.includes('intel') || check.includes('dorks') || check.includes('investigator') || check.includes('facecheck.id') || check.includes('epieos') || check.includes('social-searcher') || check.includes('pastvu') || check.includes('whatcms') || check.includes('securityheaders') || check.includes('crt.sh')) return 'osint';
    if (check.includes('netli') || check.includes('vercel') || check.includes('github') || check.includes('gitlab') || check.includes('code') || check.includes('dev') || check.includes('js') || check.includes('css') || check.includes('api') || check.includes('algo') || check.includes('repos') || check.includes('web')) return 'dev';
    if (check.includes('design') || check.includes('icon') || check.includes('svg') || check.includes('color') || check.includes('photo') || check.includes('bg') || check.includes('image') || check.includes('lottie') || check.includes('motion') || check.includes('illust') || check.includes('fonts') || check.includes('font') || check.includes('art') || check.includes('theme') || check.includes('ui')) return 'design';
    if (check.includes('ai') || check.includes('gpt') || check.includes('claude') || check.includes('midjourney') || check.includes('stable') || check.includes('dall') || check.includes('bot')) return 'ai';
    if (check.includes('book') || check.includes('lib') || check.includes('gutenberg') || check.includes('read') || check.includes('scholar') || check.includes('edu')) return 'books';
    if (check.includes('music') || check.includes('tube') || check.includes('sound')) return 'tools';
    return 'tools';
}

function extractName(url) {
    try {
        let u = new URL(url.startsWith('http') ? url : 'https://' + url);
        return u.hostname.replace('www.', '');
    } catch (e) {
        return url;
    }
}

existingLinks.forEach(link => {
    try {
        let u = new URL(link.url);
        newLinksMap.set(u.hostname + u.pathname, link);
    } catch (e) {
        newLinksMap.set(link.url, link);
    }
});

const finalNewLinks = [];

lines.forEach(line => {
    let url = line;
    try {
        let u = new URL(url);
        let key = u.hostname + u.pathname;
        if (!newLinksMap.has(key)) {
            let linkObj = {
                name: extractName(url),
                url: url,
                cat: guessCat(url)
            };
            linkObj.name = linkObj.name.charAt(0).toUpperCase() + linkObj.name.slice(1);
            newLinksMap.set(key, linkObj);
            finalNewLinks.push(linkObj);
        }
    } catch (e) {
    }
});

let output = '';
existingLinks.forEach(l => {
    output += "        { name: '" + l.name + "', url: '" + l.url + "', cat: '" + l.cat + "' },\n";
});
finalNewLinks.forEach(l => {
    output += "        { name: '" + l.name + "', url: '" + l.url + "', cat: '" + l.cat + "' },\n";
});

fs.writeFileSync('output_links.js', output);
console.log('Done writing output_links.js');
