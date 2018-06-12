module.exports.layNguoiDungBangUserName = (connection, userName) => {
    return new Promise((resole, reject) => {
        connection.query({
            sql: `call sp_layNguoiDungBangUserName('${userName}')`,
            nestTables: false
        }, (err, data) => {
            if(err) return reject(err);
            resole(data);
        })
    })
}

module.exports.layNguoiDungBangEmail = (connection, email) => {
    return new Promise((resole, reject) => {
        connection.query({
            sql: `call sp_layNguoiDungBangEmail('${email}')`,
            nestTables: false
        }, (err, data) => {
            if(err) return reject(err);
            resole(data);
        })
    })
}

module.exports.insertNguoiDung = (connection, maNguoiDung, hoTen, cmnd, sdt, email, tenTaiKhoan, matKhau) => {
    return new Promise((resole, reject) => {
        connection.query({
            sql: `call sp_InsertNguoiDung('${maNguoiDung}', '${hoTen}', '${cmnd}', '${sdt}', '${email}', '${tenTaiKhoan}', '${matKhau}')`,
            nestTables: false
        }, (err, data) => {
            if(err) return reject(err);
            resole(data);
        })
    })
}

module.exports.insertChuKho = (connection, maNguoiDung) => {
    connection.query({
        sql: `call sp_InsertChuKho('${maNguoiDung}')`,
        nestTables: false
    })
}

module.exports.insertNhanVien = (connection, maNhanVien, maNguoiDung) => {
    connection.query({
        sql: `call sp_InsertNhanVien('${maNhanVien}', '${maNguoiDung}')`,
        nestTables: false
    })
}