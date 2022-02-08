function cs351() {
    console.log('This is a msg from CS351');
  }
  function cs651() {
    console.log('this is a msg from CS651');
  }
  
  console.log('Is this the start?');
  setTimeout(cs651); // What does this do
  console.log('When does this print?');
  setTimeout(cs351, 0); // Is this different
  console.log('Is this the end?');