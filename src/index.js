const express = require("express"); // add express libreary
require("./db/mongoose.js"); // add mongoose libreary
const app = express(); // define routers
const userRouter = require("./routers/user.js");
const taskRouter = require("./routers/task.js");

// add port for heroku app or locall host
const port = process.env.PORT || 3000;

app.use(express.json()); // pares json
app.use(userRouter); // add user routers
app.use(taskRouter); // add task routers

// run the server
app.listen(port, () => {
  console.log("server is up on port: ", port);
});
