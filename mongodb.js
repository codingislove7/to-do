// CRUD create read update delete
const { MongoClient, ObjectID } = require("mongodb");
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "to-do";

// setup connection with database
MongoClient.connect(
  connectionURL,
  { useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("unable to connect to database.");
    }
    const db = client.db(databaseName);
    db.collection("users")
      .deleteOne({
        name: "sssorss",
      })
      .then((result) => {
        console.log("====================================");
        console.log(result.deletedCount);
        console.log("====================================");
      })
      .catch((error) => {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      });
  }
);
