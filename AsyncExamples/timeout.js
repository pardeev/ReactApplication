console.log('this is the start');

setTimeout(function cb1() {
    console.log('this is a msg from call back 1');
});

console.log('this is just a message');

setTimeout(function cb2() {
    console.log('this is a msg from call back 2');
}, 0);

console.log('this is the end');