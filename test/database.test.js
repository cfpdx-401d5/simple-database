const database = require('../lib/database.js');
const assert = require('assert');
const fs = require('fs');
const dbCreate = database.create('./test-dir');
const rimraf = require('rimraf');

//var shortid = require('shortid');

//console.log(shortid.generate());

describe('delete and create directory', () => {
    before(function() {
        rimraf('./test/test-dir-create', function() {
            console.log('deleted dir');
        })
    });
    it('checks that the directory does not exist', function(done) {
        fs.readdir('./test/test-dir-create', (err, files) => {
            assert.deepEqual(err.code, 'ENOENT');

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

// describe('save file to simple database', () => {
//     it('creates new directory')
// });

describe('simple directory app', function() {
    it('gets all file contents', done => {
        dbCreate.getAll('./test/test-dir', (err, contents) => {
            if (err) return done(err);
            assert.deepEqual( contents, ['BAR', 'FOO', 'QUX']);

            done();
        });
    });

})

