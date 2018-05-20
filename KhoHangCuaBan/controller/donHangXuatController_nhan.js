var donHangXuatModel = require('../model/donHangXuatModel_nhan');

exports.xem = (req, res) => {
    //xử lí request
    console.log("Vao controller");
    //console.log(req.connectionToDB);
    //gọi model tương ứng
    donHangXuatModel.xemDsDonHangXuat(req, function(err, data) {
        if (err) throw err;
        //tính tổng tiền mỗi đơn hàng
        data.forEach(donHangXuat => {
            let sum = 0;
            donHangXuat.chiTietDonHangXuat.forEach(chiTietDonHangXuat => {
                sum += parseInt(chiTietDonHangXuat.thanhTien);
            });
            console.log(sum);
            donHangXuat.tongTien = sum;
            donHangXuat.ngayLapDon = (new Date(donHangXuat.ngayLapDon)).toLocaleDateString("vn");
            donHangXuat.ngayXuat ? donHangXuat.ngayXuat = (new Date(donHangXuat.ngayXuat)).toLocaleDateString("vn") : null;
        });
        //render lại giao diện
        res.render('donhangxuat', {dsDonHangXuat: data});
    });

}
