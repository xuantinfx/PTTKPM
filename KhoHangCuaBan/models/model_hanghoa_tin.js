module.exports = {
    getHangHoa: (connection, maKhoHang, cb) => {
        connection.query({
            sql: `call sp_getHangHoa('${maKhoHang}')`,
            nestTables: false
        }, cb)
    },
    layDsMatHangDaNhap: (connection, callback) =>{
        connection.query('CALL layDsMatHangDaNhap', (err, results) => {
            if (err) callback(err, null);
            callback(null, results[0]);
        })
    }
}