const modelQL = require('./model_quanly_tin')

module.exports = {
    nvkLayMaKho: (connecttion, maNVK) => {
        return new Promise((resolve, reject) => {
            connecttion.query({
                sql: `call sp_nhanVienKho('${maNVK}')`,
                nestTables: false
            },async (err, rows) => {
                if (err) {
                    return reject(err);
                } else {
                    if (rows[0][0].maKhoHang == null) {
                        try {
                            let maKhoHang = await modelQL.qlLayMaKho(connecttion, rows[0][0].maQuanLy);
                            return resolve(maKhoHang);
                        } catch (error) {
                            console.log(error);
                            return reject(err);
                        }
                    } else {
                        return resolve(rows[0][0].maKhoHang)
                    }
                }
            })
        })
    }
}