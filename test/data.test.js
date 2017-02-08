const assert = require('assert');
const fs = require('fs');
const findRemove = require('find-remove');
const dataObj = require('../lib/data.js');
const create = require('../lib/create.js');
const testData = require('./test-data');
const simpleDB = require('../lib/simple-db');

describe('testing for data manipulation and configuration', () => {
    const testDir = './db-program';

    before(done => {
        fs.readdir(testDir, () => {
            findRemove(testDir, { dir: '*', files: '*.*' });
            fs.rmdir(testDir, () => {
                done();
            });
        });
    });

    before(done => {

        function testSave(data) {
            data.forEach((item) => {
                if (item._id) {
                    create.createDBDir(item, (err, succ) => {
                        console.log('testSave err: ', err);
                        console.log('testSave succ: ', succ);
                    });
                }
                create.createDBDir(dataObj.createDataObj(item), (err, succ) => {
                    console.log('testSave err: ', err);
                    console.log('testSave succ: ', succ);
                });
            });
        }

        create.createProgramDir((err, files) => {
            console.log('err: ', err);
            console.log('files: ', files);
            testSave(testData);
            done();
        });
    });


    it('create data object for storing in database', () => {
        const output = dataObj.createDataObj({ name: 'steve', grade: 'B' });
        assert.equal(output.name, 'steve');
        assert.equal(output.grade, 'B');
    });

});

describe('get-all lists all records in a collection', () => {
    it('get-all list all records in a collection', done => {
        simpleDB.getAll('pets/dogs', (err, results) => {
            assert.equal(results.length, 3);
            done();
        });
    });
});

describe('get reads the contents of a record', () => {
    it('read contents of record', done => {
        simpleDB.get('pets/dogs', 'ABC123', (err, data) => {
            assert.deepEqual(data, { database: 'pets', collection: 'dogs', owner: 'Mike', petName: 'Tux', _id: 'ABC123' });
            done();
        });

    });
});

describe('remove deletes the record associated with and id', () => {
    it('checks to see if record is removed', done => {
        simpleDB.remove('students/spanish', 'XYZ789', (err, output) => {
            assert.equal(output, 1);
            done();
        });

    });
});

describe('save adds a new record to the database', () => {
    it('save checks for _id and throws and error', done => {
        simpleDB.save('students/english', { name: 'steve', grade: 'B', _id: 'JKL456' }, (err) => {
            assert.equal(err, 'This record has an id.');
            done();
        });
    });

    it('save creates new document when there is no _id', done => {
        simpleDB.save('students/english', { name: 'steve', grade: 'B' }, (err, output) => {
            assert.ok(output._id);
            done();
        });

    });
});

describe('update a record', () => {
    it('update a record', done => {
        //grade originally said 'A'
        simpleDB.update('students/spanish', { database: 'students', collection: 'spanish', name: 'Suzie', grade: 'C', _id: 'XYZ789' }, (err, data) => {
            assert.deepEqual(data, { database: 'students', collection: 'spanish', name: 'Suzie', grade: 'C', _id: 'XYZ789' });
            done();
        });

    });

    it('update creates error if no id on object', () => {
        const output = simpleDB.update('students/spanish', { database: 'students', collection: 'spanish', name: 'Suzie', grade: 'A' });
        assert.equal(output, 'Record has no unique identifier.');
    });
});