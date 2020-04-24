const Todo = require("./todo");

module.exports = {
  async getTodos() {
    try {
      return await Todo.findAll();
    } catch (e) {
      throw new Error("Fetch todos is not available");
    }
  },

  async createTodo({ todo }) {
    try {
      return await Todo.create({
        title: todo.title,
        done: false,
      });
    } catch (e) {
      throw new Error("Can not create todo");
    }
  },

  async togleTodo({ id, state }) {
    try {
      const todo = await Todo.findByPk(+id);
      todo.done = state;

      await todo.save();

      return todo;
    } catch (e) {
      throw new Error("Can not togle todo");
    }
  },

  async deleteTodo({ id }) {
    try {
      const todo = await Todo.findByPk(+id);
      await todo.destroy();

      return true;
    } catch (e) {
      throw new Error("Can not delete todo");
    }
  },
};
