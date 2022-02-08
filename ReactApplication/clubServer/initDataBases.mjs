import { readFile } from "fs/promises";
import DataStore from "nedb-promises";

const activitiesDB = DataStore.create("./activitiesDB");
const membersDB = DataStore.create("./membersDB");

const activities = JSON.parse(
    await readFile(new URL("./eventData.json", import.meta.url))
);

const members = JSON.parse(
    await readFile(new URL("./clubUsers3Hash.json", import.meta.url))
);

async function cleanAndInsert() {
    let numRemoved1 = await activitiesDB.remove({}, { multi: true });
    console.log("clearing database 1, removed " + numRemoved1);

    let numRemoved2 = await membersDB.remove({}, { multi: true });
    console.log("clearing database 2, removed " + numRemoved2);

    let activitiesDocs = activitiesDB.insert(activities);
    console.log("Added " + activitiesDocs.length + " activities");

    let membersDocs = membersDB.insert(members);
    console.log("Added " + membersDocs.length + " members");
}

cleanAndInsert();