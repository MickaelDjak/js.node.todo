const express = require("express");
const path = require("path");
const sequelize = require("./dbconnection");
const graphqlHTTP = require("express-graphql");
const schema = require("./graphSchema");
const resolver = require("./graphResolver");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

async function start() {
  try {
    await sequelize.sync();
  } catch (e) {
    console.log(e);
  }
}

start();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Now browse to localhost:3000/graphql"));
