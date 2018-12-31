var prompt = require('prompt');


prompt.start();


prompt.get(['number'], function (err, result) {
  
if (err) { return onErr(err); }
  
console.log('Command-line input received:');
  
console.log('  Number: ' + result.number);
});


function onErr(err) {
  console.log(err);
  return 1;
}