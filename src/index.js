require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const middlewares = require("./middlewares");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const PORT = 8080;

const context = async ({ req, res }) => {
  const user = { id: 1, name: "John Doe" };
  console.log(user);
  return {
    user,
  };
};

const startApolloServer = async () => {
  const app = express();

  app.use(morgan("dev"));
  app.use(middlewares.credentials);
  app.use(cors(middlewares.corsOptions));
  app.use(cookieParser());
  app.use(express.json());

  app.get("/", async (req, res) => {
    res.send("hello world");
  });

  app.use((err, req, res, next) => {
    res.status(err.status);
    res.send({
      message: err.message,
    });
  });

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    formatError: (err) => {
      console.log(err);
      if (err.extensions.exception.name === "UserError")
        return Error(err.message);
      return Error("An error occurred. Please try again later.");
    },
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: false,
  });

  await new Promise((resolve) => {
    httpServer.listen({ port: PORT }, resolve);
  });
  console.log(`Listening on port ${PORT}`);
};

startApolloServer();
