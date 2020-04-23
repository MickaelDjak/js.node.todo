const express = require("express");
const path = require("path");
const sequelize = require("./utils/dbconnection");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", require("./routes/todo"));
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
app.listen(PORT);
