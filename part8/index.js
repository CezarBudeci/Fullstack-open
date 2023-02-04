const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid');

let authors = [
    {
        name: 'Robert Martin',
        id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
        born: 1963,
    },
    {
        name: 'Fyodor Dostoevsky',
        id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
        born: 1821,
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
    },
];

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring'],
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
        genres: ['agile', 'patterns', 'design'],
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring'],
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring', 'patterns'],
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring', 'design'],
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
        genres: ['classic', 'crime'],
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
        genres: ['classic', 'revolution'],
    },
];

const typeDefs = `
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }

    type Book {
        title: String!
        published: Int!
        author: String!
        id: ID!
        genres: [String!]!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book!
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }
`;

const resolvers = {
    Author: {
        name: root => root.name,
        id: root => root.id,
        born: root => root.born,
        bookCount: root =>
            books.filter(value => value.author === root.name).length,
    },
    Book: {
        title: root => root.title,
        published: root => root.published,
        // author: root => {
        //     return {
        //         name: root.name,
        //         born: root.born,
        //     };
        // },
        author: root => root.author,
        id: root => root.id,
        genres: root => root.genres,
    },
    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            return books.reduce((filteredBooks, book) => {
                if (!args.author && !args.genre) {
                    filteredBooks.push(book);
                    return filteredBooks;
                }

                let isValid = true;

                if (args.author && args.author !== book.author) {
                    isValid = false;
                }

                if (args.genre && !book.genres.includes(args.genre)) {
                    isValid = false;
                }

                if (isValid) {
                    filteredBooks.push(book);
                    return filteredBooks;
                }

                return filteredBooks;
            }, []);
        },
        allAuthors: () => authors,
    },
    Mutation: {
        addBook: (root, args) => {
            const book = { ...args, id: uuid() };
            books.push(book);

            const existingAuthor = authors.find(
                author => author.name === args.author
            );
            if (!existingAuthor) {
                const author = { name: args.author, id: uuid() };
                authors.push(author);
            }

            return book;
        },
        editAuthor: (root, args) => {
            const existingAuthor = authors.find(
                author => author.name === args.name
            );
            if (!existingAuthor) {
                return null;
            }

            const updatedAuthor = { ...existingAuthor, born: args.setBornTo };
            authors = authors.map(author =>
                author.name === args.name ? updatedAuthor : author
            );
            return updatedAuthor;
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
