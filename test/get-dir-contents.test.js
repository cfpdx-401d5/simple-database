// file suggest dir contents but right now just list of directories
const getDirContents = require('../lib/get-dir-contents.js');
const assert = require('assert');
const fs = require('fs');

it('get all the directories', done => {
    getDirContents('./test', (err, contents) => {
        if (err) return done(err);
        assert.deepEqual(
            contents, ['foo', 'bar', 'bee']
        );

        done();
    });
});