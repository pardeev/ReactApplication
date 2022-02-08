// Shows Updating
import DataStore from "nedb-promises";
const db = DataStore.create("./tassieDB");

async function updateThem() {
  // update Devil
  let doc = await db.update(
    { comName: /Devil/ },
    { $set: { status: "Endangered" } }
  );
  console.log(`Updated Tas Devil`);
  console.log(doc);

  doc = await db.find({ comName: /Devil/ });
  console.log(`Updated Tas Devil`);
  console.log(doc);

  doc = await db.update(
    { comName: /Devil/ },
    { $unset: { status: "Endangered" } }
  );
  console.log(`Updated Tas Devil`);
  console.log(doc);

  doc = await db.find({ comName: /Devil/ });
  console.log(`Updated Tas Devil`);
  console.log(doc);
}

updateThem();
