const nguoiDungModel_tin = require('../models/nguoiDungModel_tin')

module.exports.getKiemTraUserTonTai = (req, res, next) => {
    const connectionToDB = req.connectionToDB;
    nguoiDungModel_tin.layNguoiDungBanguserName(connectionToDB, req.query.userName, (err, result) => {
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

module.exports.postDangKy = (req, res, next) => {
    const {hoVaTen, loaiND, cmnd, sdt, userName, email, matKhau, reMatKhau} = req.body;
    let error = null;
    if(hoVaTen == "" || !hoVaTen) {
        error = "Ho va ten không được rỗng!"
    }
    if(loaiND == "" || !loaiND) {
        error = "Loai người dùng không được rỗng!"
    }
    if(cmnd == "" || !cmnd) {
        error = "Cmnd không được rỗng!"
    }
    if(sdt == "" || !sdt) {
        error = "Số điện thoại được rỗng!"
    }
    if(userName == "" || !userName) {
        error = "userName không được rỗng!"
    }
    if(email == "" || !email) {
        error = "Email không được rỗng!"
    }
    if(matKhau == "" || !matKhau) {
        error = "Mật khẩu không được rỗng!"
    }
    if(reMatKhau == "" || !reMatKhau) {
        error = "Gõ lại mật khẩu không được rỗng!"
    }
    if(matKhau != reMatKhau) {
        error = "Mật khẩu và gõ lại mật khẩu không khớp!"
    }
    if(error) {
        return res.end(JSON.stringify({
            status: "error",
            message: error
        }))
    }
    //kiem tra email đã tồn tại chưa
    nguoiDungModel_tin.layNguoiDungBangEmail(req.connectionToDB, email)
    .then(data => {
        if(data[0].length != 0) {
            res.end(JSON.stringify({
                status: "error",
                message: "Email đã có người sử dụng"
            }))
            throw "Email " + email + " đã có người sử dụng"
        }
        //kiem tra tiep username đã có người sử dụng chưa
        return nguoiDungModel_tin.layNguoiDungBangUserName(req.connectionToDB, userName)
    })
    .then(data => {
        if(data[0].length != 0) {
            res.end(JSON.stringify({
                status: "error",
                message: "Username đã có người sử dụng"
            }))
            throw "Username" + userName + " đã có người sử dụng"
        }
    })
    .then(() => {
        //du no la ai cung phai insert nguoi dung
        //chỗ này chơi bậy bậy tí, random 1 - 10.000.000 lấy đem làm mã, xui thì dính, tại lười lấy mã ra để xử lí
        let nguoiDungMoi = ""
        if(loaiND == "CK") {
            nguoiDungMoi = "false";
        }
        else {
            nguoiDungMoi = "true";
        }
        let maNguoiDung = Math.round(Math.random() * 10000000)
        nguoiDungModel_tin.insertNguoiDung(req.connectionToDB, maNguoiDung, hoVaTen, cmnd, sdt, email, userName, matKhau, nguoiDungMoi)
        .then(() => {
            //kiểm tra xem có là chủ kho hay nhân viên
            //Là chủ kho
            if(loaiND == "CK") {
                //insert them chu kho
                nguoiDungModel_tin.insertChuKho(req.connectionToDB, maNguoiDung);
                res.end(JSON.stringify({
                    status: "success"
                }))
                throw "insert " + userName + " thành công!"
            }
            //nhân viên
            else {
                //insert them nhan vien
                let maNhanVien = 'nv-' + Math.round(Math.random() * 1000000);
                nguoiDungModel_tin.insertNhanVien(req.connectionToDB, maNhanVien, maNguoiDung);
                res.end(JSON.stringify({
                    status: "success"
                }))
                throw "insert " + userName + " thành công!"
            }
        })
        .catch(err => {
            throw err;
            return;
        })
    })
    .catch(err => {
        console.log(err);
        return;
    })
}