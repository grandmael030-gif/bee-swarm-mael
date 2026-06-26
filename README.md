# 🐝 Bee Swarm Simulator - Web Edition

Un jeu de type *idle / clicker* inspiré de Bee Swarm Simulator, écrit en JavaScript vanilla (sans framework) et rendu sur un `<canvas>`. Collecte du pollen avec tes abeilles, transforme-le en miel, achète des upgrades et accomplis les quêtes des 5 ours (Bears).

## 🎮 Jouer

Le jeu est déployé automatiquement sur **GitHub Pages** à chaque push sur `main`
(voir `.github/workflows/pages.yml`).

### Modes de connexion
- **Invité** : « Jouer sans compte » — progression sauvegardée localement (localStorage).
- **Compte joueur** : crée un pseudo + mot de passe (stockés dans le navigateur).
- **Admin** : débloque les outils de debug (spawn d'abeilles, réglages). Réservé aux comptes autorisés.

## 🛠️ Développement local

Le projet n'a aucune dépendance npm — ce sont des fichiers statiques. Sers-les avec
n'importe quel serveur HTTP statique :

```bash
# Python 3
python3 -m http.server 8000

# ou Node
npx serve .
```

Puis ouvre <http://localhost:8000>.

> ℹ️ La connexion admin utilise `crypto.subtle` (Web Crypto), qui n'est disponible
> que dans un *contexte sécurisé* : `https://` ou `http://localhost`. Ne teste pas
> via `file://`.

### Astuces dev
- `?dev=1` dans l'URL saute l'écran de connexion (mode développeur).
- `livereload.js` ne s'active qu'en local (`localhost` / `127.0.0.1`) et recharge la
  page quand les fichiers changent.

## 📦 Build

`build.js` ajoute un hash de version aux URLs des assets dans `index.html` pour
forcer le rafraîchissement du cache des navigateurs :

```bash
node build.js
```

## 📁 Structure

| Fichier | Rôle |
| --- | --- |
| `index.html` | Structure de la page (écrans login + jeu, modales). |
| `game.js` | Logique principale : auth, boucle de jeu, abeilles, fleurs, upgrades. |
| `bears_system.js` | Système des ours et de leurs quêtes. |
| `style.css` | Styles et mise en page. |
| `updatechecker.js` | Badge « mise à jour disponible » (GitHub Pages uniquement). |
| `livereload.js` | Rechargement auto en développement local. |
| `build.js` | Versionnage des assets pour le cache-busting. |
| `BEARS_DOCUMENTATION.md` | Documentation des 5 ours et de leurs quêtes. |

## 🔐 Sécurité

L'authentification est entièrement côté client (pas de serveur) : elle empêche
seulement un accès accidentel, pas un utilisateur déterminé. Le mot de passe admin
n'est **jamais** stocké en clair dans le code — seul son hash SHA-256 est comparé.
Ne réutilise jamais un mot de passe sensible pour ce jeu.
