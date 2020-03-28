// Here we are defining the type definitions of the GraphQL schema
const typeDefs = `
  # Here we are defining our root Query object
  # This is the entry point of all queries
  type Query {
    # The countries field takes a country argument, that is required
    # This field will return an array of objects that are of type Stats
    countries(country: String!): [Stats]!
  }

  type Stats {
    date: String!
    confirmed: String!
    deaths: Int!
    recovered: Int!
  }
`;

module.exports = typeDefs;