module.exports = {
  Query: {
    getUser: async (parent, args) => {
      return {
        id: 0,
        name: "John Doe",
      };
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      return {
        id: 0,
        name: "John Doe",
      };
    },
  },
};
