const database = require('../lib/database.js');
const assert = require('assert');
const fs = require('fs');
const rimraf = require('rimraf');

const directory = './test/test-database';
let db = null;

before(done => {
    rimraf(directory, () => done());
});

before(() => {
    db = database.create(directory);
});

describe('delete and create directory', () => {

    it('creates directory', function(done) {
        fs.readdir(directory, (err,files) => {
            if(err) return done(err);
            assert.deepEqual(files, []);

            done();
        });
    });

});

describe('simple db', function() {
    var testObj = {
        name: 'testName'
    };

    it('saves file in database', done => {
        db.save('file', testObj, (err, obj) => {
            if(err) return done(err);
            assert.equal(obj.name, testObj.name);
            assert.ok(obj._id);
            done();
        });
    });

    it('updates file in database', done => {
        testObj.name = 'newTestName';
        db.update('file', testObj, (err, obj) => {
            if(err) return done(err);
            assert.deepEqual(obj.name, 'newTestName');
            done();
        }); 
    });

    it('removes file in database', done => {
        var testRemoveObj = {
            name: 'testRemoveName'
        };
        db.save('removefile', testRemoveObj, (err, obj) => {
            if(err) return done(err);
            db.remove('removefile', obj._id, (err, isRemoved) => {
                if(err) return done(err);

                assert.equal(isRemoved, 1);
                done();
            });
        });

    });

    it('get file based on id', done => {
        db.get('file', testObj._id, (err, obj) => {
            if(err) return done(err);
            assert.deepEqual(obj.name, testObj.name);

            done();
        });
    });

    it('gets all file contents', done => {
        db.getAll(directory, (err, contents) => {
            if (err) return done(err);
            assert.deepEqual( contents, [testObj]);

            done();
        });
    });
});




