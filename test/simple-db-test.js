const assert = require('assert');
const fs = require('fs');
const rimraf = require('rimraf');
const simpleid = require('simpleid');

const simpleDb = require('../lib/simple-db');

const test = './test/db-test-dir';

var db;

var testOne = {
    message: 'testing'
}
var testTwo = {
    message: 'hello'
}
var testThree = {
    message: 'yo'
}
var testFour = {
    message: 'testing 123'
}
var testFive = {
    message: 'testing'
}


before(done => {
    db = simpleDb.create(test);
    fs.stat(test, (err, stats) => {
        assert.equal(null, err);
        done();
    });
});

after(done => {
    rimraf(test, [], (err) => {
        done();
    });
});

describe('creates and deletes directory', () => {
    it('saves an object and assigns id', (done) => {
        db.save('hello', testOne, (err, result) => {
            assert.equal(testOne.message, 'testing');
            done();
        })
    });
});

describe('updates database', () => {
    it('starts with the object we saved and updates', (done) => {
        db.save('update', testTwo, (err, results) => {
            assert.equal(testTwo.message, 'hello');
            done();
        })
    })
    it('updates object', (done) => {
        process.stdout.write('changes messaged of testTwo object');
        testTwo.addProperty = 'updating';
        db.update('update', testTwo, (err, reslut) => {
            assert.equal(testTwo.addProperty, 'updating');
            done();
        })
    });
});

describe('gets database', () => {
    it('saving object first', (done) => {
         db.save('getting', testThree, (err, result) => {
            assert.equal(testThree.message, 'yo')
            done();
        })
    });

    it('returns the saved object with that id', (done) => {
            db.get('getting', testThree._id, (err, result) => {
            assert.equal(result._id, testThree._id);
            done();
        });
    });
});

describe('gets all', function(){
    it('returns an array of all objects from findMe', done => {
        db.getAll('hello', (err, contents) => {
            assert.deepEqual(['testing', 'testing'], [testOne.message, testFive.message]);
            done();
        });
    });
});

describe('database.remove', () => {
    it('saves an object and assigns id', (done) => {
        db.save('removing', testFour, (err, result) => {
            assert.equal(testFour.message, 'testing 123');
            done();
        })
    });

    it('removes test', (done) => {
        db.remove('removing', testFour._id, (err, result) => {
            assert.equal(1, result);
            done();
        })
    });
});