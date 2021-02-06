import React from 'react';
import './App.css'

// Significant change in methodology from 2018-2021 since React Hooks
// Per documentation hooks are now the preferred way to interact with Apollo
// Check documentation to make sure you are importing from the right source
import { 
  ApolloClient, 
  InMemoryCache, 
  gql,
  ApolloProvider, 
} from '@apollo/client'

// Components
import BookList from './components/BookList.js';
import AddBook from './components/AddBook.js';

const App = () => {
  // Create new ApolloClient according to docs
  // Almost every instance of ApolloClient uses class InMemoryCache
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  });

  // Sample query here confirms our connection, returns a promise
  client.query({
    query: gql`
    {
      books {
        name
        genre
        id
      }
    }
    `
  }).then(result => console.log(result));

// Remember to wrap App in ApolloProvider pointing to the new ApolloClient
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Anthony's Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
};

export default App