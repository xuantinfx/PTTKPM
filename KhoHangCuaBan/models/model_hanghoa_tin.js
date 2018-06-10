module.exports = {
    getHangHoa: (connection, maKhoHang, cb) => {
        connection.query({
            sql: `call sp_getHangHoa('${maKhoHang}')`,
            nestTables: false
        }, cb)
    },
    updateStatusHangHoaNhap: (connection, maHangHoa, trangThai, ngayHetHan, ngayNhap, ghiChu) => {
        return new Promise((resole, reject) => {
            connection.query({
                sql: `call sp_updateSatusHangHoaNhap('${maHangHoa}','${trangThai}','${ngayHetHan}','${ngayNhap}','${ghiChu}')`,
                nestTables: true
            }, (err, result) => {
                if(err) return reject(err);
                resole(result);
            })
        })
    },
    updateStatusHangHoaXuat: (connection, maHangHoa, trangThai, ghiChu) => {
        return new Promise((resole, reject) => {
            connection.query({
                sql: `call sp_updateSatusHangHoaXuat('${maHangHoa}','${trangThai}','${ghiChu}')`,
                nestTables: true
            }, (err, result) => {
                if(err) return reject(err);
                resole(result);
            })
        })
    },
    layDsMatHangDaNhap: (connection, maKhoHienHanh, callback) =>{
        connection.query(`CALL layDsMatHangDaNhap('${maKhoHienHanh}')`, (err, results) => {
            if (err) callback(err, null);
            callback(null, results[0]);
        })
    }
}