const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');
const typeDefs = require('./services/types/TypeDefs');
const resolvers = require('./services/resolvers/Resolvers');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
mongoose.set('strictQuery', false);

require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL;
console.log('connecting to mongodb');

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        console.log('connected to mongodb');
    })
    .catch(e => {
        console.error('failed to connect to mongodb: ' + e.message);
    });

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7),
                process.env.JWT_SECRET
            );

            const currentUser = await User.findById(decodedToken.id);

            return { currentUser };
        }
        return;
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
