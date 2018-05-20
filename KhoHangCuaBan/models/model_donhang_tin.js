module.exports = {
    getLichNhapHang: (connection, maKhoHang, cb) => {
        connection.query({
            sql: `call sp_lichNhapHang('${maKhoHang}')`,
            nestTables: true
        }, cb)
    },
    getLichXuatHang: (connection, maKhoHang, cb) => {
        connection.query({
            sql: `call sp_lichXuatHang('${maKhoHang}')`,
            nestTables: true
        }, cb)
    }
}