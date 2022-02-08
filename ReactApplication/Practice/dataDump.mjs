// JSON reading and parsing with Node.js ES6 modules
import { readFile } from 'fs/promises'; // promise based file reading 
const clubEvents = JSON.parse(await readFile(new URL('./events.json',
    import.meta.url))); // URL for relative file location, regular JSON parsing
clubEvents.forEach(function (event, index) { //Look at data
    console.log("Event " + (index+1) + " - " + event.name + ".\n" + "description: " + event.description + "\n" +"dates: " + event.dates + "\n");
});