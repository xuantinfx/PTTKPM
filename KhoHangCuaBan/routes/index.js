var express = require('express');
var router = express.Router();

/****************************************************************/
/********** Phần này của Tin nhé ********************************/
/* GET home page. */

const controller_lichnhaphang_tin = require('../controller/controller_lichnhaphang_tin')
const controller_lichxuathang_tin = require('../controller/controller_lichxuathang_tin')
const controller_donhang_tin = require('../controller/controller_donhang_tin')
const controller_hanghoa_tin = require('../controller/controller_hanghoa_tin')
const controller_nhanvien_tin = require('../controller/controller_nhanvien_tin')
const xacThucController = require('../controller/xacThucController');


router.get('/', xacThucController.daDangNhap, function (req, res, next) {
  res.render('dashboard', {
    title: 'Dashboard',
    dashboard: true
  });
});

//Lich nhap hang
router.get('/lich-nhap-hang', controller_lichnhaphang_tin.getLichNhapHang);
//Lich xuat hang
router.get('/lich-xuat-hang', controller_lichxuathang_tin.getLichXuatHang);
//Don hang nhap
router.get('/don-hang-nhap', controller_donhang_tin.getDonHangNhap);
//Hang hoa
router.get('/hang-hoa', controller_hanghoa_tin.getHangHoa);
//Nhan vien
//giả sử route này quản lí mới vào được
router.get('/nhan-vien', xacThucController.daDangNhap, xacThucController.laQuanLy, controller_nhanvien_tin.getNhanVien);

/****************************************************************/

module.exports = router;