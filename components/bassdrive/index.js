'use strict';

var parser = require('rssparser');

exports.OVERFIEND = 'The Overfiend';

exports.getListings = function (dayOfWeek, artist, callback) {
  if(typeof(dayOfWeek) !== 'number' || isNaN(dayOfWeek)) {
    return callback('Invalid day of the week.');
  }
  if(typeof(artist) !== 'string') {
    return callback('Invalid artist.');
  }
  // Hard coding Overfiend in for now till we can make sure it works.
  parser.parseURL('http://www.codehulk.net/bassdrive/feed/52', {}, function (error, results) {
    if(error) {
      return callback(error);
    }
    return callback(null, results.items);
  });
};