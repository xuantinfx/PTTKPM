module.exports = {
    getHangHoa: (connection, maKhoHang, cb) => {
        connection.query({
            sql: `call sp_getHangHoa('${maKhoHang}')`,
            nestTables: false
        }, cb)
    }
}