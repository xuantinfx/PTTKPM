var express = require('express');
var router = express.Router();

/****************************************************************/
/********** Phần này của Tin nhé ********************************/
/* GET home page. */

const controller_lichnhaphang_tin = require('../controller/controller_lichnhaphang_tin')
const controller_lichxuathang_tin = require('../controller/controller_lichxuathang_tin')
const controller_donhang_tin = require('../controller/controller_donhang_tin')

router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard', dashboard: true });
});

//Lich nhap hang
router.get('/lich-nhap-hang', controller_lichnhaphang_tin.getLichNhapHang);
//Lich xuat hang
router.get('/lich-xuat-hang', controller_lichxuathang_tin.getLichXuatHang);
//Don hang nhap xuat
router.get('/don-hang-nhap',controller_donhang_tin.getDonHangNhap)

/****************************************************************/

module.exports = router;
