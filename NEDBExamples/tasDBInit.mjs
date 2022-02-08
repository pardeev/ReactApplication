// Create a NeDB datastore for mammals that live in Narawtapu
// national park in Tasmania, Australia.

import { readFile } from "fs/promises";
import DataStore from "nedb-promises";
const db = DataStore.create("./tassieDB");

// Get sample data from JSON file
const mammals = JSON.parse(
  await readFile(new URL("./Narawntapu.json", import.meta.url))
);

async function cleanAndInsert() {
  // Clear out any existing entries if they exist
  let numRemoved = await db.remove({}, { multi: true });
  console.log("clearing database, removed " + numRemoved);

  // We let NeDB create _id property for us.
  let newDocs = db.insert(mammals);
  console.log("Added " + newDocs.length + " mammals");
}

cleanAndInsert();
