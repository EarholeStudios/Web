/**
 * Dependencies
 */
var fs      = require('fs')
,   path    = require('path')
,   unique  = require('lodash.uniq')
,   Promise = require('bluebird');

/**
 * Helpers
 */
var getDirectory = function (subdir) {
  subdir = subdir || 'samples';
  var root = path.resolve(__dirname, '../assets/sounds');
  return path.join(root, subdir);
};

var load = function (dir) {
  dir = getDirectory(dir);
  return new Promise(function (resolve, reject) {
    fs.readdir(dir, function (err, results) {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

var filter = function (sounds) {
  return new Promise(function (resolve, reject) {
    // Filter out dotfiles
    sounds = sounds.filter(function (sound) {
      if ('.' === sound.charAt(0)) return false;
      return true;
    });

    // Only return the basenames.
    sounds = sounds.map(function (sound) {
      return path.basename(sound, path.extname(sound));
    });

    // Clean up duplicates.
    sounds = unique(sounds);

    resolve(sounds);
  });
};

/**
 * Expose
 */
module.exports = function (done) {
  return Promise.props({
    soundtrack: load('soundtrack').then(filter),
    samples: load('samples').then(filter)
  }).nodeify(done);
};
