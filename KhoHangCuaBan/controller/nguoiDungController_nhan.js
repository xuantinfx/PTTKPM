var nguoiDungModel = require('../models/nguoiDungModel_nhan');
var khoHangModel = require('../models/khoHangModel_nhan');
var async = require('async');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//phương thức kiểm tra đăng nhập
passport.use(new LocalStrategy({
        passReqToCallback: true
    },
    //lấy thông tin người dùng, bao gồm là quản lí hay chủ kho luôn
    function (req, username, password, done) {
        req.connectionToDB.connect(function (err) {
            if (err) done(err, null);
            console.log("Connected!");
            //kiểm tra xem có tồn tại user hay không
            nguoiDungModel.layNguoiDungTheoMaNguoiDung(req, username, function (err, user) {
                if (err) throw err;
                if (!user) {
                    console.log("Người dùng không tồn tại");
                    return done(null, false);
                }
                //trường hợp người dùng tồn tại, kiểm tra xem password có khớp hay không
                if (!nguoiDungModel.kiemTraPassword(password, user.matKhau)) return done(null, false);
                console.log('Đăng nhập thành công');

                //kiểm tra thông tin chủ kho, quản lý, nhân viên kho
                //và lấy danh sách kho phù hợp
                KiemTraThongTinNguoiDungVaMaKho(req, username, user, done);
            });
        });
    }));

//phương thức serialize: chọn những thông tin nào được lưu trong session
passport.serializeUser(function (user, done) {
    console.log('Vào serialize: ', user);
    done(null, {
        maNguoiDung: user.maNguoiDung,
        tenTaiKhoan: user.tenTaiKhoan,
        tenNguoiDung: user.hoTen,
        email: user.email,
        loaiNguoiDung: user.loaiNguoiDung,
        maChuKho: user.maChuKho,
        maQuanLy: user.maQuanLy,
        maNhanVienKho: user.maNhanVienKho,
        maKho: user.maKho,
        maKhoHienHanh: user.maKhoHienHanh
    });
});

//phương thức deserialize: từ những thông tin trong session -> truy cập database lấy những thông tin cần thiết (nếu có)
passport.deserializeUser(function (nguoiDung, done) {
    // console.log(nguoiDung);
    done(null, nguoiDung);
});

function KiemTraThongTinNguoiDungVaMaKho(req, username, user, done) {
    async.parallel([function (callback) {
            //kiểm tra thông tin là chủ kho
            nguoiDungModel.laChuKho(req, username, function (err, chuKho) {
                if (err) throw err;
                if (chuKho) {
                    user.maChuKho = chuKho.maNguoiDung;
                    user.loaiNguoiDung = 'CK';
                    khoHangModel.layDsMaKhoTheoMaChuKho(req, user.maChuKho, function (err, maKho) {
                        if (err) throw err;
                        if (maKho) {
                            user.maKho = [];
                            for (let i = 0; i < maKho.length; i++) {
                                user.maKho.push(maKho[i].maKhoHang);
                            }
                        }
                        callback(null, user);
                    })
                }
                else callback(null, user);
            })
        },
        function (callback) {
            //kiểm tra thông tin là quản lý
            nguoiDungModel.laQuanLy(req, username, function (err, quanLy) {
                if (err) throw err;
                if (quanLy) {
                    user.maQuanLy = quanLy.maNhanVien;
                    user.loaiNguoiDung = 'QL';
                    khoHangModel.layDsMaKhoTheoMaQuanLy(req, user.maQuanLy, function (err, maKho) {
                        if (err) throw err;
                        if (maKho) {
                            user.maKho = [];
                            for (let i = 0; i < maKho.length; i++) {
                                user.maKho.push(maKho[i].maKhoHang);
                            }
                        }
                        callback(null, user);
                    })
                }
                else callback(null, user);

            })
        },
        function (callback) {
            //kiểm tra thông tin là nhân viên kho
            nguoiDungModel.laNhanVienKho(req, username, function (err, nhanVien) {
                if (err) throw err;
                if (nhanVien) {
                    user.maNhanVienKho = nhanVien.maNhanVien;
                    user.loaiNguoiDung = 'NV';
                    khoHangModel.layMaKhoTheoMaNhanVienKho(req, user.maNhanVienKho, function (err, maKho) {
                        if (err) throw err;
                        if (maKho) {
                            user.maKho = [];
                            for (let i = 0; i < maKho.length; i++) {
                                user.maKho.push(maKho[i].maKhoHang);
                            }
                        }
                        callback(null, user);
                    })
                }
                else callback(null, user);
            })
        }
    ], (err, result) => {
        console.log('Đã xong');
        //thêm thuộc tính kho hàng hiện hành
        if (user.maKho) user.maKhoHienHanh = user.maKho[0];
        return done(null, user);
    });
}

//nếu không xài custom verify callback thì phải đặt passport.authenticate làm middleware
exports.dangNhap = passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/dang-nhap'
})

//đăng xuất
exports.dangXuat = function (req, res){
    req.logout();
    res.redirect('/dang-nhap');
}

//lấy thông tin người dùng trong session
exports.layThongTinNguoiDungTrongSession = function(req, res){
    // console.log(req.user);
    res.json(req.user);
}