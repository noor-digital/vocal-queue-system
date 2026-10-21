# Vocal Queue System

Petite application web statique pour appeler des clients à un guichet : un compteur de numéros accompagné d'une **annonce vocale** (« Client numéro N, au guichet. ») et d'un bandeau d'annonce défilant.

Le projet est une simple page HTML/CSS/JavaScript : **aucun serveur, aucune base de données, aucune clé d'API** n'est nécessaire pour la faire fonctionner.

## Fonctionnalités

- **Compteur de 0 à 10** avec trois boutons :
  - **+** : passe au client suivant ;
  - **−** : revient au numéro précédent ;
  - **Réinitialiser** : remet le compteur à 0 (le bouton n'apparaît que lorsque le compteur est supérieur à 0).
- **Annonce vocale** en français (`fr-FR`) à chaque appui sur **+** ou **−** : « Client numéro N, au guichet. » Une nouvelle annonce interrompt la précédente. Aucune annonce n'est faite pour le numéro 0.
- **Bandeau défilant** « Annonce : Bienvenue — Prochain client : N » mis à jour avec le numéro courant.
- **Indicateurs d'état** : badge « MIN » à 0, badge « MAX » à 10, couleur du compteur (rouge à 0, turquoise de 1 à 9, or à 10) et boutons **+** / **−** désactivés aux bornes.
- **Affichage adapté aux écrans mobiles** (balise `viewport`, règle CSS pour les écrans de 600 px et moins).
- Boutons dotés d'un libellé accessible (`aria-label`) pour les lecteurs d'écran.

## Technologies

| Élément | Détail |
| --- | --- |
| HTML5 / CSS3 / JavaScript | Code natif, sans framework ni étape de build |
| [Bootstrap](https://getbootstrap.com/) 5.3.8 | Feuille de style chargée depuis le CDN jsDelivr (avec contrôle d'intégrité SRI) |
| [Bootstrap Icons](https://icons.getbootstrap.com/) 1.11.3 | Icônes chargées depuis le CDN jsDelivr (avec contrôle d'intégrité SRI) |
| [Web Speech API](https://developer.mozilla.org/docs/Web/API/SpeechSynthesis) (`speechSynthesis`) | Synthèse vocale intégrée au navigateur |

Bootstrap et Bootstrap Icons sont distribués sous licence MIT. Ils ne sont pas inclus dans ce dépôt : ils sont chargés à l'ouverture de la page.

## Utilisation

Il n'y a rien à installer. Deux possibilités :

1. Ouvrir directement `index.html` dans un navigateur ;
2. ou servir le dossier avec n'importe quel serveur de fichiers statiques, par exemple :

   ```bash
   python3 -m http.server 8000
   # puis ouvrir http://localhost:8000
   ```

## Prérequis et dépendances externes

Le projet n'a pas de backend, mais il dépend de plusieurs éléments extérieurs :

- **Connexion Internet** : Bootstrap et Bootstrap Icons sont chargés depuis `cdn.jsdelivr.net`. Hors ligne, la mise en forme et les icônes ne s'affichent pas correctement. Pour un usage hors ligne, il faut héberger ces fichiers soi-même.
- **Navigateur compatible avec la synthèse vocale** (`speechSynthesis`). Si l'API est absente, le compteur fonctionne mais aucune annonce n'est émise.
- **Voix française installée sur l'appareil** : les voix sont fournies par le navigateur et le système d'exploitation, pas par ce projet. Sans voix française, le texte peut être lu avec une autre voix, ou ne pas être lu du tout. Le rendu varie d'un appareil à l'autre.
- **Son activé** sur l'appareil. De nombreux navigateurs exigent une action de l'utilisateur (un clic) avant de parler ; c'est le cas ici puisque l'annonce est déclenchée par les boutons.

Aucune variable d'environnement, clé d'API ou identifiant n'est utilisé.

## Limites actuelles

Ce projet est un **compteur d'appel local**, pas un système de gestion de files d'attente complet :

- l'état du compteur est conservé **en mémoire uniquement** : il est perdu au rechargement de la page ;
- il fonctionne sur **un seul appareil / un seul onglet** : il n'y a ni synchronisation entre plusieurs écrans, ni serveur ;
- il n'y a **ni distribution de tickets, ni gestion de plusieurs guichets, ni liste de clients** ;
- la limite haute est fixée à 10 (constante `MAX_COUNT` dans `script.js`) ;
- le bandeau utilise l'élément HTML `<marquee>`, aujourd'hui obsolète mais encore pris en charge par les navigateurs ;
- il n'y a pas de tests automatisés.

Un affichage partagé entre plusieurs appareils ou un historique d'appels nécessiteraient l'ajout d'un serveur, qui n'existe pas dans ce dépôt.

## Structure du projet

```
.
├── index.html   # Structure de la page et chargement des ressources
├── script.js    # Compteur, états de l'interface, annonce vocale
├── style.css    # Mise en forme et affichage mobile
├── .gitignore
└── README.md
```

## Personnalisation

- **Nombre maximum de clients** : modifier `MAX_COUNT` dans `script.js`.
- **Texte de l'annonce et langue** : modifier la fonction `direClient` dans `script.js` (texte et `utterance.lang`).
- **Texte du bandeau** : modifier l'élément `<marquee>` dans `index.html`.

## Licence

Aucune licence n'a encore été définie pour ce dépôt. Tant qu'un fichier `LICENSE` n'est pas ajouté, tous les droits sont réservés par défaut.
