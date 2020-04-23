new Vue({
  el: "#app",
  vuetify: new Vuetify(),

  data() {
    return {
      show: true,
      todoTitle: "",
      todos: [],
    };
  },
  mounted() {
    try {
      fetch("/api/")
        .then((res) => res.json())
        .then((todos) => {
          this.todos = todos;
        });
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    addTodo() {
      try {
        const title = this.todoTitle.trim();
        if (!title) return;
        fetch("/api/", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
          }),
        })
          .then((res) => res.json())
          .then(({ todo }) => {
            this.todos.push(todo);
            this.todoTitle = "";
          });
      } catch (e) {
        console.error(e);
      }
    },
    completeTodo(id) {
      try {
        const index = this.todos.findIndex((t) => t.id === id);
        const isDone = !!this.todos[index].done;

        fetch(`/api/${id}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            done: isDone,
          }),
        })
          .then((res) => res.json())
          .then(({ todo }) => {
            this.todos[index].done = isDone;
            this.todos[index].updatedAt = todo.updatedAt;
          });
      } catch (e) {
        console.error(e);
      }
    },
    removeTodo(id) {
      try {
        fetch(`/api/${id}`, {
          method: "delete",
        }).then(() => {
          this.todos = this.todos.filter((t) => t.id !== id);
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
  filters: {
    capitalize(value) {
      return value.toString().charAt(0).toUpperCase() + value.slice(1);
    },
    date(value, withTime) {
      const option = {
        year: "numeric",
        month: "long",
        day: "2-digit",
      };

      if (withTime) {
        option.hour = "2-digit";
        option.minute = "2-digit";
        option.second = "2-digit";
      }

      return new Intl.DateTimeFormat("en-En", option).format(new Date(value));
    },
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
});
