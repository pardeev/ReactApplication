// Create a NeDB datastore for users with hashed passwords

import DataStore from "nedb-promises";
const db = DataStore.create("./usersDB");
import { readFile } from "fs/promises";

// Get sample data from JSON file
const users = JSON.parse(
  await readFile(new URL("./usersHash.json", import.meta.url))
);

async function setupUserDB() {
  let numRemoved = await db.remove({}, { multi: true });
  console.log("clearing database, removed " + numRemoved);

  // We let NeDB create _id property for us.
  let newDocs = await db.insert(users);
  console.log("Added " + newDocs.length + " users");
}

setupUserDB();
