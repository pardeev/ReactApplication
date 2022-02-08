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
  fetch(site1.url, site1.options)
    .then(res => {
      let time = (new Date() - start) / 1000;
      console.log(`Paytm status: ${res.statusText}, time: ${time}`);
      return fetch(site2.url, site2.options);
    })
    .then(res => {
      let time = (new Date() - start) / 1000;
      console.log(`Linkedin status: ${res.statusText}, time: ${time}`);
      return fetch(site3.url, site3.options);
    })
    .then(res => {
      let time = (new Date() - start) / 1000;
      console.log(`WeChat status: ${res.statusText}, time: ${time}`);
    });
  console.log("Starting my web requests:");