# Projet de technologies web : GameVote

GameVote est une application qui propose à ses utilisateur de rechercher des jeux vidéos à l'aide plusieurs critères.

## Fonctionnement

L'application se base sur une api pour pouvoir rechercher des jeux mais la notation est gérée au niveau de la base de donnée de l'application.

## Installation

### Backend 

Copiez/Collez le fichier *.env.example*, puis renommer le nouveau fichier en *.env*, vous pouvez dans celui-ci, déterminer les variables d'environnements de l'applications telles que les clé d'accès à l'api IGDB par exemple.

Il faudra ensuite installer les dépendances. Pour cela, il est conseillé d'utiliser le gestionnaire de package *yarn* dans le repertoire */backend/gamevote* comme suit :

```bash
yarn install
```

Pour lancer la base de données, toujours dans la repertoire */backend/gamevote*, utiliser la commande suivante :

```bash
docker compose -f ./scripts/docker-compose.yml up
```

