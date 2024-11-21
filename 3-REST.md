# REST ARCHITECTURE (Partie 3)

## II - REST ARCHITECTURE

### 1 - Definition

Rest une architecture logiciel basée sur le protocol HTTP.
Rest n'est pas : 
* Un protocol
* Un format
* Un Framework

IL a été crée par Roys Thomas Fielding

###  2 - Caractéristiques de l'architecture REST

* Stateless (sans état)
* Les ressources sont identifiés par une URI
* Les ressources sont accessibles au moyen des verbes HTTP (GET-POST-PUT-DELETE)
* Les ressources peuvent avoir plusieurs répresentations
* Les ressources possèdent un format

### 3 - Ressource
###### Quelque chose d'identifiable sur un système, ce peut être :

 - une ligne de base de données (relationnelle)
 - Un document (mongodb)
 - Le resultat d'un calcul
 - Un fichier (photo - videos, etc....)

### Le format de la ressource
 - Json
 - Xml
 - HTML
 - JPEG,PNG, GIF
 - MP3,MP4

Exemple: 
```
 - Format JSON
 {
    "id":1,
    "libelle":"Test"
 }
```
###### Identifiable par une URI
 - https://www.monapp/api/v1/books/1

```
 - books: ressource
 - 1 : idenitifiant de la ressource dans le système
```
### 4 - Les operations
Elles sont appliquées sur les ressources, elles sont basées sur les méthodes HTTP

* RETRIEVE : GET
* CREATE : POST
* UPDATE : PUT
* DELETE : DELETE