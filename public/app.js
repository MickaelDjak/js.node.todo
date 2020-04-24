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
      fetch("/graphql/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `
        query {
          getTodos {
            id
            title
            done
            createdAt
            updatedAt
          }
        }
        `,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          this.todos = response.data.getTodos;
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

        fetch("/graphql/", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: `mutation {
              createTodo(todo: {title: "${title}"}) {
                id
                title
                done
                createdAt
                updatedAt
              }
            }`,
          }),
        })
          .then((res) => res.json())
          .then((response) => {
            this.todos.push(response.data.createTodo);
            this.todoTitle = "";
          });
      } catch (e) {
        console.error(e);
      }
    },
    completeTodo(id) {
      try {
        const index = this.todos.findIndex((t) => t.id === id);
        const state = !!this.todos[index].done;

        fetch("/graphql/", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: `mutation {
              togleTodo(id: ${id}, state: ${state}) {
                done
                updatedAt
              }
            }`,
          }),
        })
          .then((res) => res.json())
          .then((response) => {
            this.todos[index].done = response.data.createTodo.done;
            this.todos[index].updatedAt = response.data.createTodo.updatedAt;
          });
      } catch (e) {
        console.error(e);
      }
    },
    removeTodo(id) {
      try {
        fetch("/graphql/", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: `mutation {
              deleteTodo(id: ${id}) 
            }`,
          }),
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

      return new Intl.DateTimeFormat("en-En", option).format(
        new Date(value * 1000)
      );
    },
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
});
