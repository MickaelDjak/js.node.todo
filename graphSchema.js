const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Todo {
    id: ID!
    title: String!
    done: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input TodoInput {
    title: String!
  }

  type Query {
    getTodos: [Todo!]!
  }

  type Mutation {
    createTodo(todo: TodoInput!): Todo!
    togleTodo(id: ID!, state: Boolean!): Todo!
    deleteTodo(id: ID!): Boolean
  }
`);
