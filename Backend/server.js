require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./src/schema/typeDefs');
const resolvers = require('./src/schema/resolvers');
const { authenticate } = require('./src/utils/auth');
const { verifyAuth0Token } = require('./src/utils/auth0');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Get token from the Authorization header
    const authHeader = req.headers.authorization || '';
    let user = null;
    const token = authHeader.replace('Bearer ', '');
    try {
      // If the token appears to be from Auth0 (for example, long RS256 token), verify using Auth0
      if (token.split('.').length === 3) {
        // This is a naive check. In practice, you may want to inspect the token's header.
        user = await verifyAuth0Token(token);
      }
    } catch (err) {
      console.error('Auth0 token verification failed:', err.message);
    }
    // Fallback: check custom token
    if (!user) {
      user = authenticate(token);
    }
    return { user };
  }
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
}

startServer();
