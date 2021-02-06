import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS_QUERY } from '../queries/queries.js';
import BookDetails from './BookDetails.js';

const BookList = () => {
	const { loading, error, data } = useQuery(GET_BOOKS_QUERY);
	const [selected, setSelected] = useState('601c0b78b702dc1c3b324a37')
	// Above I have set a default request for the book query just so the 
	// viewer will always have something to look at

	const handleClick = (event) => {
		setSelected(event.target.id)
	}

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Could not fetch books.</p>;

	return (
		<div>
			<ul id="book-list">
				{data.books.map((book) => (
					<li key={book.id} id={book.id} onClick={handleClick}>{book.name}</li>
				))}
			</ul>
			<BookDetails bookId={selected} />
		</div>
	);
};

export default BookList;
