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

describe('simple db', function() {
    var testObj = {
        name: 'testName'
    };
    it('saves file in database', done => {
        db.save('./test/test-dir-create/file.txt', testObj, (err, obj) => {
            if(err) return done(err);
            assert.equal(obj.name, testObj.name);
            assert.ok(obj._id);
            done();
        });
    });

    it('updates file in database', done => {
        testObj.name = 'newTestName';
        db.update('./test/test-dir-create', testObj, (err, obj) => {
            if(err) return done(err);
            assert.deepEqual(obj.name, testObj.name);
            
            done();
        });

        testObj.name ='testName';
    });

    it('removes file in database', done => {
        var testRemoveObj = {
            name: 'testRemoveName'
        };
        db.save('./test/test-dir-create/removefile.txt', testRemoveObj, (err, obj) => {});
        db.remove('./test/test-dir-create', testRemoveObj._id, (err, obj) => {
            if(err) return done(err);

            assert.deepEqual(obj.name, undefined);
            done();
        });
    });

    it('get file based on id', done => {

        db.get('./test/test-dir-create/', testObj._id, (err, obj) => {
            if(err) return done(err);
            assert.deepEqual(obj.name, testObj.name);

            done();
        });
    });

    it('gets all file contents', done => {
        db.getAll('./test/test-dir-create/', (err, contents) => {
            if (err) return done(err);
            assert.deepEqual( contents, [JSON.stringify(testObj)]);

            done();
        });
    });
});




