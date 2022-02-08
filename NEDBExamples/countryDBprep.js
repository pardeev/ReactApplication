/* Create a NeDB datastore for countries around the world

  JSON files from: https://github.com/samayo/country-json

  Remove the file countriesDB before running this example
*/
const DataStore = require('nedb');
const db = new DataStore({filename: __dirname + '/countriesDB', autoload: true});

const abrev = require('./country-by-abbreviation.json');
const captital = require('./country-by-capital-city.json');
const dish = require('./country-by-national-dish.json');
const pop = require('./country-by-population.json');
const region = require('./country-by-region-in-world.json');
const area = require('./country-by-surface-area.json');
// We let NeDB create _id property for us.

db.ensureIndex({ fieldName: 'country', unique: true }, function (err) {
});


db.insert(abrev, function(err, newDocs) {
  if(err) {
    // console.log("Something went wrong when writing");
    // console.log(err);
  } else {
    console.log("Added " + newDocs.length + " countries");
  }
});

for (let ab of abrev) {
  db.update({country: ab.country}, { $set: { abbreviation: ab.abbreviation } }, function (err, numReplaced){
    if (err) {
      console.log(err);
    }
  });
}

for (let cap of captital) {
  db.update({country: cap.country}, { $set: { city: cap.city } }, function (err, numReplaced){
    if (err)
      console.log(err);
  });
}

for (let plate of dish) {
  db.update({country: plate.country}, { $set: { dish: plate.dish } }, function (err, numReplaced){
    if (err)
      console.log(err);
  });
}

for (let p of region) {
  db.update({country: p.country}, { $set: { location: p.location } }, function (err, numReplaced){
    if (err)
      console.log(err);
  });
}

for (let p of pop) {
  db.update({country: p.country}, { $set: { population: parseInt(p.population) } }, function (err, numReplaced){
    if (err)
      console.log(err);
  });
}

for (let p of area) {
  db.update({country: p.country}, { $set: { area: parseInt(p.area) } }, function (err, numReplaced){
    if (err)
      console.log(err);
  });
}

