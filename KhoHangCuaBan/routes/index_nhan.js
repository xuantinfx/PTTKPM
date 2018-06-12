var express = require('express');
var khoHangController = require('../controller/khoHangController_nhan');
var donHangXuatController = require('../controller/donHangXuatController_nhan');
var nguoiDungController = require('../controller/nguoiDungController_nhan');
var xacThucController = require('../controller/xacThucController');


var router = express.Router();

//ĐĂNG NHẬP
router.get('/dang-nhap', xacThucController.chuaDangNhap, function (req, res, next) {
  if (req.isAuthenticated()) res.redirect('/dashboard');
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

//NGƯỜI DÙNG
router.get('/nguoi-dung/lay-thong-tin-trong-session', nguoiDungController.layThongTinNguoiDungTrongSession);

//KHO HÀNG
router.get('/kho-hang', xacThucController.daDangNhap, xacThucController.laChuKho, khoHangController.xem);

router.post('/kho-hang/tao-kho-hang', khoHangController.postThemKhoHang)

router.get('/kho-hang/xoa', function (req, res, next) {
  res.redirect("/kho-hang")
});

router.get('/kho-hang/sua', function (req, res, next) {
  res.redirect("/kho-hang")
});

//ĐƠN HÀNG XUẤT
router.get('/don-hang-xuat', xacThucController.daDangNhap, xacThucController.laQuanLy, donHangXuatController.xem);

router.get('/don-hang-xuat/lay-option-ds-mat-hang-da-nhap', donHangXuatController.layDsMatHangDaNhap);

router.post('/don-hang-xuat/them', donHangXuatController.themDonHangXuat);



//BÁO CÁO
router.get('/bao-cao', xacThucController.daDangNhap, xacThucController.laQuanLy, (req, res, next) => {
  let tuCach = ""
  if (req.user.loaiNguoiDung == 'CK') {
    tuCach = 'Chủ kho'
  } else {
    tuCach = 'Quản lý'
  }
  res.render('baocao', {
    baoCao: true,
    tuCach,
    user: req.user
  });
})

module.exports = router;