import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`;

export const ALL_AUTHORS_NAMES = gql`
    query {
        allAuthors {
            name
        }
    }
`;

export const UPDATE_AUTHOR_YEAR = gql`
    mutation ($name: String!, $born: Int!) {
        editAuthor(name: $name, setBornTo: $born) {
            name
            born
        }
    }
`;
