var { listCats, readCat, updateCat } = require('../models/cat');
var { readVote, updateVote } = require('../models/statistic');
var { getNewRankings } = require('../common/ranking');

exports.vote = function(req, res) {
  let letCatId = req.params.leftcatid;
  let rightCatId = req.params.rightcatid
  let victoryA = (req.params.victory === "a");
  let rankingA = rankingB = 0;

  let leftCat = readCat(letCatId);
  leftCat.then(function(leftCatData){
    rankingA = leftCatData.score;

    let rightCat = readCat(rightCatId);
    rightCat.then(function(rightCatData){
      rankingB = rightCatData.score;

      let newRanking = getNewRankings(rankingA,rankingB,victoryA);
      leftCatData.score = newRanking.a;
      rightCatData.score = newRanking.b;

      updateCat(letCatId,leftCatData);
      updateCat(rightCatId,rightCatData);

      let vote = readVote('votes');
      vote.then(function(voteData){
        voteData.counter = voteData.counter+1;
        updateVote('votes',voteData);

        res.redirect('/');
      });

    });
  });

}
