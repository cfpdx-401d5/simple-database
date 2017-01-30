// get tools
const assert = require('assert');
const createDb = require('../lib/create-db');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
var obj = { "cat": "kitty" };

describe('create a directory for database', function() {
    it('create new db and first object', done => {
        createDb('pickle', obj, (err, newDir) => {
            if (err) return done(err);
            assert.deepEqual(newDir, 'pickle');
        });
        done();
    });
});