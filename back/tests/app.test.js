const fs = require('fs');
const { setupStrapi } = require('./helpers/strapi');

it('strapi is defined', async () => {
  await setupStrapi();
  const dbSettings = strapi.config.get('database.connections.default.settings');// singleton so it can be called many times
  expect(strapi).toBeDefined();
});

require('./airport');
