var express = require('express');
var router = express.Router();

/****************************************************************/
/********** Phần này của Tin nhé ********************************/
/* GET home page. */

const controller_tin = require('../controller/controller_tin')

router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard', dashboard: true });
});

//Lich nhap hang
router.get('/lich-nhap-hang', controller_tin.getLichNhapHang);

/****************************************************************/

module.exports = router;
