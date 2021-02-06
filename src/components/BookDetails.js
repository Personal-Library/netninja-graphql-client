import { GET_BOOK_QUERY } from '../queries/queries.js';
import { useQuery } from '@apollo/client';

const BookDetails = (props) => {
  const { loading, error, data } = useQuery(GET_BOOK_QUERY, {
    variables: {
      id: props.bookId
    }
  });
  // console.log(data)

  // If you let it get to the return statement before data comes back from
  // MongoDB, then you'll get an error. Make sure to have an early return
  // That shows a loading panel.
  if (loading) return <p>loading...</p>
  if (error) return <p>error...</p>

  // Check if book data is available, else return 'No book selected'.
  const renderBookDetails = data.book ? (
    <div>
      <h2>{data.book.name}</h2>
      <p>{data.book.genre}</p>
      <p>{data.book.author.name}</p>
      <p>All books by this author:</p>
      <ul className="other-books">
        {data.book.author.books.map(book => <li key={book.id}>{book.name}</li>)}
      </ul>
    </div>
  ) : (<div>No book selected</div>)

  return (
    <div id="book-details">
      {renderBookDetails}
    </div>
  );
}

export default BookDetails;