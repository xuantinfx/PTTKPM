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
CREATE PROCEDURE layDsMatHangDaNhap()
	BEGIN
		SELECT * FROM HangHoa
        WHERE trangThai = 'Đã nhâp';
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

CALL updateSoLuongHangHoa('2', -10);

                      