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