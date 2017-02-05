const assert = require('assert');
const fs = require('fs');
const rimraf = require('rimraf');
const simpleid = require('simpleid');

const simpleDb = require('../lib/simple-db');

const db = simpleDb.create('./test-dir');

// before(done => {
//     fs.stat(testDir, (err, stats) => {
//         assert.equal(null, err);
//         done();
//     });
// });

// after(done => {
//     fs.stat(testDir, (err, stats) => {
//         assert.equal(null, err);
//         done();
//     });
// });
before(done => {
    rimraf('./test/created-dir', () => done());
});

describe('creates and deletes directory', () => {
    it('checks if directory is created', function() {
        simpleDb.create('./test/created-dir');
        fs.readdir('./test/created-dir', (err, files) => {
            if(err) return done(err);
            assert.equal(files, []);

            done();
        });
    });
    it('deletes the directory or actually checks to see if it exists', () => {
        fs.readdir('./test/created-dir', (err, files) => {
            assert.deepEqual(err.code, 'ENOENT');

            done();
        });
    });
});
