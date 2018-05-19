const trangThaiDonHang = {
    ChuaHoanThanh: 'Chưa hoàn thành',
    DaHoanThanh: 'Đã hoàn thành'
}

module.exports.getLichNhapHang = (req, res, next) => {
    const connectionToDB = req.connectionToDB;
    connectionToDB.connect();

    const maKhoHang = '0';

    //Lấy thông tin người đang vào
    //la chu kho thì dẫn chủ kho về /dashboard
    switch (req.loaiNguoiDung) {
        case 'CK':
            return res.redirect('/dashboard');
            break;
        case 'QL':
        
            break;
        case 'NV':

            break;

        default:
            return res.redirect('/dashboard');
    }

    connectionToDB.query({
        sql: `call sp_lichNhapHang('${maKhoHang}')`,
        nestTables: true
    }, function (error, results) {
        connectionToDB.end();

        if (error) {
            console.log(error);
            return next(error);
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
                        dsDonNhap[i].ngayLapDon = (new Date(dsDonNhapChuaXuLi[j].DonHang.ngayLapDon)).toLocaleDateString();
                        dsDonNhap[i].ngayNhap = dsDonNhapChuaXuLi[j].DonNhap.ngayNhap ? (new Date(dsDonNhapChuaXuLi[j].DonNhap.ngayNhap)).toLocaleDateString() : null;
                        dsDonNhap[i].dsHangHoa = [{
                            tenHangHoa: dsDonNhapChuaXuLi[j].HangHoa.tenHangHoa,
                            soLuong: dsDonNhapChuaXuLi[j].HangHoa.soLuong,
                            trangThai: dsDonNhapChuaXuLi[j].HangHoa.trangThai,
                            ghiChu: dsDonNhapChuaXuLi[j].HangHoa.ghiChu,
                            donVi: dsDonNhapChuaXuLi[j].HangHoa.donVi
                        }];
                    }
                    //insert tu lan 2 tro di
                    else {
                        dsDonNhap[i].dsHangHoa.push({
                            tenHangHoa: dsDonNhapChuaXuLi[j].HangHoa.tenHangHoa,
                            soLuong: dsDonNhapChuaXuLi[j].HangHoa.soLuong,
                            trangThai: dsDonNhapChuaXuLi[j].HangHoa.trangThai,
                            ghiChu: dsDonNhapChuaXuLi[j].HangHoa.ghiChu,
                            donVi: dsDonNhapChuaXuLi[j].HangHoa.donVi
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
            dsDonNhap
        });
    });
}