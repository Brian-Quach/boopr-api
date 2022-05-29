const users = require("./users");

module.exports = {
  Query: {
    ...users.Query,
  },
  Mutation: {
    ...users.Mutation,
  },
};
