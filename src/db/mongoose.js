// add mongoose libreary 
const mongoose = require("mongoose");

// connect mongoose to data base
mongoose.connect("mongodb://127.0.0.1:27017/to-do-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

