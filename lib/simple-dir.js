function Db(directory) {
  this.directory = directory;
}
Db.prototype.save = function() {};

module.exports = {
  create: function(directory) {
    return new Db(directory);
  }
};