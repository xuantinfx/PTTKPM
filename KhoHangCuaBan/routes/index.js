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
const nguoiDungController_tin = require('../controller/nguoiDungController_tin')
const donHangNhapController = require('../controller/donHangNhapController_nhan');

router.get('/', xacThucController.chuaDangNhap, (req, res) => {
  res.render('home', {layout: ""});
})

router.get('/dashboard', xacThucController.daDangNhap, function (req, res, next) {
  let tuCach = "";
  switch (req.user.loaiNguoiDung) {
    case 'CK':
      tuCach = "Chủ kho"
      break;
    case 'QL':
        tuCach = 'Quản lý'
      break;
    case 'NV':
        tuCach = 'Nhân viên'
      break;

    default:
      tuCach = "Không rõ"
  }
  res.render('dashboard', {
    title: 'Dashboard',
    dashboard: true,
    user: req.user,
    tuCach
  });
});

//Lich nhap hang
router.get('/lich-nhap-hang', xacThucController.daDangNhap, xacThucController.laNhanVienKho, controller_lichnhaphang_tin.getLichNhapHang);
router.post('/lich-nhap-hang', controller_lichnhaphang_tin.postNhapHang);
//Lich xuat hang
router.get('/lich-xuat-hang', xacThucController.daDangNhap, xacThucController.laNhanVienKho, controller_lichxuathang_tin.getLichXuatHang);
router.post('/lich-xuat-hang', controller_lichxuathang_tin.postXuatHang);
//Don hang nhap
router.get('/don-hang-nhap', xacThucController.daDangNhap, xacThucController.laNhanVienKho, controller_donhang_tin.getDonHangNhap);
router.post('/don-hang-nhap/them', donHangNhapController.themDonHangNhap);
//Hang hoa
router.get('/hang-hoa', xacThucController.daDangNhap, xacThucController.laNhanVienKho, controller_hanghoa_tin.getHangHoa);
//Nhan vien
//giả sử route này quản lí mới vào được
router.get('/nhan-vien', xacThucController.daDangNhap, xacThucController.laQuanLy, xacThucController.daDangNhap, xacThucController.laQuanLy, controller_nhanvien_tin.getNhanVien);
router.post('/nhan-vien/kiem-tra-nhan-vien-moi', controller_nhanvien_tin.postKiemTraNhanVienMoi)
router.post('/nhan-vien/them-nhan-vien', controller_nhanvien_tin.postThemNhanVien)
//kiem tra xem user co ton tai hay k
router.get('/kiem-tra-user-ton-tai', nguoiDungController_tin.getKiemTraUserTonTai);
router.get('/dang-ky', xacThucController.chuaDangNhap, nguoiDungController_tin.getDangKy)
router.post('/dang-ky', nguoiDungController_tin.postDangKy)
/****************************************************************/

module.exports = router;