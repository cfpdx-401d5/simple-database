var assert = require('assert');
var run = require('./run.js');
var DB = require('../lib/index-dir.js');

describe('get directory contents', function() {
  it('gets file contents by id', function(done) {
    var cuteAnimals = DB.create('data'); 
    cuteAnimals.getDirContentsById('sloths.txt', "KJEA79B939D", (err, obj) => {
      if(err) return done(err);
      assert.equal(obj._id, "KJEA79B939D");
      done();
    });
  });
});

describe('get directory contents', function() {
  it('gets all file contents', function(don) {
    var cuteAnimals = DB.create('data');
    cuteAnimals.getAll('data', (err, results) => {
      if(err) return done(err);
      assert.deepEqual(results, {"name":"armadillos","cuteness":"x100","_id":"DXA479BWD8W"},{"name":"lolCat","hasCheeseBurger?":"true","isCute?":"yes","_id":"JKDJ79BW82K"},
      {"name":"pygmy marmosets","cuteness":"infinite","_id":"3BM579B939D"},{"name":"sloth","cuteness":"x1000000","_id":"KJEA79B939D","doesAaronLIke":"yes, definitely, absolutely"}); 
    });
  });
});

//the above test is not working