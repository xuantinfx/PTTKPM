
exports.layNguoiDungTheoMaNguoiDung = function (req, username, callback) {
    //chạy query
    req.connectionToDB.query(`CALL layNguoiDungTheoMaNguoiDung('${username}')`, function (err, results, fields) {
        if (err) callback(err, null);
        else {
            callback(null, results[0][0]);
        }
    });
};

exports.kiemTraPassword = function (password, truePassword) {
    console.log(password, truePassword);
    return (password === truePassword);
}

//kiểm tra người dùng hiện tại có là chủ kho hay không, trả về mã chủ kho
exports.laChuKho = function (req, tenTaiKhoan, callback) {
    req.connectionToDB.query(`CALL laChuKho('${tenTaiKhoan}')`, function (err, results, fields) {
        if (err) callback(err, null);
        else {
            console.log(results[0][0])
            callback(null, results[0][0]);
        }
    });
}

//kiểm tra người dùng hiện tại có là quản lí hay không, trả về mã quản lí
exports.laQuanLy = function (req, tenTaiKhoan, callback) {
    req.connectionToDB.query(`CALL laQuanLy('${tenTaiKhoan}')`, function (err, results, fields) {
        if (err) callback(err, null);
        else {
            console.log(results[0][0])
            callback(null, results[0][0]);
        }
    });
}

//kiểm tra người dùng hiện tại có là nhân viên kho hay không, trả về mã nhân viên
exports.laNhanVienKho = function (req, tenTaiKhoan, callback) {
    req.connectionToDB.query(`CALL laNhanVienKho('${tenTaiKhoan}')`, function (err, results, fields) {
        if (err) callback(err, null);
        else {
            console.log(results[0][0])
            callback(null, results[0][0]);
        }
    });
}

