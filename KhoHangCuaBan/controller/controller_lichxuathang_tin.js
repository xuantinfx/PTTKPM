const modelQL = require('../models/model_quanly_tin')
const modelNVK = require('../models/model_nhanvienkho_tin')
const modelDH = require('../models/model_donhang_tin')
const modelHH = require('../models/model_hanghoa_tin')

const trangThaiDonHang = {
    ChuaHoanThanh: 'Chưa hoàn thành',
    DaHoanThanh: 'Đã hoàn thành'
}

const trangThaiHangHoa = {
    DaXuat: 'Đã xuất',
    ChoXuat: 'Chờ xuất'
}

const beautifyDate = (date) => {
    if (!date)
        return null;

    date = new Date(date);
    let d = date.getDate();
    if (d < 10) d = '0' + d;
    let m = date.getMonth() + 1;
    if (m < 10) m = '0' + m;
    return `${date.getFullYear()}-${m}-${d}`;
}

module.exports.getLichXuatHang = async (req, res, next) => {
    let connectionToDB = req.connectionToDB;
    let tuCach = ''
    connectionToDB.connect();
    let maKhoHang = '0';
    try {
        //Lấy thông tin người đang vào
        //la chu kho thì dẫn chủ kho về 
        maKhoHang = req.user.maKhoHienHanh;
        switch (req.user.loaiNguoiDung) {
            case 'CK':
                tuCach = "Chủ kho"
                break;
            case 'QL':
                    tuCach = 'Quản lý'
                break;
            case 'NV':
                    tuCach = 'Nhân viên'
                break;

            default:
                throw (new Error('Không xác định được loại nhân viên'));
        }
        modelDH.getLichXuat(connectionToDB, maKhoHang, (error, results) => {

            if (error) {
                throw error;
            };
            results = results[0];
            let dsLichNhapHang = [];

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
                            dsDonXuat[i].ngayLapDon = (new Date(dsDonXuatChuaXuLi[j].DonHang.ngayLapDon)).toLocaleDateString("vi");
                            dsDonXuat[i].ngayNhap = beautifyDate(dsDonXuatChuaXuLi[j].DonXuat.ngayNhap);
                            dsDonXuat[i].dsHangHoa = [{
                                tenHangHoa: dsDonXuatChuaXuLi[j].HangHoa.tenHangHoa,
                                soLuong: dsDonXuatChuaXuLi[j].HangHoa.soLuong,
                                trangThai: dsDonXuatChuaXuLi[j].HangHoa.trangThai,
                                ghiChu: dsDonXuatChuaXuLi[j].HangHoa.ghiChu,
                                donVi: dsDonXuatChuaXuLi[j].HangHoa.donVi,
                                maHangHoa: dsDonXuatChuaXuLi[j].HangHoa.maHangHoa,
                                ngayHetHan: beautifyDate(dsDonXuatChuaXuLi[j].HangHoa.ngayHetHan)
                            }];
                        }
                        //insert tu lan 2 tro di
                        else {
                            dsDonXuat[i].dsHangHoa.push({
                                tenHangHoa: dsDonXuatChuaXuLi[j].HangHoa.tenHangHoa,
                                soLuong: dsDonXuatChuaXuLi[j].HangHoa.soLuong,
                                trangThai: dsDonXuatChuaXuLi[j].HangHoa.trangThai,
                                ghiChu: dsDonXuatChuaXuLi[j].HangHoa.ghiChu,
                                donVi: dsDonXuatChuaXuLi[j].HangHoa.donVi,
                                maHangHoa: dsDonXuatChuaXuLi[j].HangHoa.maHangHoa,
                                ngayHetHan: beautifyDate(dsDonXuatChuaXuLi[j].HangHoa.ngayHetHan)
                            });
                        }
                    }
                }
            }
            //trick
            for (let i = 0; i < dsDonXuat.length; i++) {
                dsDonXuat[i].dsHangHoa[0].trick = true;
            }
            console.log(dsDonXuat);
            //res.end(JSON.stringify(dsDonXuat));
            res.render('lichxuathang', {
                title: 'Lịch xuất hàng',
                lichXuathang: true,
                dsDonXuat,
                tuCach,
                user: req.user
            });
        });
        connectionToDB.end();
    } catch (mess) {
        connectionToDB.end();
        console.log(mess);
        return next();
    }
}

module.exports.postXuatHang = (req, res, next) => {
    let connectionToDB = req.connectionToDB;
    let tuCach = ''
    connectionToDB.connect();
    let tatCaSp = [];
    //lay ghi chu
    for (let i in req.body) {
        //cap nhat ghi chu
        if (i.indexOf("gc-") == 0) {
            tatCaSp[i.replace("gc-", "")] = {
                ...tatCaSp[i.replace("gc-", "")],
                ghiChu: req.body[i]
            }
        }
    }
    //lay xem la hang da xuat hay chua
    //1 phan tu
    if ((typeof req.body.done).toLowerCase() == 'string') {
        tatCaSp[req.body.done].daXuat = true;
    }
    //nhieu phan tu
    else
    if ((typeof req.body.done).toLowerCase() == 'object') {
        for (let i in req.body.done) {
            tatCaSp[req.body.done[i]].daXuat = true;
        }
    }

    let allPromise = [];
    for (let i in tatCaSp) {
        if (tatCaSp[i].daXuat) {
            allPromise.push(modelHH.updateStatusHangHoaXuat(connectionToDB, i, trangThaiHangHoa.DaXuat, tatCaSp[i].ghiChu));
        } else {
            allPromise.push(modelHH.updateStatusHangHoaXuat(connectionToDB, i, trangThaiHangHoa.ChoXuat, tatCaSp[i].ghiChu));
        }
    }
    Promise.all(allPromise)
        .then(async () => {
            //neu tat ca hang hoa trong don da duoc xuat thi doi trang thai hang hoa thanh da xuat
            let maKhoHang = '0';
            try {
                maKhoHang = req.user.maKhoHienHanh;
                modelDH.getLichXuat(connectionToDB, maKhoHang, (error, dsDonHang) => {
                    if (error) {
                        console.log(error)
                        throw error;
                    }
                    dsDonHang = dsDonHang[0];
                    allPromise = [];
                    let maDonHangDaQua = '';
                    for (let i = 0; i < dsDonHang.length; i++) {
                        if (dsDonHang[i].DonHang.trangThai == trangThaiDonHang.ChuaHoanThanh && dsDonHang[i].DonHang.maDonHang != maDonHangDaQua) {
                            allPromise.push(modelDH.getDonXuat(connectionToDB, dsDonHang[i].DonHang.maDonHang));
                            maDonHangDaQua = dsDonHang[i].DonHang.maDonHang;
                        }
                    }
                    Promise.all(allPromise)
                        .then(results => {
                            for (let k = 0; k < results.length; k++) {
                                //neu phat hien don hang nao da duoc nhap het thi phai thay doi trang thai thanh da xuat
                                //duyet qua ds hang hoa
                                let i = 0;
                                for (i = 0; i < results[k].length; i++) {
                                    if (results[k][i].HangHoa.trangThai == trangThaiHangHoa.ChoXuat) {
                                        break;
                                    }
                                }
                                if (i == results[k].length) {
                                    //cap nhat lai trang thai cua hang hoa
                                    modelDH.updateTrangThaiDonHang(connectionToDB, results[k][0].DonHang.maDonHang, trangThaiDonHang.DaHoanThanh)
                                }
                            }
                            res.redirect('/lich-xuat-hang')
                        })
                        .catch(err => {
                            console.log(err);
                            res.redirect('/lich-xuat-hang')
                        })
                });
            } catch (mess) {
                console.log(mess);
                return res.redirect('/lich-xuat-hang');
            }
        })
        .catch(err => {
            console.log(err);
            res.redirect('/lich-xuat-hang')
        })
}