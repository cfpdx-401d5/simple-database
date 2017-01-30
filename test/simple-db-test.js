const simpleDb = require('../lib/simple-db');
const assert = require('assert');
const path = require('path');
const rimraf = ('rimraf');
const mkdirp = require('mkdirp');
const fs = require('fs');
const simpleid = require('simpleid');

const objectToSave = {name: "claire", _id: simpleid()};

createDir.save('test-db', object, (err, result) => {
    if (err) return console.log(err);
    console.log(result);
})

//describe('writing a new file', () => {

    //it('make new file', done => {

        //simpleDb.create('../index', (err, result) => {
            //if(err) done(err);

            //assert.deepEqual(result, [
                //'{"name":"claire","_id":"G6F779BKKRA"}'
           // ]);
            //done();
        //});
    //});

    //it('err on un-made file', done => {
        //simpleDb.create('../index', (err, result) => {
            //if(err) done();
           // else done('expected a return error');
       // })
    //})
//})

