// Open an existing database and get all the documents
// Make sure you run simpleDBInit.mjs before you run this file.
//
import DataStore from "nedb-promises";
const db = DataStore.create("./blogDB");
// Get all the documents in the database
db.find({}).then(function (docs) {
  console.log("We found " + docs.length + " documents");
  console.log(docs);
});
