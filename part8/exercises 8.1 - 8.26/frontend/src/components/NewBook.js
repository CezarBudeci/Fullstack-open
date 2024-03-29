import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOK, ALL_BOOKS, ALL_GENRES } from '../queries/BooksQueries';
import { ALL_AUTHORS } from '../queries/AuthorsQueries';

const NewBook = ({ currentUser }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublished] = useState('');
    const [genre, setGenre] = useState('');
    const [genres, setGenres] = useState([]);

    const [addBook] = useMutation(ADD_BOOK, {
        refetchQueries: [
            { query: ALL_GENRES },
            { query: ALL_AUTHORS },
            { query: ALL_BOOKS, variables: { genre: null } },
            {
                query: ALL_BOOKS,
                variables: { genre: currentUser.favoriteGenre },
            },
        ],
    });

    const submit = event => {
        event.preventDefault();

        addBook({
            variables: { title, author, published: Number(published), genres },
        });

        setTitle('');
        setPublished('');
        setAuthor('');
        setGenres([]);
        setGenre('');
    };

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre('');
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    );
};

export default NewBook;
