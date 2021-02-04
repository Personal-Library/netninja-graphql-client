import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS_QUERY } from '../queries/queries.js';


const BookList = () => {
	const { loading, error, data } = useQuery(GET_BOOKS_QUERY);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Could not fetch books.</p>;

	return (
		<div>
			<ul id="book-list">
				{data.books.map((book) => (
					<li key={book.id}>{book.name}</li>
				))}
			</ul>
		</div>
	);
};

export default BookList;
