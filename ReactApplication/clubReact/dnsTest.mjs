import dns from 'dns';
const { Resolver } = dns.promises;
const resolver = new Resolver();
let servers = resolver.getServers();
console.log("DNS Servers:");
console.log(servers);