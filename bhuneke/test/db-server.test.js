const assert = require('assert');
const net = require('net');
const server = require('../lib/db-server');
const rimraf = require('rimraf');
const path = require('path');

const PORT = 65000;
const TEST_DIR = './test/test-db-server';

describe('db server', () => {

    before(done => {
        rimraf(TEST_DIR, () => done());
    });

    before(done => {
        server.start({
            baseDir: TEST_DIR,
            port: PORT },
        () => { done();}
        );
    });

    let client;

    before(done => {
        client = net.connect({ port: PORT }, () => {
            client.setEncoding('utf8');
            done();
        })
    });

    let saved;

    it('client saves a "file"', done => {
        const message = {
            method: 'save',
            table: 'names',
            data: {
                name: 'sam'
            }
        };
        
        client.once('data', function(data) {

            const response = JSON.parse(data);
            saved = response.data;

            assert.ok(saved._id);
            done();
        });

        client.write(JSON.stringify(message));
    });

    it('client gets data', done => {
        const message = {
            method: 'get',
            table: 'names',
            data: {
                _id: saved._id
            }
        };

        client.once('data', data => {
            const response = JSON.parse(data);
            const got = response.data;

            assert.deepEqual(got._id, saved._id);

            done();
        });

        client.write(JSON.stringify(message));

    });

    it('client gets all data', done => {
        const message = {
            method: 'getAll',
            directory: TEST_DIR
        };

        client.once('data', data => {
            const response = JSON.parse(data);
            const all = response.data;
            assert.deepEqual(all, [saved])

            done();
        });

        client.write(JSON.stringify(message));
    });

    it('client updates data', done => {
        const message = {
            method: 'update',
            table: 'names',
            data: {
                name: 'ben',
                _id: saved._id
            }
        };

        client.once('data', function(data) {
            const response = JSON.parse(data);
            const got = response.data;

            assert.deepEqual(got._id, saved._id);
            assert.notEqual(got.name, saved.name);

            done();
        });

        client.write(JSON.stringify(message));
    });

    it('client removes data', done => {
        const message = {
            method: 'remove',
            table: 'names',
            data: {
                _id: saved._id
            }
        };
        
        client.once('data', data => {
            const response = JSON.parse(data);
            const got = response.data;

            assert.deepEqual(got, 1);

            done();
        });

        client.write(JSON.stringify(message));
    });

    after( done => {
        client.end(done);
        server.stop();
    });

});