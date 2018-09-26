var { readVote } = require('../models/statistic');
var { listCats } = require('../models/cat');
var { shuffle } = require('lodash');
exports.home = function(req, res) {
   let cats = listCats();
   cats.then(function(data){
     var shuffleCats = shuffle(data);
     let leftCat = shuffleCats[0];
     let rightCat = shuffleCats[1];

     let vote = readVote('votes');
     vote.then(function(voteData){
       res.render('index', {
         voteCounter: voteData.counter,
         leftCat: leftCat,
         rightCat: rightCat,
         static_path: 'static',
         theme: process.env.THEME || 'flatly',
         flask_debug: process.env.FLASK_DEBUG || 'false'
       });
     });


   });
 }
