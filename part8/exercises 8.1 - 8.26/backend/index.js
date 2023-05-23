const { ApolloServer } = require('@apollo/server');
const mongoose = require('mongoose');
const typeDefs = require('./services/types/TypeDefs');
const resolvers = require('./services/resolvers/Resolvers');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const { expressMiddleware } = require('@apollo/server/express4');
const {
    ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const cors = require('cors');
const http = require('http');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
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
mongoose.set('debug', true);

const start = async () => {
    const app = express();
    const httpServer = http.createServer(app);

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/',
    });

    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer({
        schema: makeExecutableSchema({ typeDefs, resolvers }),
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });

    await server.start();

    app.use(
        '/',
        cors(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                const auth = req ? req.headers.authorization : null;
                if (auth && auth.startsWith('Bearer ')) {
                    const decodedToken = jwt.verify(
                        auth.substring(7),
                        process.env.JWT_SECRET
                    );
                    const currentUser = await User.findById(decodedToken.id);

                    return { currentUser };
                }
            },
        })
    );

    const PORT = 4000;
    httpServer.listen(PORT, () =>
        console.log(`Server running on port ${PORT}`)
    );
};

start();
