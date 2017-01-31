const assert = require('assert');
const net = require('net');
const server = require('../lib/db-server');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const PORT = 65000;
const TEST_DIR = './test/test-dir-create';

