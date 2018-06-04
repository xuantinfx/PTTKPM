const modelNhanVien = require('../models/model_nhanvien_tin')

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
                            user: req.user
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