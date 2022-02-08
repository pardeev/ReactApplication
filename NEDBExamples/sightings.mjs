/*
	This program first looks up the users name via email,
	then looks up the animals common name, then prints it out,
	then updates the user's and animal's sightings.
	
	Two versions are given one that works in series and one that
	works in parallel.
	
	To see the full effect, delete and initialize the tassieDB and
	usersDB.
*/
import DataStore from "nedb-promises";
const visitorsDB = DataStore.create("./usersDB");
const tassieDB = DataStore.create("./tassieDB");

let sighting1 = {
  email: "columbic1841@live.com",
  sciName: "Macropus rufogriseus rufogriseus",
};

let sighting2 = {
  email: "madonna1803@gmail.com",
  sciName: "Macropus giganteus tasmaniensis",
};

async function recordSighting(s) {
  try {
    let visitor = await visitorsDB.findOne({ email: s.email });
    let animal = await tassieDB.findOne({ sciName: s.sciName });
    console.log(
      `${visitor.firstName} ${visitor.lastName} saw a ${animal.comName}`
    );
    // Now update
    let up1 = await visitorsDB.update(
      { email: s.email },
      { $push: { sightings: s.sciName } }
    );
    let up2 = await tassieDB.update(
      { sciName: s.sciName },
      { $push: { sightings: s.email } }
    );
    console.log(`updated ${up1} visitor, and ${up2} animal(s)`);
  } catch (e) {
    console.log(`error: ${e}`);
  }
}

async function parallelRecordSighting(s) {
  try {
    let ps = [
      visitorsDB.findOne({ email: s.email }),
      tassieDB.findOne({ sciName: s.sciName }),
    ];
    let [visitor, animal] = await Promise.all(ps);
    console.log(
      `${visitor.firstName} ${visitor.lastName} saw a ${animal.comName}`
    );
    // Now update
    ps = [
      visitorsDB.update(
        { email: s.email },
        { $push: { sightings: s.sciName } }
      ),
      tassieDB.update(
        { sciName: s.sciName },
        { $push: { sightings: s.email } }
      ),
    ];
    let [up1, up2] = await Promise.all(ps);
    console.log(`updated ${up1} visitor, and ${up2} animal(s)`);
  } catch (e) {
    console.log(`error: ${e}`);
  }
}

recordSighting(sighting1);
parallelRecordSighting(sighting2);
