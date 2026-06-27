// Build Script - Ajoute un hash aux fichiers pour forcer le rechargement
const fs = require('fs');
const crypto = require('crypto');

console.log('🔨 Build en cours...');

// Générer un hash basé sur la date
const timestamp = Date.now().toString();
const hash = crypto.createHash('md5').update(timestamp).digest('hex').substring(0, 8);

console.log(`📦 Version: ${hash}`);

// Lire index.html
let html = fs.readFileSync('index.html', 'utf8');

// Remplacer les URLs avec le hash
html = html.replace(/style\.css/g, `style.css?v=${hash}`);
html = html.replace(/game\.js/g, `game.js?v=${hash}`);
html = html.replace(/bears_system\.js/g, `bears_system.js?v=${hash}`);
html = html.replace(/updatechecker\.js/g, `updatechecker.js?v=${hash}`);

// Ajouter un meta version
const versionMeta = `<meta name="version" content="${hash}">`;
if (!html.includes('name="version"')) {
    html = html.replace('</head>', `${versionMeta}\n</head>`);
}

// Sauvegarder
fs.writeFileSync('index.html', html);

console.log('✅ Build terminé !');
console.log(`🚀 Version: ${hash}`);
console.log('');
console.log('Prochaines étapes:');
console.log('1. git add .');
console.log('2. git commit -m "Update ' + hash + '"');
console.log('3. git push');
