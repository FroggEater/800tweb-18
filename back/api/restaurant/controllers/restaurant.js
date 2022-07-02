'use strict';
const axios = require('axios');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async getGoogleRestaurantsByCity(ctx) {
    const googleApiKey = 'AIzaSyC7Ar9hJO-6tID-HjG7p4qc5r62Bzw7aBc';
    const { city } = ctx.request.body;
    var latitude = ''
    var longitude = ''

    // find city location
    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleApiKey}`
      );
      latitude = data.results[0].geometry.location.lat;
      longitude = data.results[0].geometry.location.lng;
    } catch (error) {
      console.log(error);
    }

    // find hotels
    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=3000&type=restaurant&key=${googleApiKey}`
      );

      const customResponse = data.results.map((restaurant) => {
        const { name, vicinity, rating, geometry, photos } = restaurant;
        const { location } = geometry;
        const [photo] = photos;

        return {
          name,
          vicinity,
          rating,
          location,
          map_link: photo.html_attributions[0],
        };
      });

      ctx.send(customResponse);
    } catch (error) {
      console.log(error);
    }
  }
};
