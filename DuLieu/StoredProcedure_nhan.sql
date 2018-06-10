-- xemDsDonHangXuat
/*DELIMITER //
CREATE PROCEDURE xemDsDonHangXuat(IN ma_Kho VARCHAR(10))
	BEGIN
		SELECT	DonHang.maDonHang, DonHang.ngayLapDon, DonHang.trangThai, DonNhap.ngayNhap, 
				HangHoa.tenHangHoa, HangHoa.soLuong, HangHoa.donGia, HangHoa.donVi,
				NguoiDung.hoTen
		FROM DonHang JOIN DonNhap ON DonHang.maDonHang = DonNhap.maDonHang 
					  JOIN ChiTietDonNhap ON DonNhap.maDonHang = ChiTietDonNhap.maDonHang
                      JOIN HangHoa ON HangHoa.maHangHoa = ChiTietDonNhap.maHangHoa
                      JOIN QuanLy ON QuanLy.maNhanVien = DonHang.nguoiLapDon
                      JOIN NhanVien ON NhanVien.maNhanVien = QuanLy.maNhanVien
                      JOIN NguoiDung ON NguoiDung.maNguoiDung = NhanVien.maNguoiDung
		WHERE DonHang.maKhoHang = '0';
    END//
DELIMITER ;*/
USE khohangcuaban;
-- xemDsDonHangXuat
DELIMITER //
DROP PROCEDURE IF EXISTS `xemDsDonHangXuat` //
CREATE PROCEDURE xemDsDonHangXuat(IN ma_Kho VARCHAR(10))
	BEGIN
		SELECT	DonHang.maDonHang, DonHang.ngayLapDon, DonHang.trangThai, DonXuat.ngayXuat, 
				NguoiDung.hoTen
		FROM DonHang JOIN DonXuat ON DonHang.maDonHang = DonXuat.maDonHang 
                      JOIN QuanLy ON QuanLy.maNhanVien = DonHang.nguoiLapDon
                      JOIN NhanVien ON NhanVien.maNhanVien = QuanLy.maNhanVien
                      JOIN NguoiDung ON NguoiDung.maNguoiDung = NhanVien.maNguoiDung
		WHERE DonHang.maKhoHang = ma_Kho;
    END//
DELIMITER ;
	
-- xemChiTietDonHangXuat
DELIMITER //
DROP PROCEDURE IF EXISTS `xemChiTietDonHangXuat` //
CREATE PROCEDURE xemChiTietDonHangXuat(IN ma_Don_Hang VARCHAR(10))
	BEGIN
		SELECT	DonHang.maDonHang, HangHoa.tenHangHoa,  HangHoa.donVi, HangHoa.soLuong, HangHoa.donGia, HangHoa.soLuong*HangHoa.donGia AS thanhTien
			FROM DonHang JOIN DonXuat ON DonHang.maDonHang = DonXuat.maDonHang 
						JOIN ChiTietDonXuat ON DonXuat.maDonHang = ChiTietDonXuat.maDonHang
						JOIN HangHoa ON HangHoa.maHangHoa = ChiTietDonXuat.maHangHoa
			WHERE DonHang.maDonHang = ma_Don_Hang;
	END //
DELIMITER ;
-- CALL xemChiTietDonHangXuat('3');

-- xemKhoTheoIdChu
DELIMITER //
DROP PROCEDURE IF EXISTS `xemKhoTheoIdChu` //
CREATE PROCEDURE xemKhoTheoIdChu(IN ma_Chu_Kho VARCHAR(10))
	BEGIN
		SELECT * FROM KhoHang WHERE chuKho = ma_Chu_Kho;
	END //
DELIMITER ;

-- layNguoiDungTheoMaNguoiDung
DELIMITER //
DROP PROCEDURE IF EXISTS `layNguoiDungTheoMaNguoiDung` //
CREATE PROCEDURE layNguoiDungTheoMaNguoiDung(IN username TEXT)
	BEGIN
		SELECT maNguoiDung, hoTen, email, tenTaiKhoan, matKhau 
        FROM NguoiDung WHERE tenTaiKhoan = username;
	END //
DELIMITER ;

-- kiểm tra người dùng có là chủ kho
DELIMITER //
DROP PROCEDURE IF EXISTS `laChuKho` //
CREATE PROCEDURE laChuKho(IN username TEXT)
	BEGIN
		SELECT ChuKhoHang.maNguoiDung 
		FROM NguoiDung JOIN ChuKhoHang ON ChuKhoHang.maNguoiDung = NguoiDung.maNguoiDung
		WHERE NguoiDung.tenTaiKhoan = username;
	END //
DELIMITER ;

-- kiểm tra người dùng có là quản lí
DELIMITER //
DROP PROCEDURE IF EXISTS `laQuanLy` //
CREATE PROCEDURE laQuanLy(IN username TEXT)
	BEGIN
		SELECT QuanLy.maNhanVien 
		FROM NguoiDung JOIN NhanVien ON NguoiDung.maNguoiDung = NhanVien.maNguoiDung
						JOIN QuanLy ON QuanLy.maNhanVien = NhanVien.maNhanVien
		WHERE NguoiDung.tenTaiKhoan = username;
	END //
DELIMITER ;


-- kiểm tra người dùng có là nhân viên kho
DELIMITER //
DROP PROCEDURE IF EXISTS `laNhanVienKho` //
CREATE PROCEDURE laNhanVienKho(IN username TEXT)
	BEGIN
		SELECT NhanVienKho.maNhanVien 
		FROM NguoiDung JOIN NhanVien ON NguoiDung.maNguoiDung = NhanVien.maNguoiDung
						JOIN NhanVienKho ON NhanVienKho.maNhanVien = NhanVien.maNhanVien
		WHERE NguoiDung.tenTaiKhoan = username;
	END //
DELIMITER ;

-- lấy ds mã kho theo mã chủ kho
DELIMITER //
DROP PROCEDURE IF EXISTS `layDsMaKhoTheoMaChuKho` //
CREATE PROCEDURE layDsMaKhoTheoMaChuKho(IN ma_Chu_Kho TEXT)
	BEGIN
		SELECT maKhoHang FROM KhoHang WHERE chuKho = ma_Chu_Kho;
	END //
DELIMITER ;

-- lấy ds mã kho theo mã quản lý
DELIMITER //
DROP PROCEDURE IF EXISTS `layDsMaKhoTheoMaQuanLy` //
CREATE PROCEDURE layDsMaKhoTheoMaQuanLy(IN ma_Quan_Ly TEXT)
	BEGIN
		SELECT maKhoHang FROM KhoHang WHERE quanLy = ma_Quan_Ly;
	END //
DELIMITER ;

-- lay mã kho theo mã nhân viên kho
DELIMITER //
DROP PROCEDURE IF EXISTS `layMaKhoTheoMaNhanVienKho` //
CREATE PROCEDURE layMaKhoTheoMaNhanVienKho(IN ma_Nhan_Vien TEXT)
	BEGIN
		SELECT maKhoHang FROM NhanVienKho
        WHERE maNhanVien = ma_Nhan_Vien;
	END //
DELIMITER ;

-- lấy danh sách mặt hàng đã nhập
DELIMITER //
DROP PROCEDURE IF EXISTS `layDsMatHangDaNhap` //
CREATE PROCEDURE layDsMatHangDaNhap(IN ma_Kho VARCHAR(10))
	BEGIN
		SELECT * FROM HangHoa
        WHERE trangThai = 'Đã nhâp' AND maKhoHang = ma_Kho AND (soLuong > 0);
	END //
DELIMITER ;

-- update số lượng hàng hóa
DELIMITER //
DROP PROCEDURE IF EXISTS `updateSoLuongHangHoa` //
CREATE PROCEDURE updateSoLuongHangHoa(IN ma_hang_hoa VARCHAR(10), IN so_luong INT)
	BEGIN
		UPDATE HangHoa SET soLuong = soLuong + so_luong WHERE maHangHoa = ma_hang_hoa;
	END //
DELIMITER ;

-- insert hàng hóa chờ xuất, clone từ 1 hàng hóa đã nhập
DELIMITER //
DROP PROCEDURE IF EXISTS `insertHangHoaChoXuat` //
CREATE PROCEDURE insertHangHoaChoXuat(IN ma_hang_hoa_cho_nhap VARCHAR(10), IN so_luong_nhap INT)
	BEGIN
		SET @maHangHoa = cast((SELECT max(cast(maHangHoa AS unsigned)) + 1 FROM HangHoa) AS CHAR(10));
        SET @tenHangHoa = NULL;
        SET @maKhoHang = NULL;
        SET @soLuong = so_luong_nhap;
        SET @ngayNhap = NULL;
        SET @ngayHetHan = NULL;
        SET @donGia = NULL;
        SET @donVi = NULL;
        SET @ghiChu = NULL;
        SET @trangThai = 'Chờ xuất';
		
        SELECT tenHangHoa, maKhoHang, ngayNhap, ngayHetHan, donGia, donVi, ghiChu
		INTO @tenHangHoa,  @maKhoHang, @ngayNhap, @ngayHetHan, @donGia, @donVi, @ghiChu
        FROM HangHoa WHERE maHangHoa = ma_hang_hoa_cho_nhap;
        
        INSERT INTO `khohangcuaban`.`HangHoa`
        (`maHangHoa`, `tenHangHoa`, `maKhoHang`, `soLuong`, `ngayNhap`, `ngayHetHan`, `donGia`, `donVi`, `ghiChu`, `trangThai`) 
        VALUES (@maHangHoa, @tenHangHoa, @maKhoHang, @soLuong, @ngayNhap, @ngayHetHan, @donGia, @donVi, @ghiChu, @trangThai);

		-- trả về @maHangHoa
        SELECT @maHangHoa;
	END //
DELIMITER ;
-- CALL insertHangHoaChoXuat('1', 10);

-- insert đơn hàng mới
DELIMITER //
DROP PROCEDURE IF EXISTS `insertDonHangMoi` //
CREATE PROCEDURE insertDonHangMoi(IN ma_Kho_hang VARCHAR(10), IN ngay_Lap_Don DATE, IN nguoi_Lap_Don VARCHAR(10), IN trang_Thai TEXT)
	BEGIN
		SET @maDonHang = cast((SELECT max(cast(maDonHang AS unsigned)) + 1 FROM DonHang) AS CHAR(10));
        
        INSERT INTO `khohangcuaban`.`DonHang` (`maDonHang`, `maKhoHang`, `ngayLapDon`, `nguoiLapDon`, `trangThai`) 
        VALUES (@maDonHang, ma_Kho_hang, ngay_Lap_Don, nguoi_Lap_Don, trang_Thai);
        
        -- trả về mã đơn hàng mới
        SELECT @maDonHang;
	END //
DELIMITER ;
-- CALL insertDonHangMoi('0', '2018-06-04', 'nv-0', 'Ố là la');

-- insert đơn hàng xuất mới
DELIMITER //
DROP PROCEDURE IF EXISTS `insertDonHangXuatMoi` //
CREATE PROCEDURE insertDonHangXuatMoi(IN ma_Don_Hang VARCHAR(10), IN ngay_Xuat DATE)
	BEGIN
		INSERT INTO `khohangcuaban`.`DonXuat` (`maDonHang`, `ngayXuat`) VALUES (ma_Don_Hang, ngay_Xuat);
	END //
DELIMITER ;
-- CALL insertDonHangXuatMoi('5', '2018-6-5');

-- insert chi tiết đơn hàng xuất
DELIMITER //
DROP PROCEDURE IF EXISTS `insertChiTietDonHangXuat` //
CREATE PROCEDURE insertChiTietDonHangXuat(IN ma_Don_Hang VARCHAR(10), IN ma_Hang_Hoa VARCHAR(10), IN so_Luong INT)
	BEGIN
		INSERT INTO `khohangcuaban`.`ChiTietDonXuat` (`maDonHang`, `maHangHoa`, `soLuong`) VALUES (ma_Don_Hang, ma_Hang_Hoa, so_Luong);
	END //
DELIMITER ;
-- call insertChiTietDonHangXuat('5', '11', '10');

-- insert hàng hóa chờ nhập
DELIMITER //
DROP PROCEDURE IF EXISTS `insertHangHoaChoNhap` //
CREATE PROCEDURE insertHangHoaChoNhap(IN ten_Hang_hoa TEXT, IN ma_Kho_hang VARCHAR(10), IN so_Luong INT, IN ngay_Nhap DATE, IN ngay_Het_han DATE, IN don_Gia INT, IN don_Vi TEXT)
	BEGIN
		SET @maHangHoa = cast((SELECT max(cast(maHangHoa AS unsigned)) + 1 FROM HangHoa) AS CHAR(10));
        SET @trangThai = 'Chờ xuất';
        
        INSERT INTO `khohangcuaban`.`HangHoa`
        (`maHangHoa`, `tenHangHoa`, `maKhoHang`, `soLuong`, `ngayNhap`, `ngayHetHan`, `donGia`, `donVi`, `trangThai`) 
        VALUES (@maHangHoa, ten_Hang_hoa, ma_Kho_hang, so_Luong, ngay_Nhap, ngay_Het_han, don_Gia, don_Vi, @trangThai);

		-- trả về @maHangHoa
        SELECT @maHangHoa;
	END //
DELIMITER ;

-- insert đơn hàng nhập mới
DELIMITER //
DROP PROCEDURE IF EXISTS `insertDonHangNhapMoi` //
CREATE PROCEDURE insertDonHangNhapMoi(IN ma_Don_Hang VARCHAR(10), IN ngay_Nhap DATE)
	BEGIN
		INSERT INTO `khohangcuaban`.`DonNhap` (`maDonHang`, `ngayNhap`) VALUES (ma_Don_Hang, ngay_Nhap);
	END //
DELIMITER ;


-- insert chi tiết đơn hàng nhập
DELIMITER //
DROP PROCEDURE IF EXISTS `insertChiTietDonHangNhap` //
CREATE PROCEDURE insertChiTietDonHangNhap(IN ma_Don_Hang VARCHAR(10), IN ma_Hang_Hoa VARCHAR(10), IN so_Luong INT)
	BEGIN
		INSERT INTO `khohangcuaban`.`ChiTietDonNhap` (`maDonHang`, `maHangHoa`, `soLuong`) VALUES (ma_Don_Hang, ma_Hang_Hoa, so_Luong);
	END //
DELIMITER ;

                      