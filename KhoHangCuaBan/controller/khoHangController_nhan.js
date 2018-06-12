var khoHangModel = require('../models/khoHangModel_nhan');

exports.xem = (req, res) => {
    //xử lí request
    console.log("Vao controller");
    //console.log(req.connectionToDB);
    //gọi model tương ứng
    khoHangModel.xemKhoTheoIdChu(req, function(err, data) {
        if (err) throw err;
        //render lại giao diện
        let tuCach = ""
        if(req.user.loaiNguoiDung == 'CK') {
            tuCach = 'Chủ kho'
        }
        else {
            tuCach = 'Quản lý'
        }
        res.render('khohang', {khoHang: data, user: req.user, tuCach});
    });

}

exports.postThemKhoHang = (req, res, next) => {
    let {tenKho, diaChi, moTa} = req.body;
    console.log(tenKho, diaChi, moTa);
    let maKhoHang = Math.round(Math.random() * 10000000);
    khoHangModel.insertKhoHang(req.connectionToDB, maKhoHang, tenKho, diaChi, req.user.maChuKho, moTa, (err, data) => {
        if(err) console.log(err);
        req.user.maKho.push(''+maKhoHang);
        if(req.user.maKho.length == 1)
            req.user.maKhoHienHanh = ''+maKhoHang;
        res.redirect("/kho-hang");
    } )
}