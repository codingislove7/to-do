const express = require("express");
require("./db/mongoose.js");
const User = require("./modules/user.js");
const Task = require("./modules/taks.js");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//Users
app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

//tasks

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.send(task);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});
app.listen(port, () => {
  console.log("server is up on port: ", port);
});
