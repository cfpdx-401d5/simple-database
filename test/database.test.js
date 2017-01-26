const database = require('../lib/database.js');
const assert = require('assert');
const fs = require('fs');
const dbCreate = database.create('./test-dir');

describe('simple directory app', function() {
    it('gets all file contents', done => {
        dbCreate.getAll('./test/test-dir', (err, contents) => {
            if (err) return done(err);
            assert.deepEqual( contents, ['BAR', 'FOO', 'QUX']);

            done();
        });
    });

})

