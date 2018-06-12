-- insert nguoidung
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`, `laTaiKhoanMoi`) VALUES ('0', 'Nguyễn Văn A', '215439032', '0965299820', 'nva@gmail.com', 'nguyenvana', 'nguyenvana','false');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`, `laTaiKhoanMoi`) VALUES ('1', 'Nguyễn Văn B', '215439033', '0965299821', 'nvb@gmail.com', 'nguyenvanb', 'nguyenvanb','false');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`, `laTaiKhoanMoi`) VALUES ('2', 'Nguyễn Văn C', '215439034', '0965299822', 'nvc@gmail.com', 'nguyenvanc', 'nguyenvanc','false');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`, `laTaiKhoanMoi`) VALUES ('3', 'Nguyễn Văn D', '215439035', '0965299823', 'nvd@gmail.com', 'nguyenvand', 'nguyenvand','false');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`, `laTaiKhoanMoi`) VALUES ('4', 'Nguyễn Văn E', '215439036', '0965299824', 'nve@gmail.com', 'nguyenvane', 'nguyenvane','false');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`, `laTaiKhoanMoi`) VALUES ('5', 'Nguyễn Văn F', '215439037', '0965299825', 'nvf@gmail.com', 'nguyenvanf', 'nguyenvanf','false');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`, `laTaiKhoanMoi`) VALUES ('6', 'Nguyễn Văn G', '215439038', '0965299826', 'nvg@gmail.com', 'nguyenvang', 'nguyenvang','false');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`, `laTaiKhoanMoi`) VALUES ('7', 'Nguyễn Văn H', '215439039', '0965299827', 'nvh@gmail.com', 'nguyenvanh', 'nguyenvanh','false');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`, `laTaiKhoanMoi`) VALUES ('8', 'Nguyễn Văn I', '215439030', '0965299828', 'nvi@gmail.com', 'nguyenvani', 'nguyenvani','false');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`, `laTaiKhoanMoi`) VALUES ('9', 'Nguyễn Văn J', '215439040', '0965299829', 'nvj@gmail.com', 'nguyenvanj', 'nguyenvanj','false');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`, `laTaiKhoanMoi`) VALUES ('10', 'Nguyễn Văn K', '215439041', '0965299830', 'nvk@gmail.com', 'nguyenvank', 'nguyenvank','false');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`, `laTaiKhoanMoi`) VALUES ('11', 'Chú Bảy', '215439040', '0965299829', 'cr7@gmail.com', 'chubay', 'chubay','true');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`, `laTaiKhoanMoi`) VALUES ('12', 'Chú Tám', '215439041', '0965299830', 'cr8@gmail.com', 'chutam', 'chutam','true');


-- insert ChuKho
INSERT INTO `khohangcuaban`.`ChuKhoHang` (`maNguoiDung`) VALUES ('0');
INSERT INTO `khohangcuaban`.`ChuKhoHang` (`maNguoiDung`) VALUES ('1');
INSERT INTO `khohangcuaban`.`ChuKhoHang` (`maNguoiDung`) VALUES ('2');

-- insert NhanVien
INSERT INTO `khohangcuaban`.`NhanVien` (`maNhanVien`, `maNguoiDung`) VALUES ('nv-0', '3');
INSERT INTO `khohangcuaban`.`NhanVien` (`maNhanVien`, `maNguoiDung`) VALUES ('nv-1', '4');
INSERT INTO `khohangcuaban`.`NhanVien` (`maNhanVien`, `maNguoiDung`) VALUES ('nv-2', '5');
INSERT INTO `khohangcuaban`.`NhanVien` (`maNhanVien`, `maNguoiDung`) VALUES ('nv-3', '6');
INSERT INTO `khohangcuaban`.`NhanVien` (`maNhanVien`, `maNguoiDung`) VALUES ('nv-4', '7');
INSERT INTO `khohangcuaban`.`NhanVien` (`maNhanVien`, `maNguoiDung`) VALUES ('nv-5', '8');
INSERT INTO `khohangcuaban`.`NhanVien` (`maNhanVien`, `maNguoiDung`) VALUES ('nv-6', '9');
INSERT INTO `khohangcuaban`.`NhanVien` (`maNhanVien`, `maNguoiDung`) VALUES ('nv-7', '10');
INSERT INTO `khohangcuaban`.`NhanVien` (`maNhanVien`, `maNguoiDung`) VALUES ('nv-8', '11');
INSERT INTO `khohangcuaban`.`NhanVien` (`maNhanVien`, `maNguoiDung`) VALUES ('nv-9', '12');


-- insert QuanLy
INSERT INTO `khohangcuaban`.`QuanLy` (`maNhanVien`, `maChuKhoHang`) VALUES ('nv-0', '0');
INSERT INTO `khohangcuaban`.`QuanLy` (`maNhanVien`, `maChuKhoHang`) VALUES ('nv-1', '1');

-- insert KhoHang
INSERT INTO `khohangcuaban`.`KhoHang` (`maKhoHang`, `tenKhoHang`, `diaChi`, `chuKho`, `quanLy`,`moTa`) VALUES ('0', 'Kho chị chủ', 'Bình Thạnh', '0', 'nv-0', 'Kho này là kho của chị chủ');
INSERT INTO `khohangcuaban`.`KhoHang` (`maKhoHang`, `tenKhoHang`, `diaChi`, `chuKho`, `quanLy`,`moTa`) VALUES ('1', 'Kho anh Bảy', 'Quận 1', '1', 'nv-1', 'Kho này là kho của anh Bảy');
-- người dùng 3 chưa có kho

-- insert NhanVienKho
INSERT INTO `khohangcuaban`.`NhanVienKho` (`maNhanVien`, `maQuanLy`, `maKhoHang`) VALUES ('nv-2', 'nv-1', '1');
INSERT INTO `khohangcuaban`.`NhanVienKho` (`maNhanVien`, `maQuanLy`, `maKhoHang`) VALUES ('nv-3', 'nv-1', '1');
INSERT INTO `khohangcuaban`.`NhanVienKho` (`maNhanVien`, `maQuanLy`, `maKhoHang`) VALUES ('nv-4', 'nv-1', '1');
INSERT INTO `khohangcuaban`.`NhanVienKho` (`maNhanVien`, `maQuanLy`, `maKhoHang`) VALUES ('nv-5', 'nv-0', '0');
INSERT INTO `khohangcuaban`.`NhanVienKho` (`maNhanVien`, `maQuanLy`, `maKhoHang`) VALUES ('nv-6', 'nv-0', '0');
INSERT INTO `khohangcuaban`.`NhanVienKho` (`maNhanVien`, `maQuanLy`, `maKhoHang`) VALUES ('nv-7', 'nv-0', '0');


-- insert HangHoa
INSERT INTO `khohangcuaban`.`HangHoa` (`maHangHoa`, `tenHangHoa`, `maKhoHang`, `soLuong`, `ngayNhap`, `ngayHetHan`, `donGia`, `donVi`, `trangThai`) VALUES ('0', 'Mì Kokomi', '0', '30', '2018-3-15', '2019-3-15', '5000', 'Gói', 'Chờ nhập');
INSERT INTO `khohangcuaban`.`HangHoa` (`maHangHoa`, `tenHangHoa`, `maKhoHang`, `soLuong`, `ngayNhap`, `ngayHetHan`, `donGia`, `donVi`, `trangThai`) VALUES ('1', 'Mì Hảo Hảo', '0', '30', '2018-3-15', '2019-3-15', '5000', 'Gói', 'Chờ nhập');
INSERT INTO `khohangcuaban`.`HangHoa` (`maHangHoa`, `tenHangHoa`, `maKhoHang`, `soLuong`, `ngayNhap`, `ngayHetHan`, `donGia`, `donVi`, `trangThai`) VALUES ('2', 'Mì Lẩu Thái', '0', '100', '2018-3-15', '2019-3-15', '5000', 'Gói', 'Đã nhập');
INSERT INTO `khohangcuaban`.`HangHoa` (`maHangHoa`, `tenHangHoa`, `maKhoHang`, `soLuong`, `ngayNhap`, `ngayHetHan`, `donGia`, `donVi`, `trangThai`) VALUES ('3', 'Mì Gấu Đỏ', '0', '100', '2018-3-15', '2019-3-15', '5000', 'Gói', 'Đã nhập');
INSERT INTO `khohangcuaban`.`HangHoa` (`maHangHoa`, `tenHangHoa`, `maKhoHang`, `soLuong`, `ngayNhap`, `ngayHetHan`, `donGia`, `donVi`, `trangThai`) VALUES ('4', 'Mì Kokomi', '0', '100', '2018-3-15', '2019-3-15', '5000', 'Gói', 'Đã nhập');
INSERT INTO `khohangcuaban`.`HangHoa` (`maHangHoa`, `tenHangHoa`, `maKhoHang`, `soLuong`, `ngayNhap`, `ngayHetHan`, `donGia`, `donVi`, `trangThai`) VALUES ('5', 'Mì Hảo Hảo', '0', '100', '2018-3-15', '2019-3-15', '5000', 'Gói', 'Đã nhập');
INSERT INTO `khohangcuaban`.`HangHoa` (`maHangHoa`, `tenHangHoa`, `maKhoHang`, `soLuong`, `ngayNhap`, `ngayHetHan`, `donGia`, `donVi`, `trangThai`) VALUES ('6', 'Mì Lẩu Thái', '0', '30', '2018-3-15', '2019-3-15', '5000', 'Gói', 'Chờ xuất');
INSERT INTO `khohangcuaban`.`HangHoa` (`maHangHoa`, `tenHangHoa`, `maKhoHang`, `soLuong`, `ngayNhap`, `ngayHetHan`, `donGia`, `donVi`, `trangThai`) VALUES ('7', 'Mì Gấu Đỏ', '0', '30', '2018-3-15', '2019-3-15', '5000', 'Gói', 'Đã xuất');

-- insert DonHang
INSERT INTO `khohangcuaban`.`DonHang` (`maDonHang`, `maKhoHang`, `ngayLapDon`, `nguoiLapDon`, `trangThai`) VALUES ('0', '0', '2018-5-15', 'nv-0', 'Chưa hoàn thành');
INSERT INTO `khohangcuaban`.`DonHang` (`maDonHang`, `maKhoHang`, `ngayLapDon`, `nguoiLapDon`, `trangThai`) VALUES ('1', '0', '2018-3-10', 'nv-0', 'Đã hoàn thành');
INSERT INTO `khohangcuaban`.`DonHang` (`maDonHang`, `maKhoHang`, `ngayLapDon`, `nguoiLapDon`, `trangThai`) VALUES ('2', '0', '2018-5-20', 'nv-0', 'Chưa hoàn thành');
INSERT INTO `khohangcuaban`.`DonHang` (`maDonHang`, `maKhoHang`, `ngayLapDon`, `nguoiLapDon`, `trangThai`) VALUES ('3', '0', '2018-5-20', 'nv-0', 'Đã hoàn thành');

-- insert DonNhap
INSERT INTO `khohangcuaban`.`DonNhap` (`maDonHang`, `ngayNhap`) VALUES ('0', '2018-3-15');
INSERT INTO `khohangcuaban`.`DonNhap` (`maDonHang`, `ngayNhap`) VALUES ('1', '2018-3-15');

-- insert DonXuat
INSERT INTO `khohangcuaban`.`DonXuat` (`maDonHang`, `ngayXuat`) VALUES ('2', '2018-5-25');
INSERT INTO `khohangcuaban`.`DonXuat` (`maDonHang`, `ngayXuat`) VALUES ('3', '2018-5-25');

-- insert ChiTietDonNhap
INSERT INTO `khohangcuaban`.`ChiTietDonNhap` (`maDonHang`, `maHangHoa`, `soLuong`) VALUES ('0', '0', '30');
INSERT INTO `khohangcuaban`.`ChiTietDonNhap` (`maDonHang`, `maHangHoa`, `soLuong`) VALUES ('0', '1', '30');
INSERT INTO `khohangcuaban`.`ChiTietDonNhap` (`maDonHang`, `maHangHoa`, `soLuong`) VALUES ('1', '2', '100');
INSERT INTO `khohangcuaban`.`ChiTietDonNhap` (`maDonHang`, `maHangHoa`, `soLuong`) VALUES ('1', '3', '100');
INSERT INTO `khohangcuaban`.`ChiTietDonNhap` (`maDonHang`, `maHangHoa`, `soLuong`) VALUES ('1', '4', '100');
INSERT INTO `khohangcuaban`.`ChiTietDonNhap` (`maDonHang`, `maHangHoa`, `soLuong`) VALUES ('1', '5', '100');

-- insert ChiTietDonXuat
INSERT INTO `khohangcuaban`.`ChiTietDonXuat` (`maDonHang`, `maHangHoa`, `soLuong`) VALUES ('2', '6', '30');
INSERT INTO `khohangcuaban`.`ChiTietDonXuat` (`maDonHang`, `maHangHoa`, `soLuong`) VALUES ('3', '7', '30');








