/**
 * This script is to insert initial data inside the collection people of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */

db.getCollection('games').deleteMany({});


// Games
db.getCollection("games").insertMany([{
  "name": "Lethal VR",
  "igdbId": 25743,
  "steamAppId": 532270,
  "price": 3.15,
  "last_time_price_refresh": {
    "$date": "2024-11-01T23:38:07.892Z"
  },
  "first_release_date": 1478563200,
  "genres": [
    5,
    13
  ],
  "platforms": [
    6,
    48,
    165
  ],
  "game_modes": [
    1
  ]
},
{
  "name": "Lethal League Blaze",
  "igdbId": 59858,
  "steamAppId": 553310,
  "price": 12.99,
  "last_time_price_refresh": {
    "$date": "2024-11-01T23:42:20.222Z"
  },
  "first_release_date": 1540339200,
  "genres": [
    4,
    14,
    32,
    33
  ],
  "platforms": [
    3,
    6,
    14,
    48,
    49,
    130
  ],
  "game_modes": [
    1,
    2,
    3
  ]
},
{
  "name": "Pixadom",
  "igdbId": 317582,
  "steamAppId": null,
  "price": null,
  "last_time_price_refresh": {
    "$date": "2024-11-03T23:20:25.162Z"
  },
  "first_release_date": 1724112000,
  "genres": [
    8,
    12,
    31,
    32
  ],
  "platforms": [
    82
  ],
  "game_modes": [
    2,
    5
  ]
},
{
  "name": "Ropin' Ranch",
  "igdbId": 279425,
  "steamAppId": null,
  "price": null,
  "last_time_price_refresh": {
    "$date": "2024-11-04T15:38:39.594Z"
  },
  "first_release_date": 1625529600,
  "genres": [
    13
  ],
  "platforms": [
    82
  ],
  "game_modes": [
    2
  ]
},
{
  "name": "Batman: Arkham Collection",
  "igdbId": 112659,
  "steamAppId": 0,
  "price": null,
  "last_time_price_refresh": {
    "$date": "2024-11-04T16:11:43.754Z"
  },
  "first_release_date": 1543276800,
  "genres": [
    12,
    25,
    31
  ],
  "platforms": [
    6,
    48,
    49
  ],
  "game_modes": [
    1
  ]
},
{
  "name": "Metal Gear Solid: The Legacy Collection",
  "igdbId": 20196,
  "steamAppId": null,
  "price": null,
  "last_time_price_refresh": {
    "$date": "2024-11-04T16:12:12.624Z"
  },
  "first_release_date": 1373328000,
  "genres": [
    31
  ],
  "platforms": [
    9
  ],
  "game_modes": [
    1
  ]
},
{
  "name": "Imperium Galactica",
  "igdbId": 15188,
  "steamAppId": 573790,
  "price": 1.24,
  "last_time_price_refresh": {
    "$date": "2024-11-04T16:15:54.383Z"
  },
  "first_release_date": 857174400,
  "genres": [
    13,
    15
  ],
  "platforms": [
    6,
    13,
    39
  ],
  "game_modes": [
    1
  ]
},
{
  "name": "Lizards Must Die",
  "igdbId": 264773,
  "steamAppId": 2532550,
  "price": 1.99,
  "last_time_price_refresh": {
    "$date": "2024-11-04T16:35:03.376Z"
  },
  "first_release_date": 1695772800,
  "genres": [
    25,
    32
  ],
  "platforms": [
    6
  ],
  "game_modes": [
    1
  ]
},
{
  "name": "MLB Power Pros 2008",
  "igdbId": 5010,
  "steamAppId": null,
  "price": null,
  "last_time_price_refresh": {
    "$date": "2024-11-04T16:37:33.168Z"
  },
  "first_release_date": 1217289600,
  "genres": [
    13,
    14
  ],
  "platforms": [
    5,
    8,
    20
  ],
  "game_modes": [
    1,
    2
  ]
},
{
  "name": "Adastra",
  "igdbId": 135341,
  "steamAppId": null,
  "price": null,
  "last_time_price_refresh": {
    "$date": "2024-11-04T16:43:23.729Z"
  },
  "first_release_date": 1544745600,
  "genres": [
    34
  ],
  "platforms": [
    3,
    6,
    14,
    34
  ],
  "game_modes": [
    1
  ]
},
{
  "name": "Golden Axe Warrior",
  "igdbId": 46147,
  "steamAppId": null,
  "price": null,
  "last_time_price_refresh": {
    "$date": "2024-11-04T18:03:26.883Z"
  },
  "first_release_date": 678326400,
  "genres": [
    12
  ],
  "platforms": [
    64
  ],
  "game_modes": []
},
{
  "name": "Lethal Honor: Order of the Apocalypse",
  "igdbId": 161495,
  "steamAppId": 1266060,
  "price": null,
  "last_time_price_refresh": {
    "$date": "2024-11-04T23:43:25.215Z"
  },
  "first_release_date": 1735603200,
  "genres": [
    25,
    31,
    32
  ],
  "platforms": [
    6,
    48,
    49,
    130
  ],
  "game_modes": [
    1
  ]
},
{
  "name": "Call of Duty: Black Ops 6",
  "igdbId": 302156,
  "steamAppId": 0,
  "price": null,
  "last_time_price_refresh": {
    "$date": "2024-11-04T23:49:18.901Z"
  },
  "first_release_date": 1729814400,
  "genres": [
    5
  ],
  "platforms": [
    6,
    48,
    49,
    167,
    169
  ],
  "game_modes": [
    1,
    2,
    3
  ]
},
{
  "name": "Pokémon Black Version",
  "igdbId": 1521,
  "steamAppId": null,
  "price": null,
  "last_time_price_refresh": {
    "$date": "2024-11-05T23:52:45.453Z"
  },
  "first_release_date": 1284768000,
  "genres": [
    12,
    16,
    31
  ],
  "platforms": [
    20
  ],
  "game_modes": [
    "1,2"
  ]
},
{
  "name": "Pokémon Gold Version",
  "igdbId": 1558,
  "steamAppId": null,
  "price": null,
  "last_time_price_refresh": {
    "$date": "2024-11-05T23:55:59.006Z"
  },
  "first_release_date": 943142400,
  "genres": [
    12,
    16,
    31
  ],
  "platforms": [
    22,
    37
  ],
  "game_modes": [
    "1,2"
  ]
},
{
  "name": "Pokémon Platinum Version",
  "igdbId": 1519,
  "steamAppId": null,
  "price": null,
  "last_time_price_refresh": {
    "$date": "2024-11-06T00:01:49.636Z"
  },
  "first_release_date": 1221264000,
  "genres": [
    12,
    16,
    31
  ],
  "platforms": [
    20
  ],
  "game_modes": [
    "1,2"
  ]
},
{
  "name": "Pokémon Violet",
  "igdbId": 191930,
  "steamAppId": null,
  "price": null,
  "last_time_price_refresh": {
    "$date": "2024-11-06T00:09:36.719Z"
  },
  "first_release_date": 1668729600,
  "genres": [
    12,
    16,
    31
  ],
  "platforms": [
    130
  ],
  "game_modes": [
    "1,2"
  ]
}]);

// Advices
db.getCollection('advice').deleteMany({})

db.getCollection('advice').insertMany([{
  "gameId": 317582,
  "author": "isti",
  "content": "super",
  "note": 5
},
{
  "gameId": 1521,
  "author": "Istifar",
  "content": "The better",
  "note": 10
},
{
  "gameId": 1558,
  "author": "Istifar",
  "content": "Pas mal non plus",
  "note": 8
},
{
  "gameId": 1519,
  "author": "Istifar",
  "content": "Nostalgie c'est tout",
  "note": 7
},
{
  "gameId": 191930,
  "author": "Istifar",
  "content": "Pas ouf",
  "note": 4
},
{
  "gameId": 191930,
  "author": "PasIstifar",
  "content": "Le jeu est aussi bien code que cette app ;)",
  "note": 3
},
{
  "gameId": 191930,
  "author": "PasIstifardeux",
  "content": "Palworld est mieux",
  "note": 3
},
{
  "author": "Alice",
  "note": 7,
  "content": "Un bon jeu avec un gameplay solide. Quelques améliorations possibles.",
  "gameId": "317582"
},
{
  "author": "Bob",
  "note": 9,
  "content": "Exceptionnel ! Une immersion totale et des graphismes au top.",
  "gameId": "317582"
},
{
  "author": "Charlie",
  "note": 5,
  "content": "Correct mais assez répétitif. Peut-être pour un public moins exigeant.",
  "gameId": "279425"
},
{
  "author": "Diane",
  "note": 6,
  "content": "Pas mal, mais certaines fonctionnalités manquent de finition.",
  "gameId": "279425"
},
{
  "author": "Eve",
  "note": 8,
  "content": "Une bonne surprise, bien plus que ce à quoi je m'attendais.",
  "gameId": "269473"
},
{
  "author": "Frank",
  "note": 4,
  "content": "Trop de bugs pour pouvoir profiter pleinement du jeu.",
  "gameId": "269473"
},
{
  "author": "Grace",
  "note": 9,
  "content": "Très satisfaisant, une histoire captivante et bien réalisée.",
  "gameId": "15188"
},
{
  "author": "Heidi",
  "note": 7,
  "content": "Bon jeu, mais il y a quelques améliorations à faire dans le gameplay.",
  "gameId": "15188"
},
{
  "author": "Ivan",
  "note": 6,
  "content": "Une expérience correcte, mais il manque un petit quelque chose.",
  "gameId": "264773"
},
{
  "author": "Judy",
  "note": 8,
  "content": "Jeu bien conçu avec des graphismes de qualité et un gameplay agréable.",
  "gameId": "264773"
}])

// display the final initial data
db.getCollection('games').find({});
