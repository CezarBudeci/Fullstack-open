import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries/AuthorsQueries';
import UpdateAuthor from './UpdateAuthor';

const Authors = ({ token }) => {
    const result = useQuery(ALL_AUTHORS);

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
                    {result.data &&
                        result.data.allAuthors &&
                        result.data.allAuthors.map(author => (
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
