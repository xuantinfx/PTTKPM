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
    getDonNhap: (connection, maKhoHang, cb) => {
        connection.query({
            sql: `call sp_getDonNhap('${maKhoHang}')`,
            nestTables: true
        }, cb)
    },
    getDonXuat: (connection, maKhoHang, cb) => {
        connection.query({
            sql: `call sp_getDonXuat('${maKhoHang}')`,
            nestTables: true
        }, cb)
    }
}