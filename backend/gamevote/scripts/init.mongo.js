/**
 * This script is to insert initial data inside the collection people of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */

// Insert people array
db.getCollection('games').insert({
  igdbId: 1,
  steamAppId: 1,
  price: 0,
  last_time_refresh_price: new Date(),
});

// display the final initial data
db.getCollection('game').find({});
