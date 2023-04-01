import { gql } from '@apollo/client';

export const ALL_BOOKS = gql`
    query {
        allBooks {
            author
            published
            title
        }
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
            author
            published
            genres
        }
    }
`;
