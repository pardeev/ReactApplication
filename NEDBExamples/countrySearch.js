/* Create a NeDB datastore for countries around the world

  JSON files from: https://github.com/samayo/country-json

  Remove the file countriesDB before running this example
*/
const DataStore = require('nedb');
const db = new DataStore({filename: __dirname + '/countriesDB', autoload: true});



db.ensureIndex({ fieldName: 'country', unique: true }, function (err) {
});


db.count({}, function(err, count) {
  if(err) {
    // console.log("Something went wrong when writing");
    // console.log(err);
  } else {
    console.log("There are " + count + " countries");
  }
});


db.find({country: /^G/}, function(err, docs) {
  if (err) {
    console.log("could not find a country starting with the letter G.");
  } else {
    console.log(`\nFound ${docs.length} countries starting with G`);
  }
});

// find by letter and sort by population

db.find({country: /^G/}).sort({population: 1}).exec(function(err, docs) {
  if (err) {
    console.log("could not find a country starting with the letter G.");
  } else {
    for (let d of docs) {
      console.log(`Name ${d.country}, Population: ${d.population}`);
    }
  }
});

db.find({country: /^G/}).sort({area: -1}).limit(5).exec(function(err, docs){
    if (err) {
    console.log("could not find a country with area");
  } else {
      console.log("\n\nTop 5 biggest G countries:")
    for (let d of docs) {
      console.log(`Name ${d.country}, Area: ${d.area}`);
    }
  }
})

db.find({$and: [{country: /^G/}, {population: {$gt: 1000000}},
    {population: {$lt:10000000}}]}).sort({population: 1}).exec(function(err, docs){
    if (err) {
    console.log("could not find a country with area");
  } else {
      console.log("\n\nG countries with population between 1-10 Million:")
    for (let d of docs) {
      console.log(`Name ${d.country}, Population: ${d.population}`);
    }
  }
})





