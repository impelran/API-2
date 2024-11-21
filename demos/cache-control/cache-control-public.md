# CACHE-CONTROL

## Pre-requis
* Node js
* Docker (optionnel)

## Création de projet
Créer un nouveau dossier cache-control. A l'intérieur de ce dernier, depuis votre terminal, faites la commande ci-dessous :
```
npm init
```
remplissez les informations en lien avec votre projet

## Fichier de démarrage
Créer un fichier index.js, ajouter-y le contenu ci-dessous : 
```
const express = require('express');
const app = express();
const port = 3000;

// Route principale pour la page HTML
app.get('/', (req, res) => {
  const timestamp = new Date().toISOString(); // Génération du timestamp pour la page HTML

  // Définir l'en-tête Cache-Control pour indiquer que la page peut être mise en cache pendant 60 secondes
  res.setHeader('Cache-Control', 'public, max-age=3');  // Cache valide pendant 60 secondes
  // Renvoyer le contenu HTML
  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Page avec Cache</title>
    </head>
    <body>
      <h1>Bienvenue sur notre site !</h1>
      <p>Le timestamp actuel est : <strong>${timestamp}</strong></p>
      </p><a href=''>nocache</a>
      <p>Cette page est mise en cache pendant 60 secondes.</p>
    </body>
    </html>
  `);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

```
Faites npm i express pour installer la dépendance express du projet.

## Accès à la page
 - Depuis votre navigateur accéder au site web à l'adresse: http://localhost:3000
 - Cliquer sur le lien test2
 - Que constatez-vous
 - Inspecter les echanges de requêtes entre le serveur et le client depuis la console réseau de votre navigateur