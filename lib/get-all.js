const fs = require('fs');

var justRead = function getAll(dir, cb) {
  // read files in requested directory
  fs.readdir(dir, (err, files) => {
    if (err) return cb(err);
  });
  console.log('mark end of function');
};
  
justRead('./', cb);
function cb(msg) {
  console.log('msg', msg);
}