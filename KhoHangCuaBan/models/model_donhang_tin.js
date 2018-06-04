module.exports = {
    getLichNhap: (connection, maKhoHang, cb) => {
        connection.query({
            sql: `call sp_lichNhapHang('${maKhoHang}')`,
            nestTables: true
        }, cb)
    },
    getLichXuat: (connection, maKhoHang, cb) => {
        connection.query({
            sql: `call sp_lichXuatHang('${maKhoHang}')`,
            nestTables: true
        }, cb)
    },
    getDonNhapCuaKho: (connection, maKhoHang, cb) => {
        connection.query({
            sql: `call sp_getDonNhapCuaKho('${maKhoHang}')`,
            nestTables: true
        }, cb)
    },
    getDonNhap: (connection, maDonNhap) => {
        return new Promise((resole, reject) => {
            connection.query({
                sql: `call sp_getDonNhap('${maDonNhap}')`,
                nestTables: true
            }, (err, result) => {
                if(err) return reject(err);
                return resole(result[0]);
            })
        })
    },
    getDonXuat: (connection, maDonXuat) => {
        return new Promise((resole, reject) => {
            connection.query({
                sql: `call sp_getDonXuat('${maDonXuat}')`,
                nestTables: true
            }, (err, result) => {
                if(err) return reject(err);
                return resole(result[0]);
            })
        })
    },
    updateTrangThaiDonHang: (connection, maDonHang, trangThai, cb) => {
        connection.query({
            sql: `call sp_updateSatusDonHang('${maDonHang}', '${trangThai}')`,
            nestTables: true
        }, cb)
    },
}