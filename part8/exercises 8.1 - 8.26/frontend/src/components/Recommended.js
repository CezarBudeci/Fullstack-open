import { useQuery, useSubscription } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from '../queries/BooksQueries';

const Recommended = ({ currentUser }) => {
    const { data, refetch } = useQuery(ALL_BOOKS, {
        variables: { genre: currentUser ? currentUser.favoriteGenre : null },
    });

    useSubscription(BOOK_ADDED, {
        onData: () => {
            alert('A new book has been added');
            refetch();
        },
    });

    return (
        <div>
            <h2>Recommendations</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {data &&
                        data.allBooks &&
                        data.allBooks.map(book => (
                            <tr key={book.title}>
                                <td>{book.title}</td>
                                <td>{book.author.name}</td>
                                <td>{book.published}</td>
                                <td>{book.genres}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Recommended;
