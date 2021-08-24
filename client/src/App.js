import React from 'react';
// import Apollo
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

// establish connection to back-end server's GraphQL endpoint
const httpLink = createHttpLink({
  // must use absolute path to server: React runs on 3000, server runs on 3001
  uri: 'http://localhost:3001/graphql',
});

// use ApolloClient() constructor to instantiate the Apollo Client instance and create the connection to the API endpoint
const client = new ApolloClient({
  link: httpLink,
  // instantiate new cache obj using new InMemoryCache()
  cache: new InMemoryCache(),
});

function App() {
  return (
  // must enable entire app to interact w/ Apollo Client Instance; wrap entire JSX with ApolloProvider
  // because passing in the client variable as value for client prop in provider, everything between JSX has access to server's API through client that we set up
    <ApolloProvider client={client}>
    <div className='flex-column justify-flex-start min-100-vh'>
      <Header />
      <div className='container'>
        <Home />
      </div>
      <Footer />
    </div>
    </ApolloProvider>
  );
}

export default App;
