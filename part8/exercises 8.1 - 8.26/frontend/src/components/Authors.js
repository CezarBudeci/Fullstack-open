import { useQuery, useSubscription } from '@apollo/client';
import { ALL_AUTHORS } from '../queries/AuthorsQueries';
import UpdateAuthor from './UpdateAuthor';
import { BOOK_ADDED } from '../queries/BooksQueries';

const Authors = ({ token }) => {
    const { data, refetch } = useQuery(ALL_AUTHORS);

    useSubscription(BOOK_ADDED, {
        onData: () => {
            alert('A new book has been added');
            refetch();
        },
    });

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {data &&
                        data.allAuthors &&
                        data.allAuthors.map(author => (
                            <tr key={author.name}>
                                <td>{author.name}</td>
                                <td>{author.born}</td>
                                <td>{author.bookCount}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {token ? <UpdateAuthor /> : <p>Please login to update authors</p>}
        </div>
    );
};

export default Authors;
