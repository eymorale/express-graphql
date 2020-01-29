const express = require('express');
const config = require('config');
const { ApolloServer, gql } = require('apollo-server-express');

// express app
const app = express();

// apollo server
const server = new ApolloServer({
    typeDefs: gql`
        type Query {
        status: String
        hello: String
        }
    `,
    resolvers: {
        Query: {
            status: () => 'Graphql server is up!',
            hello: () => 'Hello World!'
        },
    }
});

// connect apollo server to express server
// /graphql
server.applyMiddleware({ app });

app.use('/api/health', (req, res) => {
    res.send('Server is up!');
});

const host = process.env.HOST || config.host;
const port = process.env.PORT || config.port;
app.listen(port, () => {
    console.info(`app listening on http://${host}:${port}`);
    console.info(`Navigate to http://${host}:${port}/api/health`);
    console.info(`Navigate to http://${host}:${port}/graphql`);
});