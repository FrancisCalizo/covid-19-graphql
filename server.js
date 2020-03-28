const express = require('express');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const app = express();

// Combines our type definitions and resolvers to create an executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
