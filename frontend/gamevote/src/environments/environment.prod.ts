export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    endpoints: {
      allGames: '/games',
      oneGame: '/games/:id',
      getComments: '/advices',
      addComment: '/advices/:gameId/add',
    }
  }
};
