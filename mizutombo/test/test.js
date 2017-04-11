const fs = require('fs'); // eslint-disable-line
const assert = require('assert');
const dbase = require('../lib/dbase');

var dbFetch = dbase.create('./test-db-files');

describe('test dbase.getAll interface', function() {

	it('returns array of all objects in database', done => {
	  dbFetch.getAll('./test/test-db-files', (err, results) => {
		  if (err) {
			  return done (err);
		  }
		assert.deepEqual(results, [ 'bar\n', 'foo\n', 'qux\n' ]);
		done();
	  });
	});
});

describe('test dbase.save interface', function() {

  it('adds a new file and id to the database', done => {
    dbAdd.save('uff.txt', 'uff', (err, results) => {
      
    })
  })
})