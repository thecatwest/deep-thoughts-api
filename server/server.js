// update back-end server's code to serve up React front-end code in production
const path = require('path');

const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
// require auth middleware
const { authMiddleware } = require('./utils/auth');

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // must pass in context method set to return whatever you want available to the resolvers (headers/authMiddleware in this case)
  // ensure every request performs auth check, and updated obj will be passed to resolvers
  context: authMiddleware
});

// integrate our Apollo server with the Express application as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets for front-end code in production using back-end server code (only comes into effect when you go into production)
// first, check to see if Node environment is in production
if (process.env.NODE_ENV === 'production') {
  // if Node environ. is in production, instruct Express server to serve any files in React app's build directory in Client
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// wildcard GET route for the server. If you make a GET request to any location on the server that doesn't have explicit route defined, respond with production-ready React front-end code
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});