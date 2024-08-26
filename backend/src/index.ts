// npm install @apollo/server express graphql cors
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs } from "./schema";
import { resolvers } from './resolvers';

interface MyContext {
    token?: String;
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }),
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
