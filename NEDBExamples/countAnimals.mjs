// Shows counting
import DataStore from "nedb-promises";
const db = DataStore.create("./tassieDB");

// Count all
db.count({}).then(function (count) {
  console.log(`We counted ${count} mammals`);
});

// count Devil
db.count({ comName: /Devil/ }).then(function (count) {
  console.log(`We have ${count} type(s) of Devils`);
});
