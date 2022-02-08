// Open an existing database and get all the documents
// Make sure you run tasDBInit.mjs before you run this file.
//
import DataStore from "nedb-promises";
const db = DataStore.create("./tassieDB");

async function findThings() {
  let docs = await db.find({});
  console.log("We found " + docs.length + " Types of mammals");
  console.log(docs);

  // Get a list of all the types of Possums that live in the park:
  // Using a JavaScript regular expression
  docs = await db.find({ comName: /Possum/ });
  console.log("We found " + docs.length + " Types of Possums");
  console.log(docs);

  // Get a list off all types of Bandicoot
  // FYI https://en.wikipedia.org/wiki/Eastern_barred_bandicoot
  docs = await db.find({ comName: /Bandicoot/ });
  console.log("We found " + docs.length + " Types of Bandicoot");
  console.log(docs);

  // Kangaroos or Wallabys
  // Use $or operator
  docs = await db.find({
    $or: [{ comName: /Kangaroo/ }, { comName: /Wallaby/ }],
  });
  console.log("We found " + docs.length + " Kangaroo like thing");
  console.log(docs);
}

findThings();
