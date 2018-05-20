const modelQL = require('../models/model_quanly_tin')
const modelNVK = require('../models/model_nhanvienkho_tin')
const modelHH = require('../models/model_hanghoa_tin');

module.exports.getHangHoa = async (req, res, next) => {
    const connectionToDB = req.connectionToDB;
    let tuCach = '';
    connectionToDB.connect();
    let maKhoHang = '0';
    try {
        //Lấy thông tin người đang vào
        //la chu kho thì dẫn chủ kho về /dashboard
        switch (req.loaiNguoiDung) {
            case 'CK':
                throw "ChuKho"
                break;
            case 'QL':
                try {
                    tuCach = 'Quản lý';
                    maKhoHang = await modelQL.qlLayMaKho(connectionToDB, req.maNhanVien);
                } catch (error) {
                    throw error;
                }
                break;
            case 'NV':
                try {
                    tuCach = 'Nhân viên';
                    maKhoHang = await modelNVK.nvkLayMaKho(connectionToDB, req.maNhanVien);
                } catch (error) {
                    throw error;
                }
                break;

            default:
                throw (new Error('Không xác định được loại nhân viên'));
        }

        modelHH.getHangHoa(connectionToDB, maKhoHang, (error, results) => {
            results = results[0];
            if (error)
                throw error;
            for(let i = 0; i < results.length; i++){
                results[i].ngayNhap = results[i].ngayNhap ? (new Date(results[i].ngayNhap)).toLocaleDateString() : null;
                results[i].ngayHetHan = results[i].ngayHetHan ? (new Date(results[i].ngayHetHan)).toLocaleDateString() : null;
            }
            res.render('hanghoa', {
                hangHoa: true,
                tuCach,
                dsHangHoa: results
            })
        })

    } catch (mess) {
        connectionToDB.end();
        if (mess == 'ChuKho') {
            return res.redirect('/');
        }
        console.log(mess);
        next();
    }
}