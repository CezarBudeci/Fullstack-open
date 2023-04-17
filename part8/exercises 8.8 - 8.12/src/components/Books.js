import { useQuery, useSubscription } from '@apollo/client';
import { ALL_BOOKS, ALL_GENRES, BOOK_ADDED } from '../queries/BooksQueries';
import { useState, useEffect } from 'react';

const Books = () => {
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [genres, setGenres] = useState([]);
    const booksResult = useQuery(ALL_BOOKS, {
        variables: { genre: selectedGenre },
    });
    const genresResult = useQuery(ALL_GENRES);

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            genresResult.refetch();
            booksResult.refetch();
        },
    });

    useEffect(() => {
        if (genresResult.data && genresResult.data.allGenres) {
            setGenres(genresResult.data.allGenres);
        }
    }, [genresResult.data]);

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {booksResult.data &&
                        booksResult.data.allBooks &&
                        booksResult.data.allBooks.map(book => (
                            <tr key={book.title}>
                                <td>{book.title}</td>
                                <td>{book.author.name}</td>
                                <td>{book.published}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <select
                defaultValue={selectedGenre}
                onChange={({ target }) => {
                    setSelectedGenre(target.value);
                }}>
                <option value={null} label="all genres" />
                {genres.map(genre => (
                    <option key={genre} value={genre} label={genre} />
                ))}
            </select>
        </div>
    );
};

export default Books;
