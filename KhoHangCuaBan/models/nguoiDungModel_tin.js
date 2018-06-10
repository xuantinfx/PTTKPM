module.exports.layNguoiDungBangUserName = (connection, userName, cb) => {
    connection.query({
        sql: `call sp_layNguoiDungBangUserName('${userName}')`,
        nestTables: false
    }, cb)
}