var express = require('express');
var khoHangController = require('../controller/khoHangController_nhan');
var donHangXuatController = require('../controller/donHangXuatController_nhan');
var nguoiDungController = require('../controller/nguoiDungController_nhan');
var xacThucController = require('../controller/xacThucController');

var router = express.Router();

//ĐĂNG NHẬP
router.get('/dang-nhap', function (req, res, next) {
  if (req.isAuthenticated()) res.redirect('/');
  else next();
}, function (req, res, next) {
  res.render('dangnhap', {
    title: 'Đăng nhập',
    layout: 'layoutDangNhap'
  });
})
router.post('/dang-nhap', nguoiDungController.dangNhap);

//ĐĂNG XUẤT
router.post('/dang-xuat', xacThucController.daDangNhap, nguoiDungController.dangXuat);

//TRANG CHỦ
router.get('/', function (req, res, next) {
  res.render('dashboard', {
    title: 'Dashboard',
    dashboard: true
  });
});

//KHO HÀNG
router.get('/kho-hang', khoHangController.xem);

router.get('/kho-hang/them', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/kho-hang/xoa', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/kho-hang/sua', function (req, res, next) {
  res.send('respond with a resource');
});

//ĐƠN HÀNG XUẤT
router.get('/don-hang-xuat', donHangXuatController.xem)

//BÁO CÁO
router.get('/bao-cao', (req, res, next) => {
  res.render('baocao', {
    baoCao: true
  });
})

module.exports = router;