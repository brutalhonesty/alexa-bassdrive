'use strict';

var express = require('express');
var alexa = require('alexa-nodekit');
var bassdrive = require('../components/bassdrive');
var router = express.Router();

router.post('/archive', function (req, res) {
  if(!(req.body.request && req.body.request.type)) {
    return res.jsonp({message: 'Not an echo request.'});
  }
  var sessionId;
  var userId;
  if(req.body.request.type === 'LaunchRequest') {
    alexa.launchRequest(req.body);
    sessionId = alexa.sessionId;
    userId = alexa.userId;
    alexa.response('Welcome to the bass drive app, you can say check for update to see if a new archive download is available.', {
      title: 'Bassdrive',
      subtitle: 'Welcome to the Bassdrive app.',
      content: 'Say "check for update" to find out if a new archive is available.'
    }, false, function (error, response) {
      if(error) {
        return res.status(500).jsonp({message: error});
      }
      return res.jsonp(response);
    });
  } else if (req.body.request.type === 'IntentRequest') {
    alexa.intentRequest(req.body);
    sessionId = alexa.sessionId;
    userId = alexa.userId;
    var intent = alexa.intentName;
    var slots = alexa.slots;
    if(intent === 'UpdateCheck') {
      bassdrive.getListings(6, bassdrive.OVERFIEND, function (error, listings) {
        if(error) {
          console.log(error);
          return res.status(500).jsonp({message: 'Could not process intention.'});
        }
        var latestListing = listings[0];
        var latestListingDate = latestListing.time_ago;
        alexa.response('The latest archive is dated as ' + latestListingDate, {
          title: 'Bassdrive',
          subtitle: 'Latest Archive',
          content: latestListingDate
        }, true, function (error, response) {
          if(error) {
            return res.status(500).jsonp(error);
          }
          return res.jsonp(response);
        });
      });
    } else {
      alexa.response('Unknown intention, please try a different command.', {
        title: 'Bassdrive',
        subtitle: 'Unknown intention.',
        content: 'Unknown intention, please try a different command.'
      }, true, function (error, response) {
        if(error) {
          return res.status(500).jsonp(error);
        }
        return res.jsonp(response);
      });
    }
  } else {
    alexa.sessionEndedRequest(req.body);
    sessionId = alexa.sessionId;
    userId = alexa.userId;
    var sessionEndReason = alexa.reason;
    alexa.response(function (error, response) {
      if(error) {
        return res.status(500).jsonp(error);
      }
      return res.jsonp(response);
    });
  }
});

module.exports = router;