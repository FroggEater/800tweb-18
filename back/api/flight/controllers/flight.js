'use strict';
const axios = require('axios');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async getFlightFromDepartureToArrival(ctx) {
    const token = await strapi.services['token'].findOne({
      external_api: 'amadeus',
    });
    const { departure, arrival, date, adults } = ctx.request.body;
    try {
      const { data } = await axios.get(
        `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${departure}&destinationLocationCode=${arrival}&departureDate=${date}&adults=${adults}`,
        {
          headers: {
            Authorization: `Bearer ${token.token}`
          }
        }
      );
      let customResponse = {}
      data.data.forEach(flight => {
        customResponse[flight.id] = {
          price: flight.price.total,
          numberOfBookableSeats: flight.numberOfBookableSeats,
          itineraries: flight.itineraries
        }
      });
      ctx.send(customResponse);
    } catch (error) {
      console.log(error);
    }
  }
};
