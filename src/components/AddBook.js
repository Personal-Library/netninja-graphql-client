import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHORS_QUERY, GET_BOOKS_QUERY, ADD_BOOK } from '../queries/queries.js';
// If the GQL syntax is not correct it WILL throw an error on page render.
// The query variables and their types are defined before declaring the mutation
// after the opening curly bracket

const AddBook = () => {
	const { loading, error, data: authorData } = useQuery(GET_AUTHORS_QUERY);
	const [name, setName] = useState('');
	const [genre, setGenre] = useState('');
	const [author, setAuthor] = useState('');
	const [addBook] = useMutation(ADD_BOOK);
	// const [addBook, { data }] = useMutation(ADD_BOOK);

	const handleClick = (e) => {
		e.preventDefault();
		console.log(`Name: ${name}, Genre: ${genre}, AuthorID: ${author}`);
		addBook({
			variables: {
				name: name,
				genre: genre,
				authorId: author,
			},
			refetchQueries: [{ query: GET_BOOKS_QUERY }],
		}).then(({ data }) =>
			console.log('The ID for the book you submitted was: ' + data.addBook.id)
		);
	};

	// The component must return something before it begins to call on the promised data. If this is not done you will get a data.thing is not defined. 
	if (loading) return <p>Currently loading..</p>;
	if (error) return <p>Could not fetch authors.</p>;

	return (
		<form id="add-book">
			<div className="field">
				<label>Book Name: </label>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>

			<div className="field">
				<label>Genre: </label>
				<input
					type="text"
					value={genre}
					onChange={(e) => setGenre(e.target.value)}
				/>
			</div>

			<div className="field">
				<label>Author: </label>
				<select value={author} onChange={(e) => setAuthor(e.target.value)}>
					<option>Select Author</option>

					{authorData.authors.map((author) => (
						<option value={author.id} key={author.id}>
							{author.name}
						</option>
					))}
				</select>
			</div>

			<button onClick={handleClick}>+</button>
		</form>
	);
};

export default AddBook;
