const modelQL = require('../models/model_quanly_tin')
const modelNVK = require('../models/model_nhanvienkho_tin')
const modelDH = require('../models/model_donhang_tin')

const trangThaiDonHang = {
    ChuaHoanThanh: 'Chưa hoàn thành',
    DaHoanThanh: 'Đã hoàn thành'
}

module.exports.getLichXuatHang = async (req, res, next) => {
    let connectionToDB = req.connectionToDB;
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
        modelDH.getLichXuatHang(connectionToDB, maKhoHang, (error, results) => {

            if (error) {
                throw error;
            };
            results = results[0];
            let dsLichXuatHang = [];

            //lay ra danh sach cac don hang
            let dsDonXuat = [];
            let dsDonXuatChuaXuLi = [];
            for (let i = 0; i < results.length; i++) {
                if (results[i].DonHang.trangThai == trangThaiDonHang.ChuaHoanThanh) {
                    dsDonXuatChuaXuLi.push(results[i]);
                    let j = 0;
                    for (; j < dsDonXuat.length; j++) {
                        //da xuat hien trong mang
                        if (dsDonXuat[j].maDonHang == results[i].DonXuat.maDonHang) {
                            break;
                        }
                    }
                    //Chua xuat hien trong mang
                    if (j == dsDonXuat.length) {
                        dsDonXuat.push(results[i].DonXuat);
                    }
                }
            }
            //loc ra danh sach don hang
            for (let i = 0; i < dsDonXuat.length; i++) {
                for (let j = 0; j < dsDonXuatChuaXuLi.length; j++) {
                    //1 san pham thuoc don hang
                    if (dsDonXuat[i].maDonHang == dsDonXuatChuaXuLi[j].DonXuat.maDonHang) {
                        //lan dau insert
                        if (dsDonXuat[i].ngayLapDon == undefined) {
                            dsDonXuat[i].ngayLapDon = (new Date(dsDonXuatChuaXuLi[j].DonHang.ngayLapDon)).toLocaleDateString();
                            dsDonXuat[i].ngayXuat = dsDonXuatChuaXuLi[j].DonXuat.ngayXuat ? (new Date(dsDonXuatChuaXuLi[j].DonXuat.ngayXuat)).toLocaleDateString() : null;
                            dsDonXuat[i].dsHangHoa = [{
                                tenHangHoa: dsDonXuatChuaXuLi[j].HangHoa.tenHangHoa,
                                soLuong: dsDonXuatChuaXuLi[j].HangHoa.soLuong,
                                trangThai: dsDonXuatChuaXuLi[j].HangHoa.trangThai,
                                ghiChu: dsDonXuatChuaXuLi[j].HangHoa.ghiChu,
                                donVi: dsDonXuatChuaXuLi[j].HangHoa.donVi
                            }];
                        }
                        //insert tu lan 2 tro di
                        else {
                            dsDonXuat[i].dsHangHoa.push({
                                tenHangHoa: dsDonXuatChuaXuLi[j].HangHoa.tenHangHoa,
                                soLuong: dsDonXuatChuaXuLi[j].HangHoa.soLuong,
                                trangThai: dsDonXuatChuaXuLi[j].HangHoa.trangThai,
                                ghiChu: dsDonXuatChuaXuLi[j].HangHoa.ghiChu,
                                donVi: dsDonXuatChuaXuLi[j].HangHoa.donVi
                            });
                        }
                    }
                }
            }
            //trick
            for (let i = 0; i < dsDonXuat.length; i++) {
                dsDonXuat[i].dsHangHoa[0].trick = true;
            }

            //res.end(JSON.stringify(dsDonXuat));
            res.render('lichxuathang', {
                title: 'Lịch xuất hàng',
                lichXuathang: true,
                dsDonXuat,
                tuCach
            });
        });
        connectionToDB.end();
    } catch (mess) {
        connectionToDB.end();
        if (mess == 'ChuKho') {
            return res.redirect('/');
        }
        console.log(mess);
        return next();
    }
}