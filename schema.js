const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema
} = require('graphql');

// Country Type
const CountryType = new GraphQLObjectType({
  name: 'Country',
  fields: () => ({
    country: { type: new GraphQLList(StatsType) }
  })
});

// Stats Type
const StatsType = new GraphQLObjectType({
  name: 'Stats',
  fields: () => ({
    date: { type: GraphQLString },
    confirmed: { type: GraphQLInt },
    deaths: { type: GraphQLInt },
    recovered: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'Root Query',
  countries: {
    type: new GraphQLObjectType(CountryType),
    resolve(parent, args) {
      return axios
        .get('https://pomber.github.io/covid19/timeseries.json')
        .then(res => res.data);
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
