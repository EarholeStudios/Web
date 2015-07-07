/**
 * Dependencies
 */
var Promise = require('bluebird')
,   config  = require('config')
,   youtube = require('youtube-api')
,   get     = require('lodash.get');

/**
 * Setup
 */
youtube.authenticate({
  type: 'key',
  key: config.get('youtube.api_key')
});

/**
 * Helpers
 */
var getPlaylist = function () {
  return new Promise(function (resolve, reject) {
    youtube.playlistItems.list({
      part: 'snippet',
      maxResults: 20,
      playlistId: config.get('reel.playlist_id')
    }, function (err, res) {
      if (err) return reject(err);

      var ret = res.items.map(function (item) {
        return get(item, 'snippet.resourceId.videoId');
      });

      resolve(ret);
    });
  });
};

var getVideos = function (playlist) {
  return new Promise(function (resolve, reject) {
    youtube.videos.list({
      part: 'snippet,player',
      maxResults: 20,
      id: playlist.join(',')
    }, function (err, res) {
      if (err) return reject(err);

      var ret = res.items.map(function (item) {
        return {
          id: item.id,
          title: item.snippet.title,
          description: item.snippet.description,
          images: item.snippet.thumbnails,
          embed: item.player.embedHtml
        }
      });

      resolve(ret);
    });
  });
};

/**
 * Expose
 */
module.exports = function (done) {
  return getPlaylist().then(getVideos).nodeify(done);
};
