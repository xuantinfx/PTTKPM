module.exports = {
    qlLayMaKho: (connecttion, maQL) => {
        return new Promise((resolve, reject) => {
            connecttion.query({
                sql: `call sp_quanLyLayKho('${maQL}')`,
                nestTables: false
            }, (err, rows) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows[0][0].maKhoHang)
                }
            })
        })
    }
}