// Live Reload - Auto refresh quand les fichiers changent
(function() {
    const POLL_INTERVAL = 1000; // Vérifier toutes les secondes
    let lastModified = Date.now();
    let isFirstCheck = true;
    
    console.log('🔥 Live Reload activé !');
    
    // Vérifier si le serveur local est actif
    function checkForChanges() {
        fetch(window.location.href, { method: 'HEAD', cache: 'no-cache' })
            .then(response => {
                const modified = response.headers.get('last-modified');
                if (modified) {
                    const modifiedTime = new Date(modified).getTime();
                    
                    if (!isFirstCheck && modifiedTime > lastModified) {
                        console.log('🔄 Fichiers modifiés ! Rechargement...');
                        window.location.reload();
                    }
                    
                    lastModified = modifiedTime;
                    isFirstCheck = false;
                }
            })
            .catch(err => {
                // Serveur peut être down, on ignore
            });
    }
    
    // Vérifier régulièrement
    setInterval(checkForChanges, POLL_INTERVAL);
    
    // Vérifier aussi quand la fenêtre reprend le focus
    window.addEventListener('focus', checkForChanges);
})();
