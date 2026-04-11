// Update Checker - Notification de mise à jour pour GitHub Pages
// Affiche un badge discret quand une nouvelle version est disponible
(function() {
    // Ne fonctionne que sur GitHub Pages (pas en local)
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        return;
    }
    
    const CHECK_INTERVAL = 60000; // Vérifier toutes les 60 secondes
    let lastModified = null;
    let updateAvailable = false;
    
    // Créer le badge de mise à jour
    const badge = document.createElement('div');
    badge.id = 'update-badge';
    badge.innerHTML = '🔄 Mise à jour disponible - Cliquez pour recharger';
    badge.style.cssText = `
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translateX(-50%) scale(0);
        background: linear-gradient(135deg, #FF6B6B, #FF8E53);
        color: white;
        padding: 12px 25px;
        border-radius: 30px;
        font-family: 'Segoe UI', sans-serif;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
        transition: transform 0.3s ease, opacity 0.3s ease;
        opacity: 0;
        pointer-events: none;
    `;
    
    badge.addEventListener('click', function() {
        location.reload();
    });
    
    document.addEventListener('DOMContentLoaded', function() {
        document.body.appendChild(badge);
    });
    
    function showBadge() {
        badge.style.transform = 'translateX(-50%) scale(1)';
        badge.style.opacity = '1';
        badge.style.pointerEvents = 'auto';
    }
    
    function checkForUpdate() {
        fetch(location.href, { method: 'HEAD', cache: 'no-cache' })
            .then(response => {
                const modified = response.headers.get('last-modified');
                
                if (modified && lastModified && modified !== lastModified) {
                    if (!updateAvailable) {
                        console.log('🔄 Mise à jour détectée !');
                        updateAvailable = true;
                        showBadge();
                    }
                }
                
                lastModified = modified;
            })
            .catch(err => {
                // Ignorer les erreurs
            });
    }
    
    // Vérifier au chargement
    setTimeout(checkForUpdate, 2000);
    
    // Vérifier régulièrement
    setInterval(checkForUpdate, CHECK_INTERVAL);
    
    console.log('🔄 Update Checker activé (GitHub Pages)');
})();
