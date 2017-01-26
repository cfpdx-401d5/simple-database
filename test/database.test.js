const database = require('../lib/database.js');
const assert = require('assert');
const fs = require('fs');
const dbCreate = database.create('./test-dir');

describe('directory exists', done => {
    it('checks that the directory does not exist', function(done) {
        fs.readdir('./test/test-dir-create', (err, files) => {
            if(err) return done(err);
            assert.ifError(null);//passes when exists

            done(); 
        });
    });
    it('creates directory', function() {
        database.create('./test/test-dir-create');
        fs.readdir('./test/test-dir-create', (err,files) => {
            if(err) return done(err);
            assert.equal(files, []);

            done();
        });
    })
});

describe('simple directory app', function() {
    it('gets all file contents', done => {
        dbCreate.getAll('./test/test-dir', (err, contents) => {
            if (err) return done(err);
            assert.deepEqual( contents, ['BAR', 'FOO', 'QUX']);

            done();
        });
    });

})

