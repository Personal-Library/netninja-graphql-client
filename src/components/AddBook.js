import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_AUTHORS_QUERY } from '../queries/queries.js';


const AddBook = () => {
	const { loading, error, data } = useQuery(GET_AUTHORS_QUERY);

	// Apparently this is required or else Apollo throws a fit
	if (loading) return <p>Currently loading..</p>;
	if (error) return <p>Could not fetch authors.</p>;

	return (
		<form id="add-book">
			<div className="field">
				<label>Book Name:</label>
				<input type="text" />
			</div>

			<div className="field">
				<label>Genre:</label>
				<input type="text" />
			</div>

			<div className="field">
				<label>Author:</label>
				<select>
					<option>Select Author</option>

					{data.authors.map((author) => (
						<option value={author.id} key={author.id}>
							{author.name}
						</option>
					))}
				</select>
			</div>

			<button>+</button>
		</form>
	);
};

export default AddBook;
