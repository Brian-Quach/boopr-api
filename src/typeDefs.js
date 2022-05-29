const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar JSONB
  scalar Date

  type User {
    id: Int!
    name: String
  }

  type Query {
    getUser: User
  }

  type Mutation {
    createUser(name: String!): User
  }
`;
