var express = require('express');
var khoHangController = require('../controller/khoHangController_nhan');
var donHangXuatController = require('../controller/donHangXuatController_nhan');

var router = express.Router();

//TRANG CHỦ
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard', dashboard: true });
});


//KHO HÀNG
router.get('/kho-hang', khoHangController.xem);

router.get('/kho-hang/them', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/kho-hang/xoa', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/kho-hang/sua', function(req, res, next) {
  res.send('respond with a resource');
});

//ĐƠN HÀNG XUẤT
router.get('/don-hang-xuat', donHangXuatController.xem)

//BÁO CÁO
router.get('/bao-cao', (req, res, next) => {
  res.render('baocao');
})

module.exports = router;
