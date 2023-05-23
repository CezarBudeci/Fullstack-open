const Author = require('../../models/Author');
const Book = require('../../models/Book');
const { GraphQLError } = require('graphql');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

module.exports = resolvers = {
    Author: {
        name: root => root.name,
        id: root => root.id,
        born: root => root.born,
        bookCount: async root => {
            let result = [];

            if (!root._id) {
                const existingAuthors = await Author.find({ name: root.name });
                if (existingAuthors.length !== 1) {
                    return 0;
                }
                root._id = existingAuthors[0]._id;
            }

            result = await Book.find({ author: root._id });

            return result.length;
        },
    },
    Book: {
        title: root => root.title,
        published: root => root.published,
        author: root => {
            return {
                name: root.author.name,
                born: root.author.born,
            };
        },
        id: root => root.id,
        genres: root => root.genres,
    },
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            let options = {};
            if (args.author) {
                const existingAuthors = await Author.find({
                    name: args.author,
                });

                if (existingAuthors.length !== 1) {
                    return [];
                }
                options = { ...options, author: existingAuthors[0]._id };
            }

            if (args.genre) {
                options = { ...options, genres: args.genre };
            }

            return await Book.find(options).populate('author');
        },
        allGenres: async (root, args) => {
            let genres = [];

            const books = await Book.find({});

            if (books) {
                books.forEach(book => {
                    genres = genres.concat(book.genres);
                });
            }
            return [...new Set(genres)];
        },
        allAuthors: async () => Author.find({}),
        me: async (root, async, context) => {
            if (!context.currentUser) {
                throw new GraphQLError('You are not authorized', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }

            return context.currentUser;
        },
    },
    Mutation: {
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== 'password') {
                throw new GraphQLError('Wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

            const userForToken = {
                id: user._id,
                username: user.username,
                favoriteGenre: user.favoriteGenre,
            };

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre,
            });

            try {
                return user.save();
            } catch (error) {
                throw new GraphQLError('Creating user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.username,
                        error,
                    },
                });
            }
        },
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new GraphQLError('You are not authorized', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }

            const newBook = new Book({
                title: args.title,
                published: args.published,
                genres: args.genres,
            });

            const existingAuthors = await Author.find({
                name: args.author,
            });

            if (existingAuthors.length === 0) {
                const newAuthor = new Author({
                    name: args.author,
                });
                let savedAuthor;
                try {
                    savedAuthor = await newAuthor.save();
                } catch (error) {
                    throw new GraphQLError('Saving author failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.author,
                        },
                    });
                }

                newBook.author = savedAuthor._id;
            } else if (existingAuthors.length === 1) {
                newBook.author = existingAuthors[0]._id;
            } else {
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.author,
                    },
                });
            }

            let savedBook;
            try {
                savedBook = await newBook.save();
            } catch (error) {
                console.log(error);
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title,
                        error,
                    },
                });
            }

            if (savedBook) {
                const populatedBook = await Book.populate(savedBook, {
                    path: 'author',
                    select: ['name', 'born'],
                });
                pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook });
                return populatedBook;
            }

            return {};
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new GraphQLError('You are not authorized', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }

            const existingAuthors = await Author.find({ name: args.name });

            if (existingAuthors.length !== 1) {
                return null;
            }
            let existingAuthor = existingAuthors[0];
            existingAuthor.born = args.setBornTo;

            return await existingAuthor.save();
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
        },
    },
};
