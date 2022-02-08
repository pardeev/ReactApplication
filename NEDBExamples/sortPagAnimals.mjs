// Shows sorting, pagination (limiting), and projection
import DataStore from "nedb-promises";
const db = DataStore.create("./tassieDB");

async function lookThemUp() {
  // Sort by common name, limit to the first 5
  let docs = await db.find({}).sort({ comName: 1 }).limit(5).exec();
  console.log("First 5 Sorted by Common name");
  console.log(docs);

  // The {"sciName": 1} argument to find restricts the fields that are returned
  docs = await db.find({}, { sciName: 1 }).sort({ sciName: 1 }).limit(5).exec();
  console.log("First 5 sorted by Scientific name");
  console.log(docs);
}

lookThemUp();
