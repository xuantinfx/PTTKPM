var khoHangModel = require('../model/khoHangModel_nhan');

exports.xem = (req, res) => {
    //xử lí request
    console.log("Vao controller");
    //console.log(req.connectionToDB);
    //gọi model tương ứng
    khoHangModel.xemKhoTheoIdChu(req, function(err, data) {
        if (err) throw err;
        //render lại giao diện
        res.render('khohang', {khoHang: data});
    });

}