var async = require('async');
exports.xemDsDonHangXuat = function (req, callback) {
    req.connectionToDB.connect(function (err) {
        if (err) callback(err, null);
        console.log("Connected!");
        //chạy query
        async.waterfall([
            function (cb) {
                req.connectionToDB.query(`CALL xemDsDonHangXuat(${req.maKhoHang});`, function (err, results, fields) {
                    //gọi đến hàm tiếp theo trong mảng async.waterfall
                    if (err) cb(err, null);
                    else {
                        //lấy phần tử đầu tiên vì đây là stored procedure
                        cb(null, results[0]);
                    }
                });
            },
            function (dsDonHangXuat, cb) {
                // console.log("data:", dsDonHangXuat);
                //nhớ bắt đầu từ 1 -_-
                let item = 1;
                if (dsDonHangXuat.length == 0) cb(null, {});
                dsDonHangXuat.forEach(element => {
                    req.connectionToDB.query(`CALL xemChiTietDonHangXuat(${element.maDonHang});`, function (err, results, fields) {
                            if (err) {
                                item++;
                                cb(err, null);
                            }
                            else {
                                //add chiTiet vào dsDonHangXuat[i]
                                //console.log(element.maDonHang);
                                element.chiTietDonHangXuat = results[0];
                                //kiểm tra đã duyệt qua hết mảng chưa rồi mới gọi cb
                                if (item == dsDonHangXuat.length) cb(null, dsDonHangXuat);
                                else item++;
                            }
                        });
                });
            }
        ], function (err, result) {
            if(err) throw err;
            else callback(null, result);
        });
    });

};