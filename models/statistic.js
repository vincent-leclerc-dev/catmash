var { filter, map, head } = require('lodash');
var { getEntities, updateEntity } = require('../common/firebase');

const TYPE_STATISTIC = 'statistic';

exports.readVote = function(id) {
  return getEntities('statistics').then(function(data){
    var coll = map(data, function(value) {
      return value;
    });
    var filtered = filter(coll, { 'id' : id });
    return head(filtered);
  });
}

exports.updateVote = function(id, input) {
  return updateEntity('statistics/'+id, input).then(function(data){
    return data;
  });
}
