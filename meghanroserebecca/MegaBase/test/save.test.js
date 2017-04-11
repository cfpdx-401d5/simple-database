var assert = require('assert');
var run = require('./run.js');
var DB = require('../lib/index-dir.js');

describe('database', function() {
  var db = DB.create('data');
  it('checks to see if files already exist by ID', function() {
    db.save('sloths.txt', {"name":"sloth","cuteness":"x1000000","_id":"KJEA79B939D"}, function(error) {
      assert.deepEqual(error, {"error": "this file already exists!"});
    });
  });
  it('checks to see if new files save to database', function() {
    var doesItSave = db.save('lolCat.txt', {"name":"lolCat", "hasCheeseBurger?":"true", "isCute?":"yes"});
    //readdir / readFile here to see if lolcat file has been made. This secondary test incomplete.
  });
});


