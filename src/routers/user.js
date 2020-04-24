const express = require("express"); // add express libreary
const router = new express.Router(); //express :)
const User = require("../modules/user.js"); //add user model
//EndPoint for create a User
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Endpoint to read all users
router.get("/users", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send();
  }
});

// Endpoint to read one user by id
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).send({ error: "user not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

// Endpoint for update a user by id
router.patch("/users/:id", async (req, res) => {
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
router.delete("/users/:id", async (req, res) => {
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

module.exports = router;
