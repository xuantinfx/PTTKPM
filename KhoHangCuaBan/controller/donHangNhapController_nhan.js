var donHangNhapModel = require('../models/donHangNhapModel_nhan');
var hangHoaModel = require('../models/model_hanghoa_tin');

exports.themDonHangNhap = function (req, res) {
    // console.log('data chua chuan hoa: ',req.body);
    //chuẩn hóa data trước khi cập nhật database
    let data = {
        tenMatHang: (!Array.isArray(req.body.tenMatHang)) ? [req.body.tenMatHang] : req.body.tenMatHang,
        soLuong: (!Array.isArray(req.body.soLuong)) ? [req.body.soLuong] : req.body.soLuong,
        donVi: (!Array.isArray(req.body.donVi)) ? [req.body.donVi] : req.body.donVi,
        ngayHetHan: !(Array.isArray(req.body.ngayHetHan)) ? [req.body.ngayHetHan] : req.body.ngayHetHan,
        donGia: (!Array.isArray(req.body.donGia)) ? [req.body.donGia] : req.body.donGia,
        ngayNhap: req.body.ngayNhap,
        maQuanLy: req.user.maQuanLy,
        maKhoHienHanh: req.user.maKhoHienHanh
    }
    //chỉ có quản lí mói được sử dụng chức năng này 
    if (!data.maQuanLy) return res.redirect('/don-hang-xuat');
    //đổi kiểu cho các thuộc tính số
    for (let i = 0; i < data.soLuong.length; i++) {
        data.donGia[i] = parseInt(data.donGia[i]);
        data.soLuong[i] = parseInt(data.soLuong[i]);
    }
    console.log('data o donHangNhapController:', data);
    donHangNhapModel.themDonHangNhap(req.connectionToDB, data, (err, result) => {
        if (err) {
            throw err;
            res.end('false');
        } else {
            console.log(result);
            res.end('true');
        }

    })
}