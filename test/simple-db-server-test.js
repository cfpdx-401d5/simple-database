const assert = require('assert');
const net = require('net');
const server = require('../lib/db-server');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const PORT = 65000;
const TEST_DIR = './test';

describe.only('db server', () => {

    // start with a clean directory
    before(done => {
        rimraf(TEST_DIR, () => done());
    });

    before(done => {
        // use our method to "start" the server
        server.start({ 
            baseDir: TEST_DIR, 
            port: PORT }, 
            () => { done(); }
        );
    });

    // destroy client, stop server (so other test doesn't fail on reusing port)
    after(done => {
        client.end(done);
        server.stop();
    });

    // create the tcp client and store in variable
    // for use in the tests 
    let client;
    before(done => {
        client = net.connect({ port: PORT }, () => {
            // let's just deal with strings (not Buffers)
            client.setEncoding('utf8');
            done();
        })
    });

    it('client getsAll "pets"', done => {
        // construct our message
        const message = {
            method: 'getAll',
            table: 'pets'
        };

        // this is setting up the test, to listen 
        // to the response that should come back from 
        // write() call below
        client.once('data', data => {
            // convert string => object (deserialization)
            const response = JSON.parse(data);
            // should have no pets initially 
            assert.deepEqual(response.data, []);
            done();
        });

        // send our serialized (object to string) message 
        // using clients write method
        client.write(JSON.stringify(message));
    });

    // let's store the saved object so we can use it:
    // 1) to know what id to ask for
    // 2) have an object to deepEqual compare to
    let saved;

    it('client saves a "pet"', done => {
        // simulate a save
        const message = {
            method: 'save',
            table: 'pets',
            data: {
                name: 'tweety',
                type: 'bird'
            }
        };

        client.once('data', data => {
            const response = JSON.parse(data);
            saved = response.data;
            // make sure we got an id assigned
            assert.ok(saved._id);
            done();
        });

        client.write(JSON.stringify(message));
    });

    it('client gets the saved "pet"', done => {
        const message = {
            method: 'get',
            table: 'pets',
            data: saved._id
        };

        client.once('data', data => {
            const response = JSON.parse(data);
            const got = response.data;
            // is this same thing that we got back from save?
            assert.deepEqual(got, saved);
            done();
        });

        client.write(JSON.stringify(message));
    });


    it('getAll includes the saved "pet"', done => {
        const message = {
            method: 'getAll',
            table: 'pets'
        };

        client.once('data', data => {
            const response = JSON.parse(data);
            const pets = response.data;
            // response should be array with the one saved pet
            assert.deepEqual(pets, [saved]);
            done();
        });

        client.write(JSON.stringify(message));
    });

});