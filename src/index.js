const express = require("express"); // add express libreary
require("./db/mongoose.js"); // add mongoose libreary
const User = require("./modules/user.js");
const Task = require("./modules/taks.js");
const app = express();
// add port for heroku app or locall host
const port = process.env.PORT || 3000;

app.use(express.json());

//EndPoint for create a User
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Endpoint to read all users
app.get("/users", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send();
  }
});

// Endpoint to read one user by id
app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

// Endpoint for update a user by id
app.patch("/users/:id", async (req, res) => {
  //check the to we have the key to update
  const updates = Object.keys(req.body);
  const allowedUpdaates = ["name", "email", "password", "age"];
  const isValidKey = updates.every((update) => {
    return allowedUpdaates.includes(update);
  });

  if (!isValidKey) {
    return res.status(400).send({ error: "invalid updates" });
  }

  const _id = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send({ error: "user not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Endpoint for delete user by id
app.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send({ error: "user not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Endpoint for create a task
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    res.status(404).send(error);
  }
});

// Endpoint for read all tasks
app.get("/tasks", async (req, res) => {
  try {
    const task = await Task.find({});
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send();
  }
});

//Endpoints for read one task by id
app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send();
  }
});

// Endpoint for update a task by id
app.patch("/tasks/:id", async (req, res) => {
  //check the to we have the key to update
  const updates = Object.keys(req.body);
  const allowedUpdaates = ["description", "completed"];
  const isValidKey = updates.every((update) => {
    return allowedUpdaates.includes(update);
  });

  if (!isValidKey) {
    return res.status(400).send({ error: "invalid updates" });
  }

  const _id = req.params.id;

  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send({ error: "task not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Endpoint for delete task by id
app.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).send({ error: "task not found" });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// run the server
app.listen(port, () => {
  console.log("server is up on port: ", port);
});
