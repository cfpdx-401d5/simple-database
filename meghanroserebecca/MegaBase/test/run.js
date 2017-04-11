var child_process = require('child_process');

module.exports = function run(args) {
    return child_process.execFileSync(
        'node',
        args,
        { encoding: 'utf8' }
    );
};