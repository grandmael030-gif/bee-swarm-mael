# 🐝 Bee Swarm Simulator – Web Edition

Un jeu *idle* dans le navigateur où tu diriges un personnage qui butine des fleurs,
fait grandir son essaim d'abeilles, convertit le pollen en miel et progresse à travers
les quêtes des **Bears**. Écrit en **JavaScript vanilla** (aucun framework), il tourne
directement dans le navigateur et se déploie sur **GitHub Pages**.

## 🎮 Jouer

- **En ligne** : déployé automatiquement sur GitHub Pages à chaque push sur `main`.
- **En local** : ouvre simplement `index.html` dans un navigateur, ou lance un petit
  serveur statique :

  ```bash
  npm start          # sert le dossier sur http://localhost:3000
  # ou
  python3 -m http.server
  ```

Astuce dev : ajoute `?dev=1` à l'URL pour passer l'écran de connexion.

## 🕹️ Contrôles

- **Déplacement** : flèches, `WASD` ou `ZQSD` (clavier AZERTY).
- **Tactile / souris** : maintiens pour faire suivre le personnage.
- Passe sur les fleurs pour collecter le pollen, puis clique **Faire du miel** pour le convertir.

## ✨ Fonctionnalités

- **Abeilles** de plusieurs raretés (basique, rouge, bleue, légendaire) avec vitesse et capacité propres.
- **Magasin** pour acheter des abeilles (à l'unité ou en `MAX`).
- **Upgrades permanents** : vitesse, capacité, collecte/conversion auto, chance, bulle, fleurs, régénération.
- **Bears & Quêtes** : 5 ours (Bruno, Luna, Rusty, Misty, Ember) avec une chaîne de quêtes
  et des récompenses (voir [`BEARS_DOCUMENTATION.md`](BEARS_DOCUMENTATION.md)).
- **Renaissance** : recommence à zéro contre un bonus permanent de pollen et une limite d'abeilles plus haute.
- **Comptes joueurs** (pseudo + mot de passe) et **mode invité**, sauvegarde dans le `localStorage`.
- Notifications **toast** non-bloquantes pour les achats, upgrades et messages d'erreur.

## 🗂️ Structure du projet

| Fichier | Rôle |
| --- | --- |
| `index.html` | Structure de la page, écrans (login, jeu) et modales. |
| `game.js` | Cœur du jeu : authentification, boucle de jeu, abeilles, fleurs, upgrades, sauvegarde. |
| `bears_system.js` | Système de quêtes des Bears (données + progression). |
| `style.css` | Styles de l'interface et des toasts. |
| `build.js` | Ajoute un hash de version aux fichiers dans `index.html` pour casser le cache. |
| `updatechecker.js` | Détecte une nouvelle version déployée et propose un rechargement. |
| `livereload.js` | Rechargement automatique en développement local. |

## 🔨 Build

Le script de build ajoute un hash de version aux ressources référencées dans `index.html`
afin de forcer le rechargement côté navigateur après un déploiement :

```bash
npm run build
```

## 🚀 Déploiement

Le workflow GitHub Actions [`.github/workflows/pages.yml`](.github/workflows/pages.yml)
publie le site sur GitHub Pages à chaque push sur la branche `main`.
