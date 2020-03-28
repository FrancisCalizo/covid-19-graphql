const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const CountryType = new GraphQLObjectType({
  name: 'Country',
  fields: () => ({
    stats: { type: StatsType }
  })
});

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
  name: 'RootQueryType',
  fields: {
    countries: {
      type: CountryType,
      resolve(parent, args) {
        return axios
          .get('https://pomber.github.io/covid19/timeseries.json')
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
