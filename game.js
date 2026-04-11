// Bee Swarm Simulator - Web Edition
// Jeu complet avec authentification

// ==================== AUTHENTIFICATION ====================
const ALLOWED_EMAILS = ['grandmael030@mail.com', 'grandmael030@gmail.com'];
const PASSWORD_HASH = 'Mael04022012';

class Auth {
    constructor() {
        this.emailInput = document.getElementById('emailInput');
        this.passwordInput = document.getElementById('passwordInput');
        this.loginBtn = document.getElementById('loginBtn');
        this.loginError = document.getElementById('loginError');
        this.loginScreen = document.getElementById('loginScreen');
        this.gameScreen = document.getElementById('gameScreen');
        
        // ============== MODE DEV BYPASS ==============
        // Ajoute ?dev=1 à l'URL pour skipper la connexion
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('dev') === '1' || localStorage.getItem('beeSwarm_dev') === '1') {
            console.log('DEV MODE: Bypassing login...');
            setTimeout(() => this.devBypass(), 100);
            return;
        }
        
        // Check for auto-login from URL first
        if (this.checkUrlAutoLogin()) {
            return; // Auto-login en cours, ne pas continuer
        }
        
        // Check for saved login
        if (this.checkSavedLogin()) {
            return; // Auto-login en cours, ne pas continuer
        }
        
        this.loginBtn.addEventListener('click', () => this.login());
        
        // Enter sur email passe au mot de passe
        this.emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.passwordInput.focus();
            }
        });
        
        // Enter sur password = login
        this.passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.login();
            }
        });
        
        // Tab navigation fluide
        this.emailInput.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && !e.shiftKey) {
                e.preventDefault();
                this.passwordInput.focus();
            }
        });
        
        this.passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && e.shiftKey) {
                e.preventDefault();
                this.emailInput.focus();
            }
        });
        
        // Public play button (no login required)
        const playPublicBtn = document.getElementById('playPublicBtn');
        if (playPublicBtn) {
            playPublicBtn.addEventListener('click', () => this.playPublic());
        }
        
        // Public user registration and login
        this.usernameInput = document.getElementById('usernameInput');
        this.userPasswordInput = document.getElementById('userPasswordInput');
        this.registerBtn = document.getElementById('registerBtn');
        this.userLoginBtn = document.getElementById('userLoginBtn');
        
        if (this.registerBtn) {
            this.registerBtn.addEventListener('click', () => this.registerUser());
        }
        if (this.userLoginBtn) {
            this.userLoginBtn.addEventListener('click', () => this.loginUser());
        }
        
        // Enter key support for user login
        if (this.userPasswordInput) {
            this.userPasswordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.loginUser();
                }
            });
        }
        
        // Check for saved user login
        this.checkSavedUserLogin();
    }
    
    devBypass() {
        // Mode développeur - skip tout
        this.loginScreen.classList.remove('active');
        this.gameScreen.classList.add('active');
        game.init();
        console.log('DEV MODE: Logged in as admin');
    }
    
    checkUrlAutoLogin() {
        // Get email from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const emailFromUrl = urlParams.get('email');
        
        if (emailFromUrl) {
            // Check if it's a valid email
            const validEmails = ['grandmael030@mail.com', 'grandmael030@gmail.com'];
            if (validEmails.includes(emailFromUrl.toLowerCase())) {
                // Auto-fill email
                this.emailInput.value = emailFromUrl;
                
                // Try auto-login if password is also in URL
                const passwordFromUrl = urlParams.get('pwd');
                if (passwordFromUrl && passwordFromUrl === PASSWORD_HASH) {
                    setTimeout(() => {
                        this.autoLogin(emailFromUrl, PASSWORD_HASH);
                    }, 100);
                    return true;
                }
            }
        }
        return false;
    }
    
    checkSavedLogin() {
        // Check localStorage for saved credentials
        const savedEmail = localStorage.getItem('beeSwarm_email');
        const savedPassword = localStorage.getItem('beeSwarm_password');
        const rememberMe = localStorage.getItem('beeSwarm_remember') === 'true';
        
        console.log('Checking saved login:', savedEmail, rememberMe);
        
        if (savedEmail && savedPassword && rememberMe) {
            // Auto-fill saved credentials
            this.emailInput.value = savedEmail;
            this.passwordInput.value = savedPassword;
            
            console.log('Auto-login with saved credentials');
            // Auto-login after short delay
            setTimeout(() => {
                this.autoLogin(savedEmail, savedPassword);
            }, 100);
            return true;
        }
        return false;
    }
    
    autoLogin(email, password) {
        if (this.validateCredentials(email, password)) {
            this.emailInput.value = email;
            this.passwordInput.value = password;
            this.loginError.textContent = '';
            this.loginScreen.classList.remove('active');
            this.gameScreen.classList.add('active');
            
            // Set current user as admin
            localStorage.setItem('beeSwarm_currentUser', email);
            this.currentUser = email;
            
            // Show admin button for allowed email
            this.checkAdminButton(email);
            
            // Show user info
            this.showUserInfo('Admin');
            
            // Reload upgrades for admin
            game.loadUpgrades();
            game.applyUpgrades();
            
            game.init();
            
            // Save to localStorage
            localStorage.setItem('beeSwarm_email', email);
            localStorage.setItem('beeSwarm_password', password);
            localStorage.setItem('beeSwarm_remember', 'true');
        }
    }
    
    checkAdminButton(email) {
        const spawnBeeBtn = document.getElementById('spawnBeeBtn');
        const settingsBtn = document.getElementById('settingsBtn');
        const resetBeesBtn = document.getElementById('resetBeesBtn');
        
        const isAdmin = ALLOWED_EMAILS.includes(email.toLowerCase());
        
        if (isAdmin) {
            if (spawnBeeBtn) spawnBeeBtn.classList.remove('hidden');
            if (settingsBtn) settingsBtn.classList.remove('hidden');
            // Reset button is public, already visible
            console.log('Admin buttons shown for:', email);
        } else {
            if (spawnBeeBtn) spawnBeeBtn.classList.add('hidden');
            if (settingsBtn) settingsBtn.classList.add('hidden');
            // Reset button stays visible for everyone (useful if bees bug)
        }
    }
    
    validateCredentials(email, password) {
        const validEmails = ['grandmael030@mail.com', 'grandmael030@gmail.com'];
        return validEmails.includes(email.toLowerCase()) && password === PASSWORD_HASH;
    }
    
    playPublic() {
        // Play without login - public mode
        this.loginError.textContent = '';
        this.loginScreen.classList.remove('active');
        this.gameScreen.classList.add('active');
        
        // Clear current user (guest mode)
        localStorage.removeItem('beeSwarm_currentUser');
        this.currentUser = null;
        
        // Hide admin-only buttons for public users
        const spawnBeeBtn = document.getElementById('spawnBeeBtn');
        const settingsBtn = document.getElementById('settingsBtn');
        const resetBeesBtn = document.getElementById('resetBeesBtn');
        
        if (spawnBeeBtn) spawnBeeBtn.classList.add('hidden');
        if (settingsBtn) settingsBtn.classList.add('hidden');
        // Reset button is available to everyone (useful if bees bug)
        if (resetBeesBtn) resetBeesBtn.classList.remove('hidden');
        
        // Hide user info if visible
        const userInfoEl = document.getElementById('userInfo');
        if (userInfoEl) userInfoEl.remove();
        
        // Reload upgrades for guest mode
        game.loadUpgrades();
        game.applyUpgrades();
        
        game.init();
    }
    
    // ============== PUBLIC USER REGISTRATION & LOGIN ==============
    
    checkSavedUserLogin() {
        const savedUsername = localStorage.getItem('beeSwarm_username');
        const savedUserPassword = localStorage.getItem('beeSwarm_userPassword');
        const userRemember = localStorage.getItem('beeSwarm_userRemember') === 'true';
        
        if (savedUsername && savedUserPassword && userRemember) {
            console.log('Auto-login user:', savedUsername);
            setTimeout(() => {
                this.autoLoginUser(savedUsername, savedUserPassword);
            }, 100);
            return true;
        }
        return false;
    }
    
    registerUser() {
        const username = this.usernameInput.value.trim();
        const password = this.userPasswordInput.value.trim();
        
        // Validation
        if (!username || username.length < 3) {
            this.loginError.textContent = '❌ Pseudo trop court (min 3 caractères)';
            return;
        }
        if (!password || password.length < 4) {
            this.loginError.textContent = '❌ Mot de passe trop court (min 4 caractères)';
            return;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            this.loginError.textContent = '❌ Pseudo: lettres, chiffres, underscore uniquement';
            return;
        }
        
        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('beeSwarm_users') || '[]');
        if (existingUsers.some(u => u.username.toLowerCase() === username.toLowerCase())) {
            this.loginError.textContent = '❌ Ce pseudo existe déjà !';
            return;
        }
        
        // Create new user
        const newUser = {
            username: username,
            password: password,
            createdAt: new Date().toISOString()
        };
        existingUsers.push(newUser);
        localStorage.setItem('beeSwarm_users', JSON.stringify(existingUsers));
        
        // Auto-login after registration
        this.loginError.textContent = '✅ Compte créé ! Connexion...';
        this.loginError.style.color = '#4CAF50';
        
        setTimeout(() => {
            this.autoLoginUser(username, password);
        }, 500);
    }
    
    loginUser() {
        const username = this.usernameInput.value.trim();
        const password = this.userPasswordInput.value.trim();
        
        if (!username || !password) {
            this.loginError.textContent = '❌ Entre ton pseudo et mot de passe';
            return;
        }
        
        // Check credentials
        const existingUsers = JSON.parse(localStorage.getItem('beeSwarm_users') || '[]');
        const user = existingUsers.find(u => 
            u.username.toLowerCase() === username.toLowerCase() && 
            u.password === password
        );
        
        if (user) {
            this.loginError.textContent = '';
            this.autoLoginUser(username, password);
        } else {
            this.loginError.textContent = '❌ Pseudo ou mot de passe incorrect';
        }
    }
    
    autoLoginUser(username, password) {
        this.loginError.textContent = '';
        this.loginScreen.classList.remove('active');
        this.gameScreen.classList.add('active');
        
        // Store current user
        this.currentUser = username;
        localStorage.setItem('beeSwarm_currentUser', username);
        
        // Save credentials for auto-login
        localStorage.setItem('beeSwarm_username', username);
        localStorage.setItem('beeSwarm_userPassword', password);
        localStorage.setItem('beeSwarm_userRemember', 'true');
        
        // Show user info in UI
        this.showUserInfo(username);
        
        // Hide admin buttons for public users
        const spawnBeeBtn = document.getElementById('spawnBeeBtn');
        const settingsBtn = document.getElementById('settingsBtn');
        if (spawnBeeBtn) spawnBeeBtn.classList.add('hidden');
        if (settingsBtn) settingsBtn.classList.add('hidden');
        
        // Load user's saved game if exists
        this.loadUserGame(username);
        
        // Reload upgrades for this user (before game.init loads them)
        game.loadUpgrades();
        game.applyUpgrades();
        
        game.init();
    }
    
    showUserInfo(username) {
        // Add user info display to UI
        let userInfoEl = document.getElementById('userInfo');
        if (!userInfoEl) {
            userInfoEl = document.createElement('div');
            userInfoEl.id = 'userInfo';
            userInfoEl.className = 'user-info';
            document.getElementById('ui').appendChild(userInfoEl);
        }
        userInfoEl.textContent = `👤 ${username}`;
    }
    
    loadUserGame(username) {
        const userSaveKey = `beeSwarm_userGame_${username}`;
        const savedGame = localStorage.getItem(userSaveKey);
        if (savedGame) {
            console.log('Loading saved game for user:', username);
            // The game will load this in loadGame() method
            localStorage.setItem('beeSwarm_currentUser', username);
        }
    }
    
    logout() {
        // Clear user session
        this.currentUser = null;
        localStorage.removeItem('beeSwarm_username');
        localStorage.removeItem('beeSwarm_userPassword');
        localStorage.removeItem('beeSwarm_userRemember');
        localStorage.removeItem('beeSwarm_currentUser');
        
        // Hide user info
        const userInfoEl = document.getElementById('userInfo');
        if (userInfoEl) userInfoEl.remove();
        
        // Show login screen
        this.gameScreen.classList.remove('active');
        this.loginScreen.classList.add('active');
    }
    
    login() {
        const email = this.emailInput.value.trim().toLowerCase();
        const password = this.passwordInput.value.trim();
        
        console.log('=== TENTATIVE DE CONNEXION ===');
        console.log('Email entré:', email);
        console.log('Password entré:', JSON.stringify(password));
        console.log('Password attendu:', JSON.stringify(PASSWORD_HASH));
        console.log('Emails autorisés:', ALLOWED_EMAILS);
        console.log('Match email:', ALLOWED_EMAILS.includes(email));
        console.log('Match password:', password === PASSWORD_HASH);
        console.log('==============================');
        
        if (!ALLOWED_EMAILS.includes(email)) {
            this.loginError.textContent = '❌ Email non autorisé: "' + email + '"\nEmails valides: ' + ALLOWED_EMAILS.join(', ');
            this.loginError.style.whiteSpace = 'pre-line';
            return;
        }
        
        if (password !== PASSWORD_HASH) {
            this.loginError.textContent = '❌ Mot de passe incorrect\nVous avez entré: "' + password + '"\nAttendu: "' + PASSWORD_HASH + '"';
            this.loginError.style.whiteSpace = 'pre-line';
            return;
        }
        
        // Connexion réussie!
        this.loginError.textContent = '✅ Connexion réussie!';
        
        // Save credentials for auto-login next time
        localStorage.setItem('beeSwarm_email', email);
        localStorage.setItem('beeSwarm_password', password);
        localStorage.setItem('beeSwarm_remember', 'true');
        
        // Set current user as admin
        localStorage.setItem('beeSwarm_currentUser', email);
        this.currentUser = email;
        
        // Show admin button for allowed email
        this.checkAdminButton(email);
        
        // Show user info
        this.showUserInfo('Admin');
        
        // Reload upgrades for admin
        game.loadUpgrades();
        game.applyUpgrades();
        
        // Délai pour montrer le message de succès
        setTimeout(() => {
            this.loginScreen.classList.remove('active');
            this.gameScreen.classList.add('active');
            game.init();
        }, 300);
    }
}

// ==================== JEU ====================
class Bee {
    constructor(x, y, type = 'basic') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.vx = 0;
        this.vy = 0;
        this.target = null;
        this.carrying = 0;
        this.speed = type === 'legendary' ? 4 : type === 'blue' ? 3 : type === 'red' ? 2.5 : 2;
        this.capacity = type === 'legendary' ? 100 : type === 'blue' ? 50 : type === 'red' ? 30 : 10;
        this.color = this.getColor();
        this.angle = 0;
        this.teleport = false; // Teleport mode for high speed levels
    }
    
    getColor() {
        switch(this.type) {
            case 'red': return '#FF4444';
            case 'blue': return '#4444FF';
            case 'legendary': return '#FFD700';
            default: return '#FFFF00';
        }
    }
    
    update(flowers, hive, player) {
        // AI behavior
        if (this.carrying >= this.capacity) {
            // Return to hive or player
            const target = player;
            const dx = target.x - this.x;
            const dy = target.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 3000) {
                game.addPollen(this.carrying);
                this.carrying = 0;
            } else {
                this.vx = (dx / dist) * this.speed;
                this.vy = (dy / dist) * this.speed;
            }
        } else if (!this.target || this.target.pollen <= 0) {
            // Release previous flower before finding new one
            if (this.target && this.target.targetedBy === this) {
                this.target.targetedBy = null;
            }
            this.findNearestFlower();
        }
        
        if (this.target && this.carrying < this.capacity) {
            const dx = this.target.x - this.x;
            const dy = this.target.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            // Larger collection range for teleporting bees (they move too fast)
            const collectionRange = this.teleport ? 50 : 20;
            
            if (dist < collectionRange && this.target.pollen > 0) {
                const collected = Math.min(1, this.target.pollen);
                this.carrying += collected;
                // Only remove pollen if not in infinite flowers mode
                if (!game.infiniteFlowers) {
                    this.target.pollen -= collected;
                }
                this.target.visited = true;
                
                // For fast bees, immediately find next flower to maximize efficiency
                if (this.teleport && this.carrying < this.capacity) {
                    this.findNearestFlower();
                }
            } else if (this.teleport && dist > collectionRange) {
                // Teleport mode: instantly move closer to target (but not too close to avoid skipping)
                const teleportDist = Math.min(dist * 0.6, this.speed);
                this.x += (dx / dist) * teleportDist;
                this.y += (dy / dist) * teleportDist;
                // Keep some velocity for smooth animation
                this.vx = (dx / dist) * this.speed * 0.3;
                this.vy = (dy / dist) * this.speed * 0.3;
                
                // Check if we landed close enough to collect after teleport
                const newDist = Math.sqrt(Math.pow(this.target.x - this.x, 2) + Math.pow(this.target.y - this.y, 2));
                if (newDist < collectionRange && this.target.pollen > 0 && this.carrying < this.capacity) {
                    const collected = Math.min(1, this.target.pollen);
                    this.carrying += collected;
                    // Only remove pollen if not in infinite flowers mode
                    if (!game.infiniteFlowers) {
                        this.target.pollen -= collected;
                    }
                    this.target.visited = true;
                }
            } else {
                this.vx = (dx / dist) * this.speed;
                this.vy = (dy / dist) * this.speed;
            }
        }
        
        // Random movement (only if not teleporting)
        if (!this.teleport) {
            this.vx += (Math.random() - 0.5) * 0.5;
            this.vy += (Math.random() - 0.5) * 0.5;
        }
        
        // Update position (only if not handled by teleport)
        if (!this.teleport || !this.target || this.carrying >= this.capacity) {
            this.x += this.vx;
            this.y += this.vy;
        }
        
        // Boundary check - strict screen limits
        if (game.minX !== undefined) {
            this.x = Math.max(game.minX, Math.min(game.maxX, this.x));
            this.y = Math.max(game.minY, Math.min(game.maxY, this.y));
        } else {
            this.x = Math.max(30, Math.min(game.width - 30, this.x));
            this.y = Math.max(30, Math.min(game.height - 30, this.y));
        }
        
        // Update angle
        this.angle = Math.atan2(this.vy, this.vx);
    }
    
    findNearestFlower() {
        // Find nearest flower with pollen that isn't already targeted by another bee
        let nearest = null;
        let minDist = Infinity;
        
        // Get game boundaries
        const minX = game.minX || 30;
        const minY = game.minY || 30;
        const maxX = game.maxX || (game.width - 30);
        const maxY = game.maxY || (game.height - 30);
        
        for (const flower of game.flowers) {
            // Only consider flowers within boundaries that have pollen and aren't targeted
            if (flower.pollen > 0 && 
                flower.x >= minX && flower.x <= maxX &&
                flower.y >= minY && flower.y <= maxY &&
                (!flower.targetedBy || flower.targetedBy === this)) { // Only untargeted flowers or already targeted by this bee
                const d = Math.hypot(flower.x - this.x, flower.y - this.y);
                if (d < minDist) {
                    minDist = d;
                    nearest = flower;
                }
            }
        }
        
        // Claim this flower for this bee
        if (nearest && nearest.targetedBy !== this) {
            nearest.targetedBy = this;
        }
        
        this.target = nearest;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        // Body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, 12, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Stripes
        ctx.fillStyle = '#000';
        ctx.fillRect(-4, -6, 3, 12);
        ctx.fillRect(2, -5, 2, 10);
        
        // Wings
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.beginPath();
        ctx.ellipse(-2, -10, 8, 5, -0.3, 0, Math.PI * 2);
        ctx.ellipse(-2, 10, 8, 5, 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // Pollen indicator
        if (this.carrying > 0) {
            ctx.fillStyle = '#FF69B4';
            ctx.beginPath();
            ctx.arc(-15, -5, 4, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }
}

class Flower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.maxPollen = 50 + Math.random() * 50;
        this.pollen = this.maxPollen;
        this.visited = false;
        this.size = 15 + Math.random() * 10;
        this.color = ['#FF69B4', '#FF1493', '#FF69B4', '#FF6347'][Math.floor(Math.random() * 4)];
        this.regenInterval = 5000; // Default 5 seconds in ms
        this.lastRegen = Date.now();
        this.targetedBy = null; // Track which bee is targeting this flower (1 bee per flower)
    }
    
    update() {
        // Regenerate pollen based on interval
        if (this.pollen < this.maxPollen) {
            const now = Date.now();
            const elapsed = now - this.lastRegen;
            if (elapsed >= this.regenInterval) {
                // Calculate how many regen cycles passed (for very fast regen)
                const cycles = Math.floor(elapsed / this.regenInterval);
                const regenAmount = Math.min(10 * cycles, this.maxPollen - this.pollen);
                this.pollen += regenAmount;
                this.lastRegen = now - (elapsed % this.regenInterval); // Keep remainder for accuracy
            }
        }
    }
    
    draw(ctx) {
        // Petals
        ctx.fillStyle = this.color;
        const petalCount = 5;
        for (let i = 0; i < petalCount; i++) {
            const angle = (i / petalCount) * Math.PI * 2;
            ctx.beginPath();
            ctx.arc(
                this.x + Math.cos(angle) * this.size * 0.5,
                this.y + Math.sin(angle) * this.size * 0.5,
                this.size * 0.4,
                0, Math.PI * 2
            );
            ctx.fill();
        }
        
        // Center
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // Pollen bar
        if (this.pollen < this.maxPollen * 0.8) {
            const barWidth = 20;
            const barHeight = 4;
            ctx.fillStyle = '#333';
            ctx.fillRect(this.x - barWidth/2, this.y - this.size - 8, barWidth, barHeight);
            ctx.fillStyle = '#FF69B4';
            ctx.fillRect(this.x - barWidth/2, this.y - this.size - 8, barWidth * (this.pollen/this.maxPollen), barHeight);
        }
    }
}

class Particle {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type; // 'honey', 'pollen', 'sparkle'
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = -Math.random() * 3 - 1;
        this.life = 1;
        this.decay = 0.02;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1; // gravity
        this.life -= this.decay;
    }
    
    draw(ctx) {
        ctx.globalAlpha = this.life;
        if (this.type === 'honey') {
            ctx.fillStyle = '#FFD700';
        } else if (this.type === 'pollen') {
            ctx.fillStyle = '#FF69B4';
        } else {
            ctx.fillStyle = '#FFF';
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        this.bees = [];
        this.flowers = [];
        this.particles = [];
        this.honey = 0;
        this.pollen = 0;
        this.pollenInBag = 0;
        this.frameCount = 0;
        
        this.player = { x: this.width/2, y: this.height/2 };
        
        this.keys = {};
        this.mouse = { x: 0, y: 0, down: false };
        
        // Load upgrades
        this.upgrades = { speed: 0, capacity: 0, auto: 0, convert: 0, luck: 0, flowers: 0, regen: 0, bubble: 0 };
        this.loadUpgrades();
        
        this.setupUI();
        this.setupInputs();
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }
    
    setupUI() {
        this.honeyEl = document.getElementById('honey');
        this.pollenEl = document.getElementById('pollen');
        this.beesEl = document.getElementById('bees');
        
        // Load saved settings into UI
        this.initSettings();
        
        // Prevent zoom on mobile (double-tap and pinch)
        this.preventMobileZoom();
        
        document.getElementById('makeHoneyBtn').addEventListener('click', () => this.convertPollen());
        document.getElementById('spawnBeeBtn').addEventListener('click', () => this.spawnBee('basic'));
        document.getElementById('shopBtn').addEventListener('click', () => this.openShop());
        document.getElementById('closeShop').addEventListener('click', () => this.closeShop());
        
        // Shop items - buy one
        document.querySelectorAll('.shop-item').forEach(item => {
            item.addEventListener('click', (e) => {
                // Don't trigger if clicked the MAX button
                if (e.target.classList.contains('buy-max-btn')) return;
                this.buyBee(item.dataset.type, parseInt(item.dataset.cost));
            });
        });
        
        // Buy MAX buttons
        document.querySelectorAll('.buy-max-btn').forEach(btn => {
            btn.addEventListener('click', () => this.buyMaxBees(btn.dataset.type, parseInt(btn.dataset.cost)));
        });
        
        // Settings modal
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.openSettings());
        }
        document.getElementById('closeSettings').addEventListener('click', () => this.closeSettings());
        document.getElementById('saveSettings').addEventListener('click', () => this.saveSettings());
        
        // Upgrades
        document.getElementById('upgradesBtn').addEventListener('click', () => this.openUpgrades());
        document.getElementById('closeUpgrades').addEventListener('click', () => this.closeUpgrades());
        
        // Upgrade items click
        document.querySelectorAll('.upgrade-item').forEach(item => {
            item.addEventListener('click', () => this.buyUpgrade(item.id));
        });
        
        // Reset bees button
        const resetBeesBtn = document.getElementById('resetBeesBtn');
        if (resetBeesBtn) {
            resetBeesBtn.addEventListener('click', () => this.resetBees());
        }
        
        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                // Save game before logout
                this.saveGame();
                this.saveUpgrades();
                // Call auth logout
                if (window.auth) {
                    window.auth.logout();
                }
            });
        }
        
        // Settings inputs
        const flowerCountSlider = document.getElementById('flowerCount');
        const startHoneySlider = document.getElementById('startHoney');
        const flowerRegenValue = document.getElementById('flowerRegenValue');
        const flowerRegenUnit = document.getElementById('flowerRegenUnit');
        
        if (flowerCountSlider) {
            flowerCountSlider.addEventListener('input', (e) => {
                document.getElementById('flowerCountValue').textContent = e.target.value;
            });
        }
        if (startHoneySlider) {
            startHoneySlider.addEventListener('input', (e) => {
                document.getElementById('startHoneyValue').textContent = e.target.value;
            });
        }
        // Update regen display when value or unit changes
        const updateRegenDisplay = () => {
            const val = flowerRegenValue ? flowerRegenValue.value : 50;
            const unit = flowerRegenUnit ? flowerRegenUnit.options[flowerRegenUnit.selectedIndex].text.split(' ')[0] : 's';
            document.getElementById('regenDisplay').textContent = val + unit;
        };
        if (flowerRegenValue) {
            flowerRegenValue.addEventListener('input', updateRegenDisplay);
        }
        if (flowerRegenUnit) {
            flowerRegenUnit.addEventListener('change', updateRegenDisplay);
        }
    }
    
    initSettings() {
        // Load saved settings from localStorage
        const savedSettings = JSON.parse(localStorage.getItem('beeSwarm_settings') || '{}');
        
        // Apply settings to UI
        if (savedSettings.flowerCount) {
            document.getElementById('flowerCount').value = savedSettings.flowerCount;
            document.getElementById('flowerCountValue').textContent = savedSettings.flowerCount;
        }
        // Load regen settings (value + unit)
        if (savedSettings.flowerRegenValue) {
            document.getElementById('flowerRegenValue').value = savedSettings.flowerRegenValue;
        }
        if (savedSettings.flowerRegenUnit) {
            document.getElementById('flowerRegenUnit').value = savedSettings.flowerRegenUnit;
        }
        // Update display
        const val = document.getElementById('flowerRegenValue').value;
        const unit = document.getElementById('flowerRegenUnit');
        const unitText = unit.options[unit.selectedIndex].text.split(' ')[0];
        document.getElementById('regenDisplay').textContent = val + unitText;
        
        if (savedSettings.conversionRate) {
            document.getElementById('conversionRate').value = savedSettings.conversionRate;
        }
        if (savedSettings.startHoney) {
            document.getElementById('startHoney').value = savedSettings.startHoney;
            document.getElementById('startHoneyValue').textContent = savedSettings.startHoney;
        }
    }
    
    openSettings() {
        document.getElementById('settingsModal').classList.remove('hidden');
    }
    
    closeSettings() {
        document.getElementById('settingsModal').classList.add('hidden');
    }
    
    saveSettings() {
        const regenValue = parseInt(document.getElementById('flowerRegenValue').value);
        const regenUnit = document.getElementById('flowerRegenUnit').value;
        
        // Convert to milliseconds for internal use
        let regenMs = regenValue;
        switch(regenUnit) {
            case 'ms': regenMs = regenValue; break;
            case 's': regenMs = regenValue * 1000; break;
            case 'm': regenMs = regenValue * 60 * 1000; break;
            case 'h': regenMs = regenValue * 60 * 60 * 1000; break;
            case 'j': regenMs = regenValue * 24 * 60 * 60 * 1000; break;
            case 'sem': regenMs = regenValue * 7 * 24 * 60 * 60 * 1000; break;
        }
        
        const settings = {
            flowerCount: parseInt(document.getElementById('flowerCount').value),
            flowerRegenValue: regenValue,
            flowerRegenUnit: regenUnit,
            flowerRegenMs: regenMs, // Store converted value
            conversionRate: parseFloat(document.getElementById('conversionRate').value),
            startHoney: parseInt(document.getElementById('startHoney').value)
        };
        
        // Save to localStorage
        localStorage.setItem('beeSwarm_settings', JSON.stringify(settings));
        
        // Apply settings immediately
        this.applySettings(settings);
        
        // Show confirmation
        alert('Réglages sauvegardés ! 🎮');
        this.closeSettings();
    }
    
    applySettings(settings) {
        // Apply flower count
        if (settings.flowerCount && settings.flowerCount !== this.flowers.length) {
            this.respawnFlowers(settings.flowerCount);
        }
        
        // Apply honey starting amount
        if (settings.startHoney && this.honey === 0) {
            this.honey = settings.startHoney;
            this.updateUI();
        }
        
        console.log('Settings applied:', settings);
    }
    
    resetBees() {
        // Immediate reset without confirmation
        if (this.bees.length > 1) {
            // Release all flowers targeted by bees being removed
            this.bees.forEach((bee, index) => {
                if (index > 0 && bee.target && bee.target.targetedBy === bee) {
                    bee.target.targetedBy = null;
                }
            });
            this.bees = [this.bees[0]];
            this.updateUI();
            this.saveGame();
        }
    }
    
    preventMobileZoom() {
        // Prevent double-tap zoom
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
        
        // Prevent pinch zoom
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Prevent zoom with gesture events (iOS)
        document.addEventListener('gesturestart', (e) => e.preventDefault());
        document.addEventListener('gesturechange', (e) => e.preventDefault());
        document.addEventListener('gestureend', (e) => e.preventDefault());
        
        // Prevent Ctrl+wheel zoom and double click zoom
        document.addEventListener('wheel', (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Prevent double click zoom (but allow fast clicks on game buttons)
        let lastClickTime = 0;
        document.addEventListener('click', (e) => {
            // Skip if clicking on game buttons (allow spam clicking)
            const target = e.target;
            if (target.tagName === 'BUTTON' || target.closest('button')) {
                return; // Don't block clicks on buttons
            }
            
            const now = Date.now();
            if (now - lastClickTime <= 300) {
                // Double click detected, prevent zoom
                e.preventDefault();
                e.stopPropagation();
            }
            lastClickTime = now;
        }, { capture: true });
    }
    
    respawnFlowers(count) {
        // Clear existing flowers
        this.flowers = [];
        
        // Ensure boundaries are set
        this.minX = 30;
        this.minY = 30;
        this.maxX = this.width - 30;
        this.maxY = this.height - 30;
        
        // Spawn new flowers - strictly within screen boundaries
        const savedSettings = JSON.parse(localStorage.getItem('beeSwarm_settings') || '{}');
        // Use saved regen time in ms, default to 5000ms (5s)
        const regenTimeMs = savedSettings.flowerRegenMs || 5000;
        // Convert to pollen amount (1 pollen per second = 1000ms)
        const pollenAmount = Math.max(50, Math.floor(regenTimeMs / 100));
        
        for (let i = 0; i < count; i++) {
            const x = this.minX + Math.random() * (this.maxX - this.minX);
            const y = this.minY + Math.random() * (this.maxY - this.minY);
            const flower = new Flower(x, y);
            flower.maxPollen = pollenAmount;
            flower.pollen = pollenAmount;
            // Set regen interval based on settings
            flower.regenInterval = regenTimeMs;
            this.flowers.push(flower);
        }
        
        console.log('Respawned', count, 'flowers with regen time:', regenTimeMs + 'ms');
    }
    
    setupInputs() {
        // Keyboard
        window.addEventListener('keydown', (e) => this.keys[e.key] = true);
        window.addEventListener('keyup', (e) => this.keys[e.key] = false);
        
        // Touch/Mouse for mobile
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.mouse.x = touch.clientX;
            this.mouse.y = touch.clientY;
            this.mouse.down = true;
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.mouse.x = touch.clientX;
            this.mouse.y = touch.clientY;
        });
        
        this.canvas.addEventListener('touchend', () => {
            this.mouse.down = false;
        });
        
        // Mouse
        this.canvas.addEventListener('mousedown', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.mouse.down = true;
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        this.canvas.addEventListener('mouseup', () => {
            this.mouse.down = false;
        });
    }
    
    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        // Define game boundaries with padding
        this.minX = 30;
        this.minY = 30;
        this.maxX = this.width - 30;
        this.maxY = this.height - 30;
    }
    
    init() {
        // Define boundaries first (needed for flower and bee placement)
        this.minX = 30;
        this.minY = 30;
        this.maxX = this.width - 30;
        this.maxY = this.height - 30;
        
        console.log('🎮 Init game - Dimensions:', this.width, 'x', this.height);
        console.log('📐 Boundaries:', this.minX, this.maxX, this.minY, this.maxY);
        
        // Load saved settings and apply them
        const savedSettings = JSON.parse(localStorage.getItem('beeSwarm_settings') || '{}');
        
        // Apply settings automatically
        if (savedSettings.flowerCount) {
            console.log('📋 Settings loaded:', savedSettings);
        }
        
        const flowerCount = savedSettings.flowerCount || 20;
        const regenTimeMs = savedSettings.flowerRegenMs || 5000;
        const pollenAmount = Math.max(50, Math.floor(regenTimeMs / 100));
        
        // Create initial flowers with saved settings
        console.log('🌸 Creating', flowerCount, 'flowers with regen:', regenTimeMs + 'ms');
        for (let i = 0; i < flowerCount; i++) {
            const x = this.minX + Math.random() * (this.maxX - this.minX);
            const y = this.minY + Math.random() * (this.maxY - this.minY);
            const flower = new Flower(x, y);
            flower.maxPollen = pollenAmount;
            flower.pollen = pollenAmount;
            flower.regenInterval = regenTimeMs;
            this.flowers.push(flower);
        }
        console.log('✅ Flowers created:', this.flowers.length);
        
        // Apply start honey if set
        if (savedSettings.startHoney && this.honey === 0) {
            this.honey = savedSettings.startHoney;
            console.log('💰 Start honey applied:', savedSettings.startHoney);
        }
        
        // Apply loaded upgrades
        this.applyUpgrades();
        
        // Load saved game data (or create first bee if no save)
        const saveKey = this.getSaveKey();
        const saved = localStorage.getItem(saveKey);
        if (saved) {
            this.loadGame();
        } else {
            // First time playing - create initial bee
            this.spawnBee('basic');
        }
        
        // Start game loop
        this.loop();
        
        // Auto-save every 30 seconds
        setInterval(() => this.saveGame(), 30000);
        
        // Save before page unload
        window.addEventListener('beforeunload', () => this.saveGame());
    }
    
    spawnBee(type, save = true) {
        // Limit max bees to prevent browser freeze
        const MAX_BEES = 100;
        if (this.bees.length >= MAX_BEES) {
            alert('Limite atteinte : ' + MAX_BEES + ' abeilles maximum !');
            return;
        }
        
        const x = this.player.x + (Math.random() - 0.5) * 50;
        const y = this.player.y + (Math.random() - 0.5) * 50;
        
        const bee = new Bee(x, y, type);
        
        // Apply current upgrades to the new bee
        const speedLevel = this.upgrades.speed;
        const speedMultiplier = Math.pow(2, Math.min(speedLevel, 6));
        const baseSpeed = bee.type === 'legendary' ? 4 : bee.type === 'blue' ? 3 : bee.type === 'red' ? 2.5 : 2;
        bee.speed = baseSpeed * speedMultiplier;
        bee.teleport = speedLevel >= 7;
        
        const capacityMultiplier = Math.pow(2, this.upgrades.capacity);
        const baseCapacity = bee.type === 'legendary' ? 100 : bee.type === 'blue' ? 50 : bee.type === 'red' ? 30 : 10;
        bee.capacity = baseCapacity * capacityMultiplier;
        
        this.bees.push(bee);
        this.updateUI();
        
        // Save game after spawning (unless loading)
        if (save) {
            this.saveGame();
        }
    }
    
    addPollen(amount) {
        this.pollen += amount;
        this.updateUI();
        
        // Spawn particles
        for (let i = 0; i < 3; i++) {
            this.particles.push(new Particle(this.player.x, this.player.y, 'pollen'));
        }
    }
    
    convertPollen() {
        if (this.pollen > 0) {
            const honeyMade = Math.floor(this.pollen / 2);
            this.honey += honeyMade;
            this.pollen = 0;
            this.updateUI();
            this.saveGame(); // Save after converting
            
            // Spawn honey particles
            for (let i = 0; i < 8; i++) {
                this.particles.push(new Particle(this.player.x, this.player.y, 'honey'));
            }
        }
    }
    
    openShop() {
        document.getElementById('shopModal').classList.remove('hidden');
        this.updateShopUI();
    }
    
    closeShop() {
        document.getElementById('shopModal').classList.add('hidden');
    }
    
    // ==================== UPGRADES ====================
    openUpgrades() {
        this.updateUpgradesUI();
        document.getElementById('upgradesModal').classList.remove('hidden');
    }
    
    closeUpgrades() {
        document.getElementById('upgradesModal').classList.add('hidden');
    }
    
    getUpgradesKey() {
        // Get the appropriate upgrades key based on current user
        const currentUser = localStorage.getItem('beeSwarm_currentUser');
        if (currentUser) {
            return `beeSwarm_userUpgrades_${currentUser}`;
        }
        return 'beeSwarm_upgrades';
    }
    
    loadUpgrades() {
        const upgradesKey = this.getUpgradesKey();
        const saved = localStorage.getItem(upgradesKey);
        if (saved) {
            this.upgrades = JSON.parse(saved);
        } else {
            this.upgrades = {
                speed: 0,
                capacity: 0,
                auto: 0,
                convert: 0,
                luck: 0,
                flowers: 0,
                regen: 0,
                bubble: 0
            };
        }
    }
    
    saveUpgrades() {
        const upgradesKey = this.getUpgradesKey();
        localStorage.setItem(upgradesKey, JSON.stringify(this.upgrades));
    }
    
    getSaveKey() {
        // Get the appropriate save key based on current user
        const currentUser = localStorage.getItem('beeSwarm_currentUser');
        if (currentUser) {
            return `beeSwarm_userGame_${currentUser}`;
        }
        return 'beeSwarm_game';
    }
    
    saveGame() {
        // Save honey, pollen, and bee types breakdown
        const beeTypes = this.bees.map(bee => bee.type);
        const gameData = {
            honey: this.honey,
            pollen: this.pollen,
            beeCount: this.bees.length,
            beeTypes: beeTypes, // Save individual bee types
            savedAt: Date.now()
        };
        const saveKey = this.getSaveKey();
        localStorage.setItem(saveKey, JSON.stringify(gameData));
    }
    
    loadGame() {
        // Load honey, pollen, and bee types
        const saveKey = this.getSaveKey();
        const saved = localStorage.getItem(saveKey);
        if (saved) {
            const gameData = JSON.parse(saved);
            this.honey = gameData.honey || 0;
            this.pollen = gameData.pollen || 0;
            
            // Spawn saved bees with their original types
            const beeTypes = gameData.beeTypes || [];
            if (beeTypes.length > 0) {
                // Restore each bee with its saved type
                for (const beeType of beeTypes) {
                    this.spawnBee(beeType, false); // false = don't save after each spawn
                }
            } else {
                // Fallback: spawn basic bees if no type data
                const beeCount = gameData.beeCount || 1;
                for (let i = 0; i < beeCount; i++) {
                    this.spawnBee('basic', false);
                }
            }
            this.updateUI();
        }
    }
    
    getUpgradeCost(type) {
        const baseCosts = {
            speed: 500,
            capacity: 1000,
            auto: 5000,
            convert: 10000,
            luck: 2500,
            flowers: 5000,
            regen: 8000,
            bubble: 2000
        };
        // Cost increases by 2x each level (Cookie Clicker style)
        return baseCosts[type] * Math.pow(2, this.upgrades[type]);
    }
    
    buyUpgrade(upgradeId) {
        const type = upgradeId.replace('upgrade-', '');
        const cost = this.getUpgradeCost(type);
        
        // Enable teleport mode at level 7 (message only for info)
        if (type === 'speed' && this.upgrades.speed === 6) {
            alert('⚡ Niveau 7 débloquera la TÉLÉPORTATION !\nLes abeilles iront à la vitesse de l\'éclair ! 🚀');
        }
        
        if (this.honey >= cost) {
            this.honey -= cost;
            this.upgrades[type]++;
            this.saveUpgrades();
            this.applyUpgrades();
            this.updateUpgradesUI();
            this.updateUI();
        } else {
            alert('Pas assez de miel ! Besoin de ' + cost + ' 🍯');
        }
    }
    
    applyUpgrades() {
        // Apply speed upgrade: x2 per level
        const speedLevel = this.upgrades.speed;
        const speedMultiplier = Math.pow(2, Math.min(speedLevel, 6));
        
        this.bees.forEach(bee => {
            const baseSpeed = bee.type === 'legendary' ? 4 : bee.type === 'blue' ? 3 : bee.type === 'red' ? 2.5 : 2;
            bee.speed = baseSpeed * speedMultiplier;
            
            // Enable teleport mode at level 7+ to prevent syncope
            bee.teleport = speedLevel >= 7;
        });
        
        // Apply capacity upgrade: x2 per level
        const capacityMultiplier = Math.pow(2, this.upgrades.capacity);
        this.bees.forEach(bee => {
            const baseCapacity = bee.type === 'legendary' ? 100 : bee.type === 'blue' ? 50 : bee.type === 'red' ? 30 : 10;
            bee.capacity = baseCapacity * capacityMultiplier;
        });
        
        // Auto collection and conversion handled in update loop
        
        // Apply flower count upgrade: +5 flowers per level
        const flowerBonus = this.upgrades.flowers * 5;
        this.maxFlowers = 20 + flowerBonus;
        
        // Apply regen upgrade: 20% faster per level (multiplier)
        let regenMultiplier = Math.pow(0.8, this.upgrades.regen); // 0.8^level = faster regen
        
        // Bonus: Speed levels beyond 7 further increase regen speed (5% faster per extra level)
        if (speedLevel > 7) {
            const extraSpeedBonus = Math.pow(0.95, speedLevel - 7); // 5% faster per level above 7
            regenMultiplier *= extraSpeedBonus;
        }
        
        this.flowerRegenMultiplier = regenMultiplier;
        
        // Infinite flowers mode: if speed >= 7 AND regen >= 10, flowers never lose pollen
        this.infiniteFlowers = (speedLevel >= 7 && this.upgrades.regen >= 10);
        
        // Update existing flowers with new regen speed
        this.flowers.forEach(flower => {
            const baseRegen = flower.maxPollen * 100; // Base regen based on pollen capacity
            flower.regenInterval = baseRegen * regenMultiplier;
        });
        
        // Apply bubble upgrade: +10px radius and +1 pollen per collect per level
        this.playerCollectionRadius = 30 + (this.upgrades.bubble * 10); // Base 30px + 10px per level
        this.playerCollectAmount = 2 + this.upgrades.bubble; // Base 2 pollen + 1 per level
    }
    
    updateUpgradesUI() {
        document.querySelectorAll('.upgrade-item').forEach(item => {
            const type = item.id.replace('upgrade-', '');
            const level = this.upgrades[type];
            const cost = this.getUpgradeCost(type);
            
            // Update level display
            const levelEl = item.querySelector('.upgrade-level');
            if (levelEl) {
                levelEl.textContent = 'Niveau ' + level;
            }
            
            // Update cost display
            const costEl = item.querySelector('.upgrade-cost');
            if (costEl) {
                costEl.textContent = cost + ' 🍯';
            }
            
            // Update data attributes
            item.dataset.level = level;
            item.dataset.cost = cost;
            
            // Disable if can't afford
            if (this.honey < cost) {
                item.classList.add('disabled');
            } else {
                item.classList.remove('disabled');
            }
            
            // Mark as purchased if level > 0
            if (level > 0) {
                item.classList.add('purchased');
            } else {
                item.classList.remove('purchased');
            }
        });
    }
    
    updateShopUI() {
        document.querySelectorAll('.shop-item').forEach(item => {
            const cost = parseInt(item.dataset.cost);
            if (this.honey < cost) {
                item.classList.add('disabled');
            } else {
                item.classList.remove('disabled');
            }
        });
    }
    
    buyBee(type, cost) {
        const MAX_BEES = 100;
        
        // If at max bees, exchange the worst bee for a better one
        if (this.bees.length >= MAX_BEES) {
            if (type === 'basic') {
                alert('Limite atteinte : ' + MAX_BEES + ' abeilles maximum !');
                this.closeShop();
                return;
            }
            
            // Find the worst bee to exchange (priority: basic > red > blue)
            let exchangeIndex = -1;
            let exchangedType = '';
            
            // Try to exchange basic first
            exchangeIndex = this.bees.findIndex(bee => bee.type === 'basic');
            if (exchangeIndex !== -1) {
                exchangedType = 'Basic';
            } else {
                // No basic, try red
                exchangeIndex = this.bees.findIndex(bee => bee.type === 'red');
                if (exchangeIndex !== -1) {
                    exchangedType = 'Rouge';
                } else {
                    // No red, try blue
                    exchangeIndex = this.bees.findIndex(bee => bee.type === 'blue');
                    if (exchangeIndex !== -1) {
                        exchangedType = 'Bleue';
                    }
                }
            }
            
            if (exchangeIndex !== -1) {
                // Exchange: remove worst bee, add better one
                // Release the flower targeted by the bee being removed
                const removedBee = this.bees[exchangeIndex];
                if (removedBee.target && removedBee.target.targetedBy === removedBee) {
                    removedBee.target.targetedBy = null;
                }
                this.bees.splice(exchangeIndex, 1);
                this.honey -= cost;
                this.spawnBee(type);
                this.closeShop();
                this.saveGame();
                
                const newTypeName = type === 'red' ? 'Rouge' : type === 'blue' ? 'Bleue' : 'Légendaire';
                alert(`🔄 Échange effectué !\n1 Abeille ${exchangedType} → 1 Abeille ${newTypeName}\n💰 -${cost} miel`);
                return;
            } else {
                alert('❌ Limite atteinte (100 abeilles) et pas d\'abeille à échanger !\nTu as déjà que des abeilles de haut niveau.');
                this.closeShop();
                return;
            }
        }
        
        // Normal purchase when under limit
        if (this.honey >= cost) {
            this.honey -= cost;
            this.spawnBee(type);
            this.closeShop();
        } else {
            alert('Pas assez de miel ! 🍯');
        }
    }
    
    buyMaxBees(type, cost) {
        const MAX_BEES = 100;
        
        // Calculate how many we can buy
        const currentBees = this.bees.length;
        const availableSlots = MAX_BEES - currentBees;
        
        if (availableSlots <= 0) {
            // At max bees - check if we can exchange
            if (type !== 'basic') {
                // Count how many exchanges we can do
                let exchangeableCount = 0;
                if (type !== 'basic') {
                    exchangeableCount += this.bees.filter(b => b.type === 'basic').length;
                    if (type === 'blue' || type === 'legendary') {
                        exchangeableCount += this.bees.filter(b => b.type === 'red').length;
                    }
                    if (type === 'legendary') {
                        exchangeableCount += this.bees.filter(b => b.type === 'blue').length;
                    }
                }
                
                const maxAffordable = Math.floor(this.honey / cost);
                const toBuy = Math.min(exchangeableCount, maxAffordable);
                
                if (toBuy > 0) {
                    let totalCost = 0;
                    let count = 0;
                    
                    for (let i = 0; i < toBuy; i++) {
                        // Find worst bee to exchange
                        let exchangeIndex = -1;
                        if (type !== 'basic') {
                            exchangeIndex = this.bees.findIndex(bee => bee.type === 'basic');
                            if (exchangeIndex === -1 && (type === 'blue' || type === 'legendary')) {
                                exchangeIndex = this.bees.findIndex(bee => bee.type === 'red');
                            }
                            if (exchangeIndex === -1 && type === 'legendary') {
                                exchangeIndex = this.bees.findIndex(bee => bee.type === 'blue');
                            }
                        }
                        
                        if (exchangeIndex !== -1 && this.honey >= cost) {
                            // Release the flower targeted by the bee being removed
                            const removedBee = this.bees[exchangeIndex];
                            if (removedBee.target && removedBee.target.targetedBy === removedBee) {
                                removedBee.target.targetedBy = null;
                            }
                            this.bees.splice(exchangeIndex, 1);
                            this.honey -= cost;
                            totalCost += cost;
                            this.spawnBee(type, false); // Don't save yet
                            count++;
                        } else {
                            break;
                        }
                    }
                    
                    if (count > 0) {
                        this.saveGame();
                        this.updateUI();
                        const typeName = type === 'red' ? 'Rouges' : type === 'blue' ? 'Bleues' : 'Légendaires';
                        alert(`🔄 ${count} Échanges effectués !\n${count} abeilles → ${count} ${typeName}\n💰 -${totalCost} miel`);
                        this.closeShop();
                    }
                } else {
                    alert('❌ Pas d\'abeilles à échanger ou pas assez de miel !');
                }
            } else {
                alert('Limite atteinte : ' + MAX_BEES + ' abeilles maximum !');
            }
            return;
        }
        
        // Not at max - normal purchase
        const maxAffordable = Math.floor(this.honey / cost);
        const toBuy = Math.min(availableSlots, maxAffordable);
        
        if (toBuy > 0) {
            let totalCost = 0;
            for (let i = 0; i < toBuy; i++) {
                this.honey -= cost;
                totalCost += cost;
                this.spawnBee(type, false); // Don't save after each
            }
            this.saveGame(); // Save once at the end
            this.updateUI();
            const typeName = type === 'red' ? 'Rouges' : type === 'blue' ? 'Bleues' : type === 'legendary' ? 'Légendaires' : 'de Base';
            alert(`✅ ${toBuy} Abeilles ${typeName} achetées !\n💰 -${totalCost} miel`);
            this.closeShop();
        } else {
            alert('Pas assez de miel ! 🍯');
        }
    }
    
    updateUI() {
        this.honeyEl.textContent = this.honey;
        this.pollenEl.textContent = this.pollen;
        this.beesEl.textContent = this.bees.length;
        
        // Count bees by type
        const basicCount = this.bees.filter(b => b.type === 'basic').length;
        const redCount = this.bees.filter(b => b.type === 'red').length;
        const blueCount = this.bees.filter(b => b.type === 'blue').length;
        const legendaryCount = this.bees.filter(b => b.type === 'legendary').length;
        
        // Update bee breakdown UI
        const basicEl = document.querySelector('#bee-basic .count');
        const redEl = document.querySelector('#bee-red .count');
        const blueEl = document.querySelector('#bee-blue .count');
        const legendaryEl = document.querySelector('#bee-legendary .count');
        
        if (basicEl) basicEl.textContent = basicCount;
        if (redEl) redEl.textContent = redCount;
        if (blueEl) blueEl.textContent = blueCount;
        if (legendaryEl) legendaryEl.textContent = legendaryCount;
    }
    
    update() {
        // Player movement (keyboard)
        const speed = 5;
        if (this.keys['ArrowUp'] || this.keys['w'] || this.keys['z']) this.player.y -= speed;
        if (this.keys['ArrowDown'] || this.keys['s'] || this.keys['s']) this.player.y += speed;
        if (this.keys['ArrowLeft'] || this.keys['a'] || this.keys['q']) this.player.x -= speed;
        if (this.keys['ArrowRight'] || this.keys['d'] || this.keys['d']) this.player.x += speed;
        
        // Touch follow
        if (this.mouse.down) {
            const dx = this.mouse.x - this.player.x;
            const dy = this.mouse.y - this.player.y;
            const dist = Math.hypot(dx, dy);
            if (dist > 5) {
                this.player.x += (dx / dist) * speed;
                this.player.y += (dy / dist) * speed;
            }
        }
        
        // Boundaries - strict screen limits
        this.minX = 30;
        this.minY = 30;
        this.maxX = this.width - 30;
        this.maxY = this.height - 30;
        
        this.player.x = Math.max(this.minX, Math.min(this.maxX, this.player.x));
        this.player.y = Math.max(this.minY, Math.min(this.maxY, this.player.y));
        
        // Manual collection - player collects pollen when touching flowers
        this.handlePlayerCollection();
        
        // Update entities
        this.flowers.forEach(f => f.update());
        this.bees.forEach(b => b.update(this.flowers, null, this.player));
        
        // Auto collection based on upgrade level (simulates player clicking flowers)
        if (this.upgrades.auto > 0) {
            // Collect from random flowers every X frames based on upgrade level
            const autoInterval = Math.max(10, 60 - (this.upgrades.auto * 4)); // frames between collections
            if (this.frameCount % autoInterval === 0) {
                // Find flowers with pollen and collect from them
                const flowersWithPollen = this.flowers.filter(f => f.pollen > 0);
                if (flowersWithPollen.length > 0) {
                    // Collect from up to 'auto' level flowers
                    const collectCount = Math.min(this.upgrades.auto, flowersWithPollen.length);
                    let totalCollected = 0;
                    
                    for (let i = 0; i < collectCount; i++) {
                        const flower = flowersWithPollen[i];
                        if (flower.pollen > 0) {
                            const amount = Math.min(5, flower.pollen); // Collect up to 5 per flower
                            totalCollected += amount;
                            // Only remove pollen if not in infinite flowers mode
                            if (!this.infiniteFlowers) {
                                flower.pollen -= amount;
                            }
                            flower.visited = true;
                        }
                    }
                    
                    if (totalCollected > 0) {
                        this.pollen += totalCollected;
                        this.updateUI();
                    }
                }
            }
        }
        
        // Auto conversion based on upgrade level
        if (this.upgrades.convert > 0 && this.pollen > 0) {
            // Convert every X frames based on upgrade level (level 1 = slow, level 10 = instant)
            const convertInterval = Math.max(1, 60 - (this.upgrades.convert * 5)); // frames between conversions
            if (this.frameCount % convertInterval === 0) {
                const convertAmount = Math.min(this.pollen, this.upgrades.convert * 10); // Convert more per level
                const honeyMade = Math.floor(convertAmount / 2);
                if (honeyMade > 0) {
                    this.honey += honeyMade;
                    this.pollen -= convertAmount;
                    this.updateUI();
                    
                    // Spawn particles occasionally
                    if (this.frameCount % 30 === 0) {
                        for (let i = 0; i < 3; i++) {
                            this.particles.push(new Particle(this.player.x, this.player.y, 'honey'));
                        }
                    }
                }
            }
        }
        
        // Update particles
        this.particles = this.particles.filter(p => {
            p.update();
            return p.life > 0;
        });
        
        // Spawn new flowers if needed - use maxFlowers from upgrade
        const targetFlowers = this.maxFlowers || 20;
        if (this.flowers.length < targetFlowers) {
            const flower = new Flower(
                this.minX + Math.random() * (this.maxX - this.minX),
                this.minY + Math.random() * (this.maxY - this.minY)
            );
            // Apply regen multiplier from upgrade
            if (this.flowerRegenMultiplier) {
                flower.regenInterval = flower.regenInterval * this.flowerRegenMultiplier;
            }
            this.flowers.push(flower);
        }
    }
    
    handlePlayerCollection() {
        // Player can collect pollen from flowers by touching them
        // Use upgraded collection radius and amount
        const collectionRadius = this.playerCollectionRadius || 30;
        const collectAmount = this.playerCollectAmount || 2;
        let collected = 0;
        let flowersTouched = 0;
        
        for (const flower of this.flowers) {
            if (flower.pollen > 0) {
                const dx = this.player.x - flower.x;
                const dy = this.player.y - flower.y;
                const dist = Math.hypot(dx, dy);
                
                if (dist < collectionRadius + flower.size) {
                    // Player is touching this flower - collect pollen
                    flowersTouched++;
                    const amount = Math.min(collectAmount, flower.pollen); // Collect upgraded amount per frame
                    // Only remove pollen if not in infinite flowers mode
                    if (!this.infiniteFlowers) {
                        flower.pollen -= amount;
                    }
                    flower.visited = true;
                    collected += amount;
                    
                    // Spawn collection particles
                    if (this.frameCount % 5 === 0) {
                        this.particles.push(new Particle(flower.x, flower.y, 'pollen'));
                    }
                }
            }
        }
        
        if (collected > 0) {
            this.pollen += collected;
            this.updateUI();
        }
    }
    
    draw() {
        // Clear
        this.ctx.fillStyle = '#87CEEB';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Log once every 60 frames
        if (this.frameCount % 60 === 0) {
            console.log('🎨 Drawing frame', this.frameCount, '- Flowers:', this.flowers.length, '- Bees:', this.bees.length);
        }
        
        // Draw grass patches
        this.ctx.fillStyle = '#90EE90';
        for (let i = 0; i < 10; i++) {
            const x = (i * 137) % this.width;
            const y = (i * 263) % this.height;
            this.ctx.beginPath();
            this.ctx.ellipse(x, y, 80, 40, 0, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        // Draw flowers
        this.flowers.forEach(f => f.draw(this.ctx));
        
        // Draw player collection radius (visual feedback)
        const displayRadius = this.playerCollectionRadius || 30;
        const bubbleLevel = this.upgrades.bubble || 0;
        const bubbleCost = this.getUpgradeCost ? this.getUpgradeCost('bubble') : 2000;
        
        if (this.frameCount % 60 < 30) { // Pulse effect
            this.ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(this.player.x, this.player.y, displayRadius, 0, Math.PI * 2);
            this.ctx.stroke();
        }
        
        // Draw bubble info text above player
        this.ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
        this.ctx.font = 'bold 12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`🫧 Nv${bubbleLevel} (${displayRadius}px)`, this.player.x, this.player.y - 25);
        if (bubbleLevel < 10) {
            this.ctx.fillStyle = 'rgba(200, 200, 200, 0.7)';
            this.ctx.font = '10px Arial';
            this.ctx.fillText(`Prochain: ${bubbleCost}🍯`, this.player.x, this.player.y - 38);
        }
        
        // Draw player
        this.ctx.fillStyle = '#8B4513';
        this.ctx.beginPath();
        this.ctx.arc(this.player.x, this.player.y, 15, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Player outline
        this.ctx.strokeStyle = '#FFD700';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        
        // Draw bees
        this.bees.forEach(b => b.draw(this.ctx));
        
        // Draw particles
        this.particles.forEach(p => p.draw(this.ctx));
    }
    
    loop() {
        this.frameCount++;
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }
}

// Start
const auth = new Auth();
window.auth = auth; // Pour que le bouton déco fonctionne
const game = new Game();
