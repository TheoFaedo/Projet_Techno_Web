/**
 * This script is to create index inside the collection people of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */
db.getCollection('games').createIndex(
  { _id: 1, IgdbId: 1},
  { unique: true },
);

db.getCollection('advises').createIndex(
  { gameId: 1 },
  { unique: true },
);
