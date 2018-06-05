var donHangXuatModel = require('../models/donHangXuatModel_nhan');
var hangHoaModel = require('../models/model_hanghoa_tin');

exports.xem = (req, res) => {
    //xử lí request
    // console.log("Vao controller");
    //console.log(req.connectionToDB);
    //gọi model tương ứng
    donHangXuatModel.xemDsDonHangXuat(req, function (err, data) {
        if (err) throw err;
        //tính tổng tiền mỗi đơn hàng
        data.forEach(donHangXuat => {
            let sum = 0;
            donHangXuat.chiTietDonHangXuat.forEach(chiTietDonHangXuat => {
                sum += parseInt(chiTietDonHangXuat.thanhTien);
            });
            // console.log(sum);
            donHangXuat.tongTien = sum;
            donHangXuat.ngayLapDon = (new Date(donHangXuat.ngayLapDon).toLocaleDateString('vi-VN'));
            donHangXuat.ngayXuat ? donHangXuat.ngayXuat = (new Date(donHangXuat.ngayXuat).toLocaleDateString("vi-VN")) : null;
        });
        //render lại giao diện, truyền thêm biến donHangXuat để active cái navbar
        res.render('donhangxuat', {
            dsDonHangXuat: data,
            donHangXuat: true,
            user: req.user
        });
    });

}

exports.layDsMatHangDaNhap = function (req, res) {
    hangHoaModel.layDsMatHangDaNhap(req.connectionToDB, (err, dsMatHang) => {
        if (err) throw err;
        if (dsMatHang) {
            //tạo ra kết quả trả về {dsOption: <option></option>, dsNgayNhap: [], dsNgayHetHan: [], dsSoLuong: []}
            let dsOption = `<option></option>`
            let dsNgayNhap = [],
                dsNgayHetHan = [],
                dsSoLuong = [];
            for (let i = 0; i < dsMatHang.length; i++) {
                dsNgayNhap.push(dsMatHang[i].ngayNhap);
                dsNgayHetHan.push(dsMatHang[i].ngayHetHan);
                dsSoLuong.push(dsMatHang[i].soLuong);
                dsOption += `<option value="${dsMatHang[i].maHangHoa}">${dsMatHang[i].tenHangHoa}</option>`
            }
            let dataTraVe = {
                dsOption,
                dsNgayNhap,
                dsNgayHetHan,
                dsSoLuong
            };
            res.json(dataTraVe);
        }
        res.end('false');
    })
}


exports.themDonHangXuat = function (req, res) {
    //chuẩn hóa data trước khi cập nhật database
    let data = {
        ngayXuat: req.body.ngayXuat,
        maQuanLy: req.user.maQuanLy,
        maSo: (req.body.maSo.length == 1) ? [req.body.maSo] : req.body.maSo,
        soLuong: (req.body.soLuong.length == 1) ? [req.body.soLuong] : req.body.soLuong,
    }
    //chỉ có quản lí mói được sử dụng chức năng này 
    if (!data.maQuanLy) return res.redirect('/don-hang-xuat');
    //đổi kiểu cho số lượng
    for (let i = 0; i < data.soLuong.length; i++) {
        data.soLuong[i] = parseInt(data.soLuong[i]);
    }
    //lọc mặt hàng trùng
    for (let i = 1; i < data.maSo.length; i++) {
        for (let j = 0; j < i; j++) {
            if (data.maSo[j] == data.maSo[i]) {
                data.soLuong[j] += data.soLuong[i];
                data.maSo.splice(i, 1);
                data.soLuong.splice(i, 1);
                i--;
                break;
            }
        }
    }
    console.log('data o donHangXuatController:', data);
    donHangXuatModel.themDonHangXuat(req.connectionToDB, data, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect('/don-hang-xuat');
    })

}