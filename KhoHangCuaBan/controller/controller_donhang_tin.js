const modelQL = require('../models/model_quanly_tin')
const modelNVK = require('../models/model_nhanvienkho_tin')
const modelDH = require('../models/model_donhang_tin')

const trangThaiDonHang = {
    ChuaHoanThanh: 'Chưa hoàn thành',
    DaHoanThanh: 'Đã hoàn thành'
}

module.exports.getDonHangNhap = async (req, res, next) => {
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

        modelDH.getDonNhap(connectionToDB, maKhoHang, (error, results) => {
            if (error) {
                throw error;
            };
            results = results[0];
            //lay ra danh sach cac don hang
            let dsDonNhap = [];
            for (let i = 0; i < results.length; i++) {
                let j = 0;
                for (; j < dsDonNhap.length; j++) {
                    //da xuat hien trong mang
                    if (dsDonNhap[j].maDonHang == results[i].DonNhap.maDonHang) {
                        break;
                    }
                }
                //Chua xuat hien trong mang
                if (j == dsDonNhap.length) {
                    dsDonNhap.push(results[i].DonNhap);
                }
            }
            //loc ra danh sach don hang
            for (let i = 0; i < dsDonNhap.length; i++) {
                for (let j = 0; j < results.length; j++) {
                    //1 san pham thuoc don hang
                    if (dsDonNhap[i].maDonHang == results[j].DonNhap.maDonHang) {
                        //lan dau insert
                        if (dsDonNhap[i].ngayLapDon == undefined) {
                            dsDonNhap[i].ngayLapDon = (new Date(results[j].DonHang.ngayLapDon)).toLocaleDateString();
                            dsDonNhap[i].ngayNhap = results[j].DonNhap.ngayNhap ? (new Date(results[j].DonNhap.ngayNhap)).toLocaleDateString() : null;
                            dsDonNhap[i].nguoiLap = results[j].NguoiDung.hoTen;
                            dsDonNhap[i].dsHangHoa = [{
                                tenHangHoa: results[j].HangHoa.tenHangHoa,
                                soLuong: results[j].HangHoa.soLuong,
                                trangThai: results[j].HangHoa.trangThai,
                                ghiChu: results[j].HangHoa.ghiChu,
                                donVi: results[j].HangHoa.donVi,
                                donGia: results[j].HangHoa.donGia,
                                thanhTien: parseInt(results[j].HangHoa.donGia) * parseInt(results[j].HangHoa.soLuong)
                            }];
                        }
                        //insert tu lan 2 tro di
                        else {
                            dsDonNhap[i].dsHangHoa.push({
                                tenHangHoa: results[j].HangHoa.tenHangHoa,
                                soLuong: results[j].HangHoa.soLuong,
                                trangThai: results[j].HangHoa.trangThai,
                                ghiChu: results[j].HangHoa.ghiChu,
                                donVi: results[j].HangHoa.donVi,
                                donGia: results[j].HangHoa.donGia,
                                thanhTien: parseInt(results[j].HangHoa.donGia) * parseInt(results[j].HangHoa.soLuong)
                            });
                        }
                    }
                }
            }

            //tinh tong
            for(let i = 0;i < dsDonNhap.length; i++){
                let tong = 0;
                for(let j = 0; j < dsDonNhap[i].dsHangHoa.length; j++){
                    tong += dsDonNhap[i].dsHangHoa[j].thanhTien;
                }
                dsDonNhap[i].tongTien = tong;
            }
            //res.end(JSON.stringify(dsDonNhap))
            res.render('donhangnhap', {
                donHangNhap: true,
                dsDonNhap,
                tuCach
            });
        })
    } catch (mess) {
        connectionToDB.end();
        if(mess == 'ChuKho'){
            res.redirect('/');
        }
        console.log(err);
        return next()
    }
}