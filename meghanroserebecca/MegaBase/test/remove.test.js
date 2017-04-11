var assert = require('assert');
var run = require('./run.js');
var DB = require('../lib/index-dir.js');
var path = require('path');

describe('removes a file from the directory', function() {
  it('removes a file from the directory based on id', function(done) {
    var cuteAnimals = DB.create('data');
    cuteAnimals.remove('data', 'armadillos.txt', "DXA479BWD8W", (err, obj) => {
      if(err) return done(err);
      else {
        // const filePath = path.join('data', 'armadillos.txt');
        // fs.readFile(filePath, (err, data) => {
        //   if(err) return done(err);
        //   var obj = JSON.parse(data);
        //   process.stdout.write(obj);
          assert.equal(!obj, 'armadillos.txt');
        // });
        done();
      };
    });
  });
});

//This test is not working