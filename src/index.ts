import "./dotenv";
import express, { Application } from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import fs from "fs";
import { resolvers } from "./resolvers";
import { plugins } from "./plugins";
import { dataSources } from "./datasources";
import { createContext } from "./context";

const app = express();

async function startApollo(app: Application) {
  const typeDefs = fs.readFileSync("./src/schema/index.graphql", {
    encoding: "utf-8",
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins,
    dataSources,
    context: createContext,
  });
  await server.start();
  server.applyMiddleware({
    app,
  });

  console.log(`Apollo started: http://127.0.0.1${server.graphqlPath} 🦄`);
}

http.createServer(app).listen(80, () => console.log("Server started 🚀"));
startApollo(app);
