var async = require('async');

//thêm đơn hàng nhập
exports.themDonHangNhap = function (connection, data, callback) {
    //transaction ở mức connection, lưu ý phải commit
    connection.beginTransaction(function (err) {
        if (err) return callback(err, null);
        async.series([
            //INSERT BẢNG HÀNG HÓA NHỮNG GIÁ TRỊ MỚI
            function (cb) {
                //tạo 1 loạt các câu query cần thiết
                let sql = '';
                for (let i = 0; i < data.tenMatHang.length; i++) {
                    sql += `CALL insertHangHoaChoNhap(
                        '${data.tenMatHang[i]}',
                        '${data.maKhoHienHanh}',
                        ${data.soLuong[i]},
                        '${data.ngayNhap}',
                        '${data.ngayHetHan[i]}',
                        ${data.donGia[i]},
                        '${data.donVi[i]}'
                    );`;
                }
                //gọi về database, nếu lỗi thì rollback và cb(err, null);
                connection.query(sql, (err, results) => {
                    // console.log('kqtv call:', results);
                    if (err) {
                        connection.rollback();
                        cb(err, null);
                    } else {
                        data.maSoMoi = [];
                        for (let i = 0; i < data.tenMatHang.length; i++) {
                            data.maSoMoi.push(results[i * 2][0]['@maHangHoa']);
                        }
                        cb(null, results);
                    }
                })
            },
            //INSERT ĐƠN HÀNG MỚI
            function (cb) {
                connection.query(`CALL insertDonHangMoi('${data.maKhoHienHanh}', '${new Date().toISOString().slice(0,10)}', '${data.maQuanLy}', 'Chưa hoàn thành')`, (err, result) => {
                    if (err) {
                        connection.rollback();
                        cb(err, null);
                    } else {
                        data.maDonHangMoi = result[0][0]['@maDonHang'];
                        cb(null, result);
                    }
                })
            },
            //INSERT ĐƠN HÀNG NHẬP MỚI
            function (cb) {
                connection.query(`CALL insertDonHangNhapMoi('${data.maDonHangMoi}', '${data.ngayNhap}')`, (err, result) => {
                    if (err) {
                        connection.rollback();
                        cb(err, null);
                    } else {
                        cb(null, result);
                    }
                })
            },
            //INSERT CHI TIẾT ĐƠN HÀNG
            function (cb) {
                let sql = '';
                for (let i = 0; i < data.tenMatHang.length; i++) {
                    sql += `CALL insertChiTietDonHangNhap('${data.maDonHangMoi}', '${data.maSoMoi[i]}', ${data.soLuong[i]});`;
                }
                //gọi về database, nếu lỗi thì rollback và cb(err, null);
                connection.query(sql, (err, results) => {
                    // console.log('kqtv call:', results);
                    if (err) {
                        connection.rollback();
                        cb(err, null);
                    } else {
                        cb(null, results);
                    }
                })
            },
            function (cb) {
                connection.commit((err) => {
                    if (err) {
                        connection.rollback();
                        cb(err, null);
                    } else cb(null, true);
                })
            }
        ], (err, results) => {
            if (err) callback(err, null);
            else callback(null, "thành công rồiiii");
        })
    })
}