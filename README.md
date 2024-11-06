# Projet de technologies web : GameVote

GameVote est une application qui propose à ses utilisateur de rechercher des jeux vidéos à l'aide plusieurs critères.

## Authors

Théo FAEDO
Ismail TAGMOUTI

## Documents

Le repertoire */documents* contient différentes captures d'écran photos et vidéos de l'application ainsi que le diaporama de présentation du projet sous différents formats.

## Fonctionnement

L'application se base sur des api pour pouvoir rechercher des jeux mais la notation est gérée au niveau de la base de donnée de l'application.

## Installation

### Back-end 

Copiez/Collez le fichier *.env.example*, puis renommer le nouveau fichier en *.env*, vous pouvez dans celui-ci, déterminer les variables d'environnements de l'applications telles que les clé d'accès à l'api IGDB par exemple.

Il faudra ensuite installer les dépendances. Pour cela, il est conseillé d'utiliser le gestionnaire de package *yarn* dans le repertoire */backend/gamevote* comme suit :

```bash
yarn install
```

Pour lancer la base de données, toujours dans la repertoire */backend/gamevote*, utiliser la commande suivante :

```bash
docker compose -f ./scripts/docker-compose.yml up
```

Pour lancer le backend en dev vous pouvez en suite effectuer la commande :

```bash
nest start
```

Le serveur est alors disponible à l'addresse *localhost:3000*.

#### Données pour la base de données

Les fichiers présents dans le repertoire */backend/gamevote/scripts* contiennent des requête mongodb permettant d'initialiser un jeu de données. Il peut être intéressant de rechercher "Pokémon" dans la barre de recherche de l'application.

### Front-end

Il faudra ensuite installer les dépendances. Pour cela, il est conseillé d'utiliser le gestionnaire de package *yarn* dans le repertoire */frontend/gamevote* comme suit :

```bash
yarn install
```

Vous pouvez ensuite lancer le serveur via la commande :

```bash
yarn run start
```

Le serveur est alors disponible à l'addresse *localhost:4200*.



