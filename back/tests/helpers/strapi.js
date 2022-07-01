const Strapi = require("strapi");
const fs = require("fs");
const http = require("http");

let instance;

async function setupStrapi() {
  if (!instance) {
    /** the following code is copied from `./node_modules/strapi/lib/Strapi.js` */
    await Strapi().load();
    instance = strapi; // strapi is now global
    await instance.app
      .use(instance.router.routes()) // populate KOA routes
      .use(instance.router.allowedMethods()); // populate KOA methods
    instance.server = http.createServer(instance.app.callback());
  }
  return instance;
}

async function cleanupStrapi() {
  const dbSettings = strapi.config.get("database.connections.default.settings");

  //close server to release the db-file
  await strapi.server.close();

  //delete test database after all tests have completed
  if (dbSettings && dbSettings.filename) {
    const tmpDbFile = `${__dirname}/../${dbSettings.filename}`;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
  // close the connection to the database
  await strapi.destroy();
}

module.exports = { setupStrapi, cleanupStrapi };
