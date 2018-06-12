exports.xemKhoTheoIdChu = function (req, callback) {
    req.connectionToDB.connect(function (err) {
        if (err) callback(err, null);
        console.log("Connected!");
        //chạy query
        req.connectionToDB.query(`CALL xemKhoTheoIdChu('${req.user.maChuKho}')`, function (err, results, fields) {
            if (err) callback(err, null);
            else {
                callback(null, results[0]);
            }
        });
    });

};

//lấy danh sách mã kho theo mã chủ kho
exports.layDsMaKhoTheoMaChuKho = function(req, maChuKho, callback){
    req.connectionToDB.query(`CALL layDsMaKhoTheoMaChuKho('${maChuKho}')`, function (err, results, fields){
        if (err) callback(err, null);
        else callback(null, results[0])
    })
}

//lấy danh sách mã kho theo mã quản lý
exports.layDsMaKhoTheoMaQuanLy = function(req, maQuanLy, callback){
    req.connectionToDB.query(`CALL layDsMaKhoTheoMaQuanLy('${maQuanLy}')`, function (err, results, fields){
        if (err) callback(err, null);
        else callback(null, results[0])
    })
}

//lấy mã kho của nhân viên kho
exports.layMaKhoTheoMaNhanVienKho = function(req, maNhanVien, callback){
    req.connectionToDB.query(`CALL layMaKhoTheoMaNhanVienKho('${maNhanVien}')`, function (err, results, fields){
        if (err) callback(err, null);
        else callback(null, results[0])
    })
}

//them kho hang
exports.insertKhoHang = function(connection, maKhoHang, tenKhoHang, diaChi, chuKho, moTa, callback){
    connection.query(`CALL sp_InsertKho('${maKhoHang}','${tenKhoHang}','${diaChi}','${chuKho}','${moTa}')`, callback)
}

