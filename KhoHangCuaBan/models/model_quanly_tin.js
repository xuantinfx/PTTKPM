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
                    if(rows[0][0] == undefined) {
                        return reject(new Error("Ket qua rong"))
                    }
                    return resolve(rows[0][0].maKhoHang)
                }
            })
        })
    }
}