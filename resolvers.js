const axios = require('axios');

/*
  Resolvers are functions that map to each field within the GrapQL schema
  You'll notice the Query object in resolvers has the same shap as the Query object in typeDefs!
*/

// Helper function to return specified country data
const getCountryData = (countryData, queryArgs) => {
  // Create an array of all countries
  const countries = Object.keys(countryData);
  for (const country of countries) {
    if (queryArgs.country === country) {
      return countryData[queryArgs.country];
    }
  }
}

const resolvers = {
  Query: {
    countries: async (parent, args) => {
      /*
        This probably won't ever run because the country argument is required in our GraphQL schema
        but you can never be too careful.

        The args object is populated from the arguments that are passed to our GraphQL queries,
        so we can expect args.country to exist since it's required in the schema
      */
      if (!args.country) {
        throw new Error('You need to specify a country');
      }
      const res = await axios.get('https://pomber.github.io/covid19/timeseries.json');
      return getCountryData(res.data, args);
    }
  }
}

module.exports = resolvers