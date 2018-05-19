var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
  res.render(req.params.id, { title: 'Express' });
});

module.exports = router;
