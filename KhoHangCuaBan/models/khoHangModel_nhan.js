exports.xemKhoTheoIdChu = function (req, callback) {
    req.connectionToDB.connect(function (err) {
        if (err) callback(err, null);
        console.log("Connected!");
        //chạy query
        req.connectionToDB.query(`CALL xemKhoTheoIdChu(${req.maNguoiDung})`, function (err, results, fields) {
            if (err) callback(err, null);
            else {
                callback(null, results[0]);
            }
        });
    });

};