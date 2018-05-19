-- insert nguoidung
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`) VALUES ('0', 'Nguyễn Văn A', '215439032', '0965299820', 'nva@gmail.com', 'nguyenvana', 'nguyenvana');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`) VALUES ('1', 'Nguyễn Văn B', '215439033', '0965299821', 'nvb@gmail.com', 'nguyenvanb', 'nguyenvanb');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`) VALUES ('2', 'Nguyễn Văn C', '215439034', '0965299822', 'nvc@gmail.com', 'nguyenvanc', 'nguyenvanc');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`) VALUES ('3', 'Nguyễn Văn D', '215439035', '0965299823', 'nvd@gmail.com', 'nguyenvand', 'nguyenvand');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`) VALUES ('4', 'Nguyễn Văn E', '215439036', '0965299824', 'nve@gmail.com', 'nguyenvane', 'nguyenvane');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`) VALUES ('5', 'Nguyễn Văn F', '215439037', '0965299825', 'nvf@gmail.com', 'nguyenvanf', 'nguyenvanf');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`) VALUES ('6', 'Nguyễn Văn G', '215439038', '0965299826', 'nvg@gmail.com', 'nguyenvang', 'nguyenvang');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`) VALUES ('7', 'Nguyễn Văn H', '215439039', '0965299827', 'nvh@gmail.com', 'nguyenvanh', 'nguyenvanh');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`) VALUES ('8', 'Nguyễn Văn I', '215439030', '0965299828', 'nvi@gmail.com', 'nguyenvani', 'nguyenvani');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`) VALUES ('9', 'Nguyễn Văn J', '215439040', '0965299829', 'nvj@gmail.com', 'nguyenvanj', 'nguyenvanj');
INSERT INTO `khohangcuaban`.`NguoiDung` (`maNguoiDung`, `hoTen`, `cmnd`, `sdt`, `email`, `tenTaiKhoan`, `matKhau`) VALUES ('10', 'Nguyễn Văn K', '215439041', '0965299830', 'nvk@gmail.com', 'nguyenvank', 'nguyenvank');


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

-- insert QuanLy
INSERT INTO `khohangcuaban`.`QuanLy` (`maNhanVien`, `maChuKhoHang`) VALUES ('nv-0', '0');
INSERT INTO `khohangcuaban`.`QuanLy` (`maNhanVien`, `maChuKhoHang`) VALUES ('nv-1', '1');

-- insert NhanVienKho
INSERT INTO `khohangcuaban`.`NhanVienKho` (`maNhanVien`, `maQuanLy`) VALUES ('nv-2', 'nv-1');
INSERT INTO `khohangcuaban`.`NhanVienKho` (`maNhanVien`, `maQuanLy`) VALUES ('nv-3', 'nv-1');
INSERT INTO `khohangcuaban`.`NhanVienKho` (`maNhanVien`, `maQuanLy`) VALUES ('nv-4', 'nv-1');
INSERT INTO `khohangcuaban`.`NhanVienKho` (`maNhanVien`, `maQuanLy`) VALUES ('nv-5', 'nv-0');
INSERT INTO `khohangcuaban`.`NhanVienKho` (`maNhanVien`, `maQuanLy`) VALUES ('nv-6', 'nv-0');
INSERT INTO `khohangcuaban`.`NhanVienKho` (`maNhanVien`, `maQuanLy`) VALUES ('nv-7', 'nv-0');

-- insert KhoHang
INSERT INTO `khohangcuaban`.`KhoHang` (`maKhoHang`, `tenKhoHang`, `diaChi`, `chuKho`, `quanLy`) VALUES ('0', 'Kho chị chủ', 'Bình Thạnh', '0', 'nv-0');
INSERT INTO `khohangcuaban`.`KhoHang` (`maKhoHang`, `tenKhoHang`, `diaChi`, `chuKho`, `quanLy`) VALUES ('1', 'Kho anh Bảy', 'Quận 1', '1', 'nv-1');
-- người dùng 3 chưa có kho


-- insert LoaiHangHoa
INSERT INTO `khohangcuaban`.`LoaiHangHoa` (`maLoaiHangHoa`, `tenLoaiHangHoa`) VALUES ('0', 'Thức ăn');
INSERT INTO `khohangcuaban`.`LoaiHangHoa` (`maLoaiHangHoa`, `tenLoaiHangHoa`) VALUES ('1', 'Đồ điện tử');
INSERT INTO `khohangcuaban`.`LoaiHangHoa` (`maLoaiHangHoa`, `tenLoaiHangHoa`) VALUES ('2', 'Quần áo');
INSERT INTO `khohangcuaban`.`LoaiHangHoa` (`maLoaiHangHoa`, `tenLoaiHangHoa`) VALUES ('3', 'Đồ gia dụng');

-- insert HangHoa
INSERT INTO `khohangcuaban`.`HangHoa` (`maHangHoa`, `maLoaiHangHoa`, `maKhoHang`, `soLuong`, `ngayNhap`, `ngayHetHan`, `donGia`) VALUES ('0', '0', '0', '1', '2018-1-14', '2018-5-14', '20000');
INSERT INTO `khohangcuaban`.`HangHoa` (`maHangHoa`, `maLoaiHangHoa`, `maKhoHang`, `soLuong`, `ngayNhap`, `ngayHetHan`, `donGia`) VALUES ('1', '0', '0', '2', '2018-01-14', '2018-05-14', '20000');
INSERT INTO `khohangcuaban`.`HangHoa` (`maHangHoa`, `maLoaiHangHoa`, `maKhoHang`, `soLuong`, `ngayNhap`, `ngayHetHan`, `donGia`) VALUES ('2', '0', '0', '3', '2018-01-14', '2018-05-14', '30000');
INSERT INTO `khohangcuaban`.`HangHoa` (`maHangHoa`, `maLoaiHangHoa`, `maKhoHang`, `soLuong`, `ngayNhap`, `ngayHetHan`, `donGia`) VALUES ('3', '0', '0', '4', '2018-01-14', '2018-05-14', '40000');
INSERT INTO `khohangcuaban`.`HangHoa` (`maHangHoa`, `maLoaiHangHoa`, `maKhoHang`, `soLuong`, `ngayNhap`, `ngayHetHan`, `donGia`) VALUES ('4', '2', '1', '1', '2018-03-20', '2019-03-20', '100000');
INSERT INTO `khohangcuaban`.`HangHoa` (`maHangHoa`, `maLoaiHangHoa`, `maKhoHang`, `soLuong`, `ngayNhap`, `ngayHetHan`, `donGia`) VALUES ('5', '2', '1', '1', '2018-03-20', '2019-03-20', '100000');
INSERT INTO `khohangcuaban`.`HangHoa` (`maHangHoa`, `maLoaiHangHoa`, `maKhoHang`, `soLuong`, `ngayNhap`, `ngayHetHan`, `donGia`) VALUES ('6', '2', '1', '1', '2018-03-20', '2019-03-20', '100000');
INSERT INTO `khohangcuaban`.`HangHoa` (`maHangHoa`, `maLoaiHangHoa`, `maKhoHang`, `soLuong`, `ngayNhap`, `ngayHetHan`, `donGia`) VALUES ('7', '2', '1', '1', '2018-03-20', '2019-03-20', '100000');

-- insert DonHang
INSERT INTO `khohangcuaban`.`DonHang` (`maDonHang`, `maKhoHang`, `ngayLapDon`, `nguoiLapDon`) VALUES ('0', '0', '2018-5-19', 'nv-0');
INSERT INTO `khohangcuaban`.`DonHang` (`maDonHang`, `maKhoHang`, `ngayLapDon`, `nguoiLapDon`) VALUES ('1', '0', '2018-5-19', 'nv-0');
INSERT INTO `khohangcuaban`.`DonHang` (`maDonHang`, `maKhoHang`, `ngayLapDon`, `nguoiLapDon`) VALUES ('2', '1', '2018-5-19', 'nv-1');
INSERT INTO `khohangcuaban`.`DonHang` (`maDonHang`, `maKhoHang`, `ngayLapDon`, `nguoiLapDon`) VALUES ('3', '1', '2018-5-19', 'nv-1');

-- insert DonNhap
INSERT INTO `khohangcuaban`.`DonNhap` (`maDonHang`, `ngayNhap`) VALUES ('0', '2018-5-26');
INSERT INTO `khohangcuaban`.`DonNhap` (`maDonHang`, `ngayNhap`) VALUES ('2', '2018-5-26');

-- insert DonXuat
INSERT INTO `khohangcuaban`.`DonXuat` (`maDonHang`, `ngayXuat`) VALUES ('1', '2018-5-26');
INSERT INTO `khohangcuaban`.`DonXuat` (`maDonHang`, `ngayXuat`) VALUES ('3', '2018-5-26');

-- insert ChiTietDonNhap
INSERT INTO `khohangcuaban`.`ChiTietDonNhap` (`maDonHang`, `maHangHoa`, `soLuong`) VALUES ('0', '0', '1');
INSERT INTO `khohangcuaban`.`ChiTietDonNhap` (`maDonHang`, `maHangHoa`, `soLuong`) VALUES ('0', '1', '2');
INSERT INTO `khohangcuaban`.`ChiTietDonNhap` (`maDonHang`, `maHangHoa`, `soLuong`) VALUES ('2', '2', '1');
INSERT INTO `khohangcuaban`.`ChiTietDonNhap` (`maDonHang`, `maHangHoa`, `soLuong`) VALUES ('2', '3', '1');

-- insert ChiTietDonXuat
INSERT INTO `khohangcuaban`.`ChiTietDonXuat` (`maDonHang`, `maHangHoa`, `soLuong`) VALUES ('1', '1', '1');
INSERT INTO `khohangcuaban`.`ChiTietDonXuat` (`maDonHang`, `maHangHoa`, `soLuong`) VALUES ('1', '2', '1');
INSERT INTO `khohangcuaban`.`ChiTietDonXuat` (`maDonHang`, `maHangHoa`, `soLuong`) VALUES ('3', '3', '1');
INSERT INTO `khohangcuaban`.`ChiTietDonXuat` (`maDonHang`, `maHangHoa`, `soLuong`) VALUES ('3', '4', '1');








