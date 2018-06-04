const modelQL = require('../models/model_quanly_tin')
const modelNVK = require('../models/model_nhanvienkho_tin')
const modelDH = require('../models/model_donhang_tin')
const modelHH = require('../models/model_hanghoa_tin')

const trangThaiDonHang = {
    ChuaHoanThanh: 'Chưa hoàn thành',
    DaHoanThanh: 'Đã hoàn thành'
}

const trangThaiHangHoa = {
    DaNhap: 'Đã nhập',
    ChoNhap: 'Chờ nhập'
}

const beautifyDate = (date) => {
    if(!date)
        return null;
    
    date = new Date(date);
    let d = date.getDate();
    if (d < 10) d = '0' + d;
    let m = date.getMonth() + 1;
    if (m < 10) m = '0' + m;
    return `${date.getFullYear()}-${m}-${d}`;
}

module.exports.getLichNhapHang = async (req, res, next) => {
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
        modelDH.getLichNhap(connectionToDB, maKhoHang, (error, results) => {

            if (error) {
                throw error;
            };
            results = results[0];
            let dsLichNhapHang = [];

            //lay ra danh sach cac don hang
            let dsDonNhap = [];
            let dsDonNhapChuaXuLi = [];
            for (let i = 0; i < results.length; i++) {
                if (results[i].DonHang.trangThai == trangThaiDonHang.ChuaHoanThanh) {
                    dsDonNhapChuaXuLi.push(results[i]);
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
            }
            //loc ra danh sach don hang
            for (let i = 0; i < dsDonNhap.length; i++) {
                for (let j = 0; j < dsDonNhapChuaXuLi.length; j++) {
                    //1 san pham thuoc don hang
                    if (dsDonNhap[i].maDonHang == dsDonNhapChuaXuLi[j].DonNhap.maDonHang) {
                        //lan dau insert
                        if (dsDonNhap[i].ngayLapDon == undefined) {
                            dsDonNhap[i].ngayLapDon = (new Date(dsDonNhapChuaXuLi[j].DonHang.ngayLapDon)).toLocaleDateString("vi");
                            dsDonNhap[i].ngayNhap = beautifyDate(dsDonNhapChuaXuLi[j].DonNhap.ngayNhap);
                            dsDonNhap[i].dsHangHoa = [{
                                tenHangHoa: dsDonNhapChuaXuLi[j].HangHoa.tenHangHoa,
                                soLuong: dsDonNhapChuaXuLi[j].HangHoa.soLuong,
                                trangThai: dsDonNhapChuaXuLi[j].HangHoa.trangThai,
                                ghiChu: dsDonNhapChuaXuLi[j].HangHoa.ghiChu,
                                donVi: dsDonNhapChuaXuLi[j].HangHoa.donVi,
                                maHangHoa: dsDonNhapChuaXuLi[j].HangHoa.maHangHoa,
                                ngayHetHan: beautifyDate(dsDonNhapChuaXuLi[j].HangHoa.ngayHetHan)
                            }];
                        }
                        //insert tu lan 2 tro di
                        else {
                            dsDonNhap[i].dsHangHoa.push({
                                tenHangHoa: dsDonNhapChuaXuLi[j].HangHoa.tenHangHoa,
                                soLuong: dsDonNhapChuaXuLi[j].HangHoa.soLuong,
                                trangThai: dsDonNhapChuaXuLi[j].HangHoa.trangThai,
                                ghiChu: dsDonNhapChuaXuLi[j].HangHoa.ghiChu,
                                donVi: dsDonNhapChuaXuLi[j].HangHoa.donVi,
                                maHangHoa: dsDonNhapChuaXuLi[j].HangHoa.maHangHoa,
                                ngayHetHan: beautifyDate( dsDonNhapChuaXuLi[j].HangHoa.ngayHetHan)
                            });
                        }
                    }
                }
            }
            //trick
            for (let i = 0; i < dsDonNhap.length; i++) {
                dsDonNhap[i].dsHangHoa[0].trick = true;
            }
            //res.end(JSON.stringify(dsDonNhap));
            res.render('lichnhaphang', {
                title: 'Lịch nhập hàng',
                lichNhaphang: true,
                dsDonNhap,
                tuCach,
                user: req.user
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

module.exports.postNhapHang = (req, res, next) => {
    let connectionToDB = req.connectionToDB;
    let tuCach = ''
    connectionToDB.connect();
    let tatCaSp = [];
    //lay ghi chu va ngay het han
    for (let i in req.body) {
        //cap nhat ghi chu
        if (i.indexOf("gc-") == 0) {
            tatCaSp[i.replace("gc-", "")] = {
                ...tatCaSp[i.replace("gc-", "")],
                ghiChu: req.body[i]
            }
        }
        //cap nhat ngay het han
        if (i.indexOf("nhh-") == 0) {
            tatCaSp[i.replace("nhh-", "")] = {
                ...tatCaSp[i.replace("nhh-", "")],
                ngayHetHan: req.body[i]
            }
        }
    }
    //lay xem la hang da nhap hay chua
    //1 phan tu
    if ((typeof req.body.done).toLowerCase() == 'string') {
        tatCaSp[req.body.done].daNhap = true;
    }
    //nhieu phan tu
    else
    if ((typeof req.body.done).toLowerCase() == 'object') {
        for (let i in req.body.done) {
            tatCaSp[req.body.done[i]].daNhap = true;
        }
    }
    let now = new Date();
    let date = now.getDate();
    if (date < 10) date = '0' + date;
    let month = now.getMonth() + 1;
    if (month < 10) month = '0' + month;
    let dateNow = `${now.getFullYear()}-${month}-${date}`;

    let allPromise = [];
    for (let i in tatCaSp) {
        if (tatCaSp[i].daNhap) {
            if (tatCaSp[i].ngayHetHan != '')
                allPromise.push(modelHH.updateStatusHangHoaNhap(connectionToDB, i, trangThaiHangHoa.DaNhap, tatCaSp[i].ngayHetHan, dateNow, tatCaSp[i].ghiChu));
        } else {
            if (tatCaSp[i].ngayHetHan != '')
                allPromise.push(modelHH.updateStatusHangHoaNhap(connectionToDB, i, trangThaiHangHoa.ChoNhap, tatCaSp[i].ngayHetHan, dateNow, tatCaSp[i].ghiChu));
        }
    }
    Promise.all(allPromise)
        .then( async () => {
            //neu tat ca hang hoa trong don da duoc nhap thi doi trang thai hang hoa thanh da nhap
            let maKhoHang = '0';
            try {
                maKhoHang = req.user.maKhoHienHanh;
                modelDH.getLichNhap(connectionToDB, maKhoHang, (error, dsDonHang) => {
                    if(error) {
                        console.log(error)
                        throw error;
                    }
                    dsDonHang = dsDonHang[0];
                    allPromise = [];
                    let maDonHangDaQua = '';
                    for (let i = 0; i < dsDonHang.length; i++) {
                        if (dsDonHang[i].DonHang.trangThai == trangThaiDonHang.ChuaHoanThanh && dsDonHang[i].DonHang.maDonHang != maDonHangDaQua) {
                            allPromise.push(modelDH.getDonNhap(connectionToDB, dsDonHang[i].DonHang.maDonHang));
                            maDonHangDaQua = dsDonHang[i].DonHang.maDonHang;
                        }
                    }
                    Promise.all(allPromise)
                        .then(results => {
                            for (let k = 0; k < results.length; k++) {
                                //neu phat hien don hang nao da duoc nhap het thi phai thay doi trang thai thanh da nhap
                                //duyet qua ds hang hoa
                                let i = 0;
                                for (i = 0; i < results[k].length; i++) {
                                    if (results[k][i].HangHoa.trangThai == trangThaiHangHoa.ChoNhap) {
                                        break;
                                    }
                                }
                                if (i == results[k].length) {
                                    //cap nhat lai trang thai cua hang hoa
                                    modelDH.updateTrangThaiDonHang(connectionToDB, results[k][0].DonHang.maDonHang, trangThaiDonHang.DaHoanThanh)
                                }
                            }
                            res.redirect('/lich-nhap-hang')
                        })
                        .catch(err => {
                            console.log(err);
                            res.redirect('/lich-nhap-hang')
                        })
                });
            } catch (mess) {
                console.log(mess);
                return res.redirect('/lich-nhap-hang');
            }
        })
        .catch(err => {
            console.log(err);
            res.redirect('/lich-nhap-hang')
        })
}