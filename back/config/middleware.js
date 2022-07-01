// The redis configuration is commented, so we use memory to cache datas

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  settings: {
    cache: {
      enabled: true,
      // type: 'redis',
      // redisConfig: {
      //   sentinels: [
      //     { host: '192.168.10.41', port: 26379 },
      //     { host: '192.168.10.42', port: 26379 },
      //     { host: '192.168.10.43', port: 26379 },
      //   ],
      //   name: 'redis-primary',
      // },

      //populateContext: true,
      models: [
        {
          model: 'airports',
          maxAge: 86400000,
          cacheTimeout: 60000,
        },
        {
          model: 'cities',
          maxAge: 86400000,
          cacheTimeout: 60000,
        },
        {
          model: 'countries',
          maxAge: 86400000,
          cacheTimeout: 60000,
        },
        {
          model: 'flights',
          routes: [
            { path: "/flights-amadeus", method: "POST" },
          ],
          maxAge: 86400000,
          cacheTimeout: 60000,
        },
        {
          model: 'hotels',
          maxAge: 86400000,
          cacheTimeout: 60000,
        },
        {
          model: 'rooms',
          maxAge: 86400000,
          cacheTimeout: 60000,
        },
        {
          model: 'room-availabilities',
          maxAge: 86400000,
          cacheTimeout: 60000,
        },
      ],
      headers: ['accept-JavaScript']
    }
  }
});

// controller

// module.exports = {
//   async index(ctx) {
//     ctx.middleware.cache.store // This will give a direct access to the cache engine
//     await ctx.middleware.cache.bust({ model: 'airports' }); // Clear cache for the entire model collection
//     await ctx.middleware.cache.bust({ model: 'cities' });
//     await ctx.middleware.cache.bust({ model: 'countries' });
//     await ctx.middleware.cache.bust({ model: 'flights' });
//     await ctx.middleware.cache.bust({ model: 'hotels' });
//     await ctx.middleware.cache.bust({ model: 'rooms' });
//     await ctx.middleware.cache.bust({ model: 'availabilities' });
//   }
// };
