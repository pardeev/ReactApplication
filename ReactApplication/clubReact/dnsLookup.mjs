import dns from 'dns';
const { Resolver } = dns.promises;
const resolver = new Resolver();
resolver.resolve4('t20worldcup.com').then((addresses) => {
    console.log('Address for t20worldcup.com')
    console.log(addresses);
});