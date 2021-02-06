import { gql } from '@apollo/client';

// Apollo docs follows the uppercase lodash naming convention
// It is important to note that gql queries with 
// improper syntax will result in a runtime error
const GET_BOOKS_QUERY = gql`
	{
		books {
			name
			genre
			id
		}
	}
`;

const GET_AUTHORS_QUERY = gql`
	{
		authors {
			name
			id
		}
	}
`;

// Note here that if you call a method such as query or mutation that it is not wrapped in curly brackets
const GET_BOOK_QUERY = gql`
query($id: ID!) {
	book(id: $id) {
		id
		name
		genre
		author{
			id
			name
			age
			books{
				name
				id
			}
		}
	}
}
`;

const ADD_BOOK = gql`
	mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			id
		}
	}
`;

export { GET_AUTHORS_QUERY, GET_BOOKS_QUERY, GET_BOOK_QUERY, ADD_BOOK };
