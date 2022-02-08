import fetch from 'node-fetch';

let site1 = {
  url: "https://paytm.com",
  options: {method: "HEAD"}
};

let site2 = {
  url: "https://www.linkedin.com",
  options: {method: "HEAD"}
};

let site3 = {
  url: "https://www.wechat.com",
  options: {method: "HEAD"}
};

let start = new Date();
let p1 = fetch(site1.url, site1.options).then(res => {
  let time = (new Date() - start) / 1000;
  return console.log(`Paytm status: ${res.statusText}, time: ${time}`);
});

let p2 = fetch(site2.url, site2.options).then(res => {
  let time = (new Date() - start) / 1000;
  return console.log(`Linkedin status: ${res.statusText}, time: ${time}`);
});

let p3 = fetch(site3.url, site3.options).then(res => {
  let time = (new Date() - start) / 1000;
  return console.log(
    `WeChat status: ${res.statusText}, time: ${time}`
  );
});

console.log("Starting my web requests:");
Promise.race([p1, p2, p3]).then(x => {
  let time = (new Date() - start) / 1000;
  console.log(`All Finished, total time: ${time}`);
});