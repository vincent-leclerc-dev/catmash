var axios = require('axios');
var { each } = require('lodash');

var config = require('../config/app');
var { createCat } = require('../models/cat');
var { readVote, updateVote } = require('../models/statistic');


exports.admin = function(req, res) {
    res.render('admin', {
      message: '',
      static_path: 'static',
      theme: process.env.THEME || 'flatly',
      flask_debug: process.env.FLASK_DEBUG || 'false'
    });
}

exports.rankingReset = function(req, res) {

  let vote = readVote('votes');
  vote.then(function(voteData){
    voteData.counter = 0;
    updateVote('votes',voteData);
  });

  axios.get('https://latelier.co/data/cats.json').then(response => {
    each(response.data.images, function(cat) {
      createCat({
        id: cat.id,
        url: cat.url,
        score: config.app.DEFAULT_SCORE
      });
    });

    res.render('admin', {
      message: 'Le classement à bien été réinitialisé.',
      static_path: 'static',
      theme: process.env.THEME || 'flatly',
      flask_debug: process.env.FLASK_DEBUG || 'false'
    });

  });
}
