// CRUD create read update delete
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "to-do";

MongoClient.connect(connectionURL, {useNewUrlParser : true}, (error, client)=>{
    if(error){
        return console.log("unable to connect to database.");
    }
    console.log("connected correctly");
})