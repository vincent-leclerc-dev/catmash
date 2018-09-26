var { listCats } = require('../models/cat');
var { each, orderBy } = require('lodash');

exports.ranking = function(req, res) {
  let cats = listCats();
  cats.then(function(data){
    let i = 1;
    let dataOrdered = orderBy(data, ['score'], ['desc']);
    each(dataOrdered, function(cat) {
      cat.rang = i++;
    });
    res.render('ranking', {
      cats: dataOrdered,
      static_path: 'static',
      theme: process.env.THEME || 'flatly',
      flask_debug: process.env.FLASK_DEBUG || 'false'
    });
  });
}
