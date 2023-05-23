import { gql } from '@apollo/client';

export const ALL_BOOKS = gql`
    query ($genre: String) {
        allBooks(genre: $genre) {
            author {
                name
                born
            }
            published
            title
            genres
        }
    }
`;

export const ALL_GENRES = gql`
    query {
        allGenres
    }
`;

export const ADD_BOOK = gql`
    mutation (
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            title
            author {
                name
                born
            }
            published
            genres
        }
    }
`;

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            title
            author {
                name
                born
            }
            published
            genres
        }
    }
`;
