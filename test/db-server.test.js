const assert = require('assert');
const net = require('net');
const rimraf = require('rimraf');
const path = require('path');

const server = require('../lib/db-server');

const PORT = 65000;
const DATA = './test/data';

describe('database TCP server', () => {

    before(done => {
        rimraf(DATA, () => done());
    });

    before(done => {
        server.start({
            baseDir: DATA,
            port: PORT },
            () => {done();}
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

    it('lets user save an object', done => {
        const message = {
            method: 'save',
            table: 'schnoodles',
            data: {
                name: 'breezy',
                type: 'schnoodle'
            }
        };

        client.once('data', data => {
            const response = JSON.parse(data);
            saved = response.data;
            assert.ok(saved._id);
            done();
        });

        client.write(JSON.stringify(message));
    });

    it('user can get specific data', done => {
            const message = {
            method: 'get',
            table: 'schnoodles',
            data: saved._id
        };

        client.once('data', data => {
            const response = JSON.parse(data);
            const got = response.data;

            assert.deepEqual(got._id, saved._id);

            done();
        });

        client.write(JSON.stringify(message));
    });

    it('lets the client getAll the saved objects', done => {
        const message = {
            method: 'getAll',
            table: 'schnoodles'
        };

        client.once('data', data => {
            const response = JSON.parse(data);
            assert.deepEqual(response.data, [saved]);
            done()
        });

        client.write(JSON.stringify(message));
    });

    it('lets the client update a saved object', done => {
        const message = {
            method: 'update',
            table: 'schnoodles',
            data: {
                name: 'breezy',
                type: 'schnoodle',
                _id: saved._id,
                color: 'brown',
                age: 5
            }
        };

        client.once('data', data => {
            const response = JSON.parse(data);
            assert.equal(response.data.color, 'brown');
            done();
        });

        client.write(JSON.stringify(message));
    });
});