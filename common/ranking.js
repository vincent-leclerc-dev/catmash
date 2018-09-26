
function getEstimations(rankingA,rankingB) {
    var estA = 1 / ( 1 + (Math.pow(10,(rankingB - rankingA)/400)));
    var estB = 1 / ( 1 + (Math.pow(10,(rankingA - rankingB)/400)));
    return {"a" : estA, "b" : estB};
}

function getConstant(ranking) {
  if (ranking < 2000){
    return 32;
  }
  else if (ranking < 2401){
    return 24;
  }
  else {
    return 16;
  }
}

exports.getNewRankings = function(rankingA,rankingB,victoryA) {
    var ests = getEstimations(rankingA,rankingB);
    var newRankA = Math.round(rankingA + (getConstant(rankingA)*((victoryA ? 1 : 0) - ests.a)));
    var newRankB = Math.round(rankingB + (getConstant(rankingB)*((victoryA ? 0 : 1) - ests.a)));
    return {"a" : newRankA, "b" : newRankB};
}
