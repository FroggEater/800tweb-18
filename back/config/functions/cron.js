"use strict";

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
  // '0 1 * * 1': () => {
  //
  // }

  " 18 15 * * *": async () => {
    // console.log("deleting...");
    // try {
    //   let results = await strapi
    //     .query("airport")
    //     .find({ _limit: 100, id_null: false });
    //   {
    //     while (results != []) {
    //       let entity = JSON.parse(JSON.stringify(results));
    //       for (let i = 0; i < results.length; i++) {
    //         await strapi.query("airport").delete({ id: entity[i].id });
    //       }
    //       console.log("100 countries deleted");
    //       results = await strapi
    //         .query("airport")
    //         .find({ _limit: 100, id_null: false });
    //     }
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    // console.log("Ending");

    const airports = require("../../api/airport/airports.json");
    const airports_result = JSON.parse(JSON.stringify(airports));

    console.log("adding airports data...");
    airports_result.forEach(async (entry) => {
      //add country
      let current_country = await strapi.services["country"].findOne({
        name: entry.country,
      });
      if (!current_country) {
        await strapi.services["country"].create({
          name: entry.country,
        });
      }
      //add city
      let current_city = await strapi.services["city"].findOne({
        name: entry.city,
      });
      if (!current_city) {
        await strapi.services["city"].create({
          name: entry.city,
          country: current_country.id,
        });
      }
      //add airport
      if (entry.name === "") {
        await strapi.services["airport"].create({
          name: current_city.id + " Airport",
          trigram: entry.code,
          longitude: entry.lon,
          latitude: entry.lat,
          city: current_city.id,
        });
      } else {
        await strapi.services["airport"].create({
          name: entry.name,
          trigram: entry.code,
          longitude: entry.lon,
          latitude: entry.lat,
          city: current_city.id,
        });
      }
    });

    const data = require("../../api/country/capital.json");
    const result = JSON.parse(JSON.stringify(data));

    console.log("adding data ...");
    result.forEach(async (entry) => {
      let current_country = await strapi.services["country"].findOne({
        name: entry.name,
      });
      if (current_country) {
        await strapi.services["country"].update(
          { id: current_country.id },
          {
            trigram: entry.iso3,
          }
        );
      }
    });
    console.log("ending...");
  },
};
