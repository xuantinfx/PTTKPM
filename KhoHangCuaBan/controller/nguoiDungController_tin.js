const nguoiDungModel_tin = require('../models/nguoiDungModel_tin')

module.exports.getKiemTraUserTonTai = (req, res, next) => {
    const connectionToDB = req.connectionToDB;
    nguoiDungModel_tin.layNguoiDungBangUserName(connectionToDB, req.query.username, (err, result) => {
        if (err) {
            res.end(JSON.stringify({}));
            return connectionToDB.end();
        }
        result = result[0];
        if (result.length == 0) {
            res.end(JSON.stringify({
                daTonTai: false
            }))
        } else {
            res.end(JSON.stringify({
                daTonTai: true
            }))
        }
        connectionToDB.end();
    })
}

module.exports.getDangKy = (req, res, next) => {
    res.render("dangky", {layout: ""})
}