const express = require("express"); // add express libreary
const router = new express.Router(); //express :)
const Task = require("../modules/taks.js"); //add task model

//Endpoint for create a task
router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    res.status(404).send(error);
  }
});

// Endpoint for read all tasks
router.get("/tasks", async (req, res) => {
  try {
    const task = await Task.find({});
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send();
  }
});

//Endpoints for read one task by id
router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send({ error: "task not found" });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send();
  }
});

// Endpoint for update a task by id
router.patch("/tasks/:id", async (req, res) => {
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
router.delete("/tasks/:id", async (req, res) => {
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

module.exports = router;
