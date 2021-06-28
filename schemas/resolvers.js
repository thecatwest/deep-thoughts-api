const { User, Thought } = require("../models");

const resolvers = {
  Query: {
    // pass in parent as sort of placeholder param. Won't be used but need something in the first param spot to access username arg in 2nd param
    thoughts: async (parent, { username }) => {
      // use ternary operator to check if username exists
      // if username exists, set params to an object with username key set to that value; otherwise, return empty object
      const params = username ? { username } : {};
      // pass that object to .find() method; if data exists, it'll perform lookup by username
      return Thought.find(params).sort({ createdAt: -1 });
    },

    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },

    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },

    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
  },
};

module.exports = resolvers;
