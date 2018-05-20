module.exports = {
    layNVCuaQuanLyPromise: (connection, maQuanLy) => {
        return new Promise((resolve, reject) => {
            connection.query({
                sql: `call sp_getNvChoQuanLy('${maQuanLy}')`,
                nestTables: false
            }, (err, results) => {
                if(err){
                    return reject(err);
                }
                else{
                    resolve(results[0]);
                }
            })
        })
    },
    layNVCuaChuKho: (connection, maChuKho, cb) => {
        connection.query({
            sql: `call sp_getQlChoChuKho('${maChuKho}')`,
            nestTables: false
        }, (err, results) => {
            results = results[0];
            //console.log(results);
            let listPromise = [];
            //duyet qua danh sach quan ly vua lay duoc de lay nhan vien
            for(let i = 0; i< results.length; i++) {
                listPromise.push(module.exports.layNVCuaQuanLyPromise(connection, results[i].maNhanVien))
            }
            Promise.all(listPromise)
            .then(listResults => {
                //console.log(listResults.length)
                for(let i = 0; i < listResults.length; i++){
                    //console.log(listResults[i])
                    results = results.concat(listResults[i]);
                }
                cb(null, results);
            })
            .catch(err => {
                cb(err);
            })
        })
    },
    layNVCuaQuanLy: (connection, maQuanLy, cb) => {
        connection.query({
            sql: `call sp_getNvChoQuanLy('${maQuanLy}')`,
            nestTables: false
        }, cb)
    },
}