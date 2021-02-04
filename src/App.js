import React from 'react';
import './App.css'
import { 
  ApolloClient, 
  InMemoryCache, 
  gql,
  ApolloProvider, 
} from '@apollo/client'

// Components
import BookList from './components/BookList.js';
import AddBook from './components/AddBook.js';


// Remember to wrap App in ApolloProvider
// Should this be done to index.js instead?
const App = () => {
  // Create new ApolloClient according to docs
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  });

  // Provided sample query here
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


  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Ninja's Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
};

export default App