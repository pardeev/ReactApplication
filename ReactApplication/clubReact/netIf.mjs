import os from 'os';
let networkInterfaces = os.networkInterfaces();
for (let intf in networkInterfaces) {
    console.log(intf);
    let addresses = networkInterfaces[intf]
        .filter(a => a.family === 'IPv4');
    console.log(addresses);
}