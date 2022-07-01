"use strict";
const axios = require('axios');
var querystring = require('querystring');

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
  // '38 * * * *': () => {
  //
  // }

  " */25 * * * *": async () => {
    try {
    const data  = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token',
      querystring.stringify({
        grant_type: 'client_credentials',
        client_id: 'fmiUIUSGBbU6UhZSNSr0EG9jaG30pURr',
        client_secret: 'MuLDECeSUB0fVSGb'
      }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    await strapi.services['token'].update(
      { external_api: 'amadeus' },
      {
        token: data.data.access_token
      }
    )
    } catch (error) {
      console.log(error);
    }
  },

  " 46 * * * *": async () => {
    console.log("deleting...");
    //delete country
    try {
      let results = await strapi
        .query("country")
        .find({ _limit: 100, id_null: false });
      {
        while (results.length > 0) {
          let entity = JSON.parse(JSON.stringify(results));
          for (let i = 0; i < results.length; i++) {
            await strapi.query("country").delete({ id: entity[i].id });
          }
          console.log("100 countries deleted");
          results = await strapi
            .query("country")
            .find({ _limit: 100, id_null: false });
        }
      }
    } catch (err) {
      console.log(err);
    }
    //delete city
    try {
      let results = await strapi
        .query("city")
        .find({ _limit: 100, id_null: false });
      {
        while (results.length > 0) {
          let entity = JSON.parse(JSON.stringify(results));
          for (let i = 0; i < results.length; i++) {
            await strapi.query("city").delete({ id: entity[i].id });
          }
          console.log("100 cities deleted");
          results = await strapi
            .query("city")
            .find({ _limit: 100, id_null: false });
        }
      }
    } catch (err) {
      console.log(err);
    }
    console.log("Delete task ending");

    const countries = require("../../api/country/capital.json");
    const result = JSON.parse(JSON.stringify(countries));

    console.log("adding data ...");
    result.forEach(async (entry) => {
      await strapi.services["country"].create({
        name: entry.name,
        trigram: entry.iso3,
      });

      let current_country = await strapi.services["country"].findOne({
        name: entry.name,
      });
      if (entry.name !== "") {
        await strapi.services["city"].create({
          name: entry.capital,
          country: current_country.id,
        });
      }
      console.log("ending country and capital");
    });
  },
};
