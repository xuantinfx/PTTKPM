const modelNhanVien = require('../models/model_nhanvien_tin')
const nguoiDungModel_tin = require("../models/nguoiDungModel_tin")

module.exports.getNhanVien = (req, res, next) => {
    const connectionToDB = req.connectionToDB;
    let tuCach = '';
    connectionToDB.connect();
    try {
        //Lấy thông tin người đang vào
        switch (req.user.loaiNguoiDung) {
            case 'CK':
                {
                    tuCach = 'Chủ kho';
                    modelNhanVien.layNVCuaChuKho(connectionToDB, req.user.maNguoiDung, (err, results) => {
                        if (err) {
                            throw err;
                        }
                        //res.end(JSON.stringify(results));
                        connectionToDB.end();
                        res.render('nhanvien', {
                            title: 'Nhân viên',
                            nhanVien: true,
                            tuCach,
                            dsNhanVien: results,
                            user: req.user,
                            dsKho: req.user.maKho
                        });
                    })
                }
                break;
            case 'QL':
                {
                    tuCach = 'Quản lý'
                    modelNhanVien.layNVCuaQuanLy(connectionToDB, req.user.maQuanLy, (err, results) => {
                        if (err) {
                            throw err;
                        }
                        results = results[0];
                        //res.end(JSON.stringify(results));
                        connectionToDB.end();
                        res.render('nhanvien', {
                            title: 'Nhân viên',
                            nhanVien: true,
                            tuCach,
                            dsNhanVien: results,
                            user: req.user
                        });
                    })
                }
                break;
            case 'NV':
                {
                    throw "NhanVienKho"
                }
                break;

            default:
                throw (new Error('Không xác định được loại nhân viên'));
        }
    } catch (mess) {
        connectionToDB.end();
        if (mess == 'NhanVienKho') {
            return res.redirect('/');
        }
        console.log(mess);
        next();
    }
}

module.exports.postKiemTraNhanVienMoi = (req, res, next) => {
    nguoiDungModel_tin.getNguoiDungChuaKichHoat(req.connectionToDB, (err, result) => {
        if(err) {
            res.end(JSON.stringify({
                status: "false",
                message: "Lỗi bất ngờ"
            }))
        }
        else {
            result = result[0];
            let i;
            for(i = 0; i < result.length; i++) {
                if(result[i].tenTaiKhoan == req.body.userName) {
                    break;
                }
            }
            if(i < result.length) {
                res.end(JSON.stringify({
                    status: "true"
                }))
            }
            else {
                res.end(JSON.stringify({
                    status: "false",
                    message: "username không hợp lệ"
                }))
            }
        }
    })
}

module.exports.postThemNhanVien = (req, res, next) => {
    let {userName, kho, quyen} = req.body;

    nguoiDungModel_tin.getMaNhanVien(req.connectionToDB, userName, (err, result) => {
        let maNhanVien = result[0][0].maNhanVien;
        
        if(quyen == 'QL') {
            nguoiDungModel_tin.insertQuanLy(req.connectionToDB, maNhanVien, kho, req.user.maNguoiDung,(err, data) => {
                if(err) console.log(err);
                //tra ket qua
                res.end(JSON.stringify({status: "success"}))
            })
        }
        else {
            //tam thoi chua add nhan vien duoc
            //tai thieu quan ly
        }
    })
}