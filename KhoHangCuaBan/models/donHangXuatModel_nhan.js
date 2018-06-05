var async = require('async');
exports.xemDsDonHangXuat = function (req, callback) {
    req.connectionToDB.connect(function (err) {
        if (err) callback(err, null);
        console.log("Connected!");
        //chạy query
        async.waterfall([
            function (cb) {
                req.connectionToDB.query(`CALL xemDsDonHangXuat('${req.user.maKhoHienHanh}');`, function (err, results, fields) {
                    //gọi đến hàm tiếp theo trong mảng async.waterfall
                    if (err) cb(err, null);
                    else {
                        // console.log(results);   
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

exports.themDonHangXuat = function(connection, data, callback)
{
    //transaction ở mức connection, lưu ý phải commit
    connection.beginTransaction(function(err) {
        if (err) return callback(err, null);
        async.series([
            //update bảng hàng hóa
            function(cb){
                //tạo 1 loạt các câu query cần thiết
                let sql = '';
                for (let i = 0; i < data.maSo.length; i++){
                    sql += `CALL updateSoLuongHangHoa('${data.maSo[i]}',-${data.soLuong[i]});`;
                }
                console.log(sql);
                //gọi về database, nếu lỗi thì rollback và cb(err, null);
                connection.query(sql, (err, result) => {
                    console.log('kqtv call:', result);
                    if (err) {
                        connection.rollback();
                        cb(err, null);
                    }
                    else cb(null, result);
                })
            },
            function(cb){
                connection.commit((err)=>{
                    if (err) {
                        connection.rollback();
                        cb(err, null);
                    }
                    else cb(null, true);
                })
            }
        ], (err, results) => {
            if(err) callback(err, null);
            else callback(null, "thành công rồiiii"); 
            
        })
    })
}
