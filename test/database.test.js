const database = require('../lib/database.js');
const assert = require('assert');
const fs = require('fs');
const db = database.create('./test-dir');
const rimraf = require('rimraf');

before(done => {
    rimraf('./test/test-dir-create', () => done());
});

describe('delete and create directory', () => {
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
    });
});

describe('save file to database', function() {
    it('saves file in database', done => {
        var testObj = {
            name: 'testName'
        };
        db.save('./test/test-dir-create/file.txt', testObj, (err, obj) => {
            if(err) return done(err);
            assert.equal(obj.name, testObj.name);
            assert.ok(obj._id);
            done();
        });
    });
});

// describe('update file in database', function() {
//     it('updates file based on id', done => {
//         db.update('./test/test-dir-create/file.txt')
//     });
// });

describe('get all file contents', function() {
    it('gets all file contents', done => {
        db.getAll('./test/test-dir', (err, contents) => {
            if (err) return done(err);
            assert.deepEqual( contents, ['BAR', 'FOO', 'QUX']);

            done();
        });
    });
});
