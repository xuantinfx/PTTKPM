const modelQL = require('../models/model_quanly_tin')
const modelNVK = require('../models/model_nhanvienkho_tin')
const modelHH = require('../models/model_hanghoa_tin');

const TrangThaiHangHoa = {
    DaNhap: 'Đã nhập',
    DaXuat: 'Đã Xuất',
    ChoNhap: 'Chờ nhập',
    ChoXuat: 'Chờ xuất'
}

module.exports.getHangHoa = async (req, res, next) => {
    const connectionToDB = req.connectionToDB;
    let tuCach = '';
    connectionToDB.connect();
    let maKhoHang = '0';
    try {
        //Lấy thông tin người đang vào
        //la chu kho thì dẫn chủ kho về /dashboard
        maKhoHang = req.user.maKhoHienHanh;
        switch (req.user.loaiNguoiDung) {
            case 'CK':
                tuCach = "Chủ kho"
                break;
            case 'QL':
                    tuCach = 'Quản lý';
                break;
            case 'NV':
                    tuCach = 'Nhân viên';
                break;

            default:
                throw (new Error('Không xác định được loại nhân viên'));
        }

        modelHH.getHangHoa(connectionToDB, maKhoHang, (error, results) => {
            results = results[0];
            if (error)
                throw error;
            
            //chi hien thi ds hang hoa da nhap hoac cho xuat
            let dsHangHoaTrongKho = [];
            for(let i = 0; i < results.length; i++){
                results[i].ngayNhap = results[i].ngayNhap ? (new Date(results[i].ngayNhap)).toLocaleDateString() : null;
                results[i].ngayHetHan = results[i].ngayHetHan ? (new Date(results[i].ngayHetHan)).toLocaleDateString() : null;
                if(results[i].trangThai == TrangThaiHangHoa.DaNhap ||
                    results[i].trangThai == TrangThaiHangHoa.ChoXuat) {
                        dsHangHoaTrongKho.push(results[i])
                    }
            }
            res.render('hanghoa', {
                hangHoa: true,
                tuCach,
                dsHangHoa: dsHangHoaTrongKho,
                user: req.user
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