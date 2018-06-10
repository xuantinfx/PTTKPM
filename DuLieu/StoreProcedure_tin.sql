-- lich nhap hang

DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_lichNhapHang` $$
CREATE PROCEDURE `sp_lichNhapHang`(
  IN maKho VARCHAR(10)
)
BEGIN

	SELECT *
	FROM DonNhap JOIN DonHang ON DonNhap.maDonHang = DonHang.maDonHang
								JOIN ChiTietDonNhap ON ChiTietDonNhap.maDonHang = DonNhap.maDonHang
                                JOIN HangHoa ON HangHoa.maHangHoa = ChiTietDonNhap.maHangHoa
    where DonHang.maKhoHang = maKho;

END $$

DELIMITER ;

-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------

-- lich xuat hang

DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_lichXuatHang` $$
CREATE PROCEDURE `sp_lichXuatHang`(
  IN maKho VARCHAR(10)
)
BEGIN

	SELECT *
	FROM DonXuat JOIN DonHang ON DonXuat.maDonHang = DonHang.maDonHang
								JOIN ChiTietDonXuat ON ChiTietDonXuat.maDonHang = DonXuat.maDonHang
                                JOIN HangHoa ON HangHoa.maHangHoa = ChiTietDonXuat.maHangHoa
    where DonHang.maKhoHang = maKho;

END $$

DELIMITER ;

-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------

-- lay don nhap cua kho

DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_getDonNhapCuaKho` $$
CREATE PROCEDURE `sp_getDonNhapCuaKho`(
  IN maKho VARCHAR(10)
)
BEGIN

	SELECT *
	FROM DonNhap JOIN DonHang ON DonNhap.maDonHang = DonHang.maDonHang
								JOIN ChiTietDonNhap ON ChiTietDonNhap.maDonHang = DonNhap.maDonHang
                                JOIN HangHoa ON HangHoa.maHangHoa = ChiTietDonNhap.maHangHoa
                                 JOIN NhanVien ON DonHang.nguoiLapDon = NhanVien.maNhanVien
                                JOIN NguoiDung ON NhanVien.maNguoiDung = NguoiDung.maNguoiDung
    where DonHang.maKhoHang = maKho;

END $$

DELIMITER ;

-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------

-- lay don nhap theo ma don
DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_getDonNhap` $$
CREATE PROCEDURE `sp_getDonNhap`(
  IN maDonNhap VARCHAR(10)
)
BEGIN

	SELECT *
	FROM DonNhap JOIN DonHang ON DonNhap.maDonHang = DonHang.maDonHang
								JOIN ChiTietDonNhap ON ChiTietDonNhap.maDonHang = DonNhap.maDonHang
                                JOIN HangHoa ON HangHoa.maHangHoa = ChiTietDonNhap.maHangHoa
                                JOIN NhanVien ON DonHang.nguoiLapDon = NhanVien.maNhanVien
                                JOIN NguoiDung ON NhanVien.maNguoiDung = NguoiDung.maNguoiDung
    where DonHang.maDonHang = maDonNhap;

END $$

DELIMITER ;

-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------

-- lay don nhap theo ma don
DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_getDonXuat` $$
CREATE PROCEDURE `sp_getDonXuat`(
  IN maDonXuat VARCHAR(10)
)
BEGIN

	SELECT *
	FROM DonXuat JOIN DonHang ON DonXuat.maDonHang = DonHang.maDonHang
								JOIN ChiTietDonXuat ON ChiTietDonXuat.maDonHang = DonXuat.maDonHang
                                JOIN HangHoa ON HangHoa.maHangHoa = ChiTietDonXuat.maHangHoa
                                JOIN NhanVien ON DonHang.nguoiLapDon = NhanVien.maNhanVien
                                JOIN NguoiDung ON NhanVien.maNguoiDung = NguoiDung.maNguoiDung
    where DonHang.maDonHang = maDonXuat;

END $$

DELIMITER ;

-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------

-- lay thong tin cac chu kho

DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_chuKho` $$
CREATE PROCEDURE `sp_chuKho`()
BEGIN

	SELECT *
	FROM ChuKhoHang;

END $$

DELIMITER ;

-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------

-- lay thong tin cac quan ly

DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_quanLy` $$
CREATE PROCEDURE `sp_quanLy`()
BEGIN

	SELECT *
	FROM QuanLy;

END $$

DELIMITER ;

-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------

-- lay thong tin cac nhan vien kho

DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_nhanVienKho` $$
CREATE PROCEDURE `sp_nhanVienKho`(
	IN maNV VARCHAR(10)
)
BEGIN

	SELECT *
	FROM NhanVienKho
    WHERE NhanVienKho.maNhanVien = maNV;

END $$

DELIMITER ;

-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------

-- lay thong maKho ma quan ly dang lam viec

DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_quanLyLayKho` $$
CREATE PROCEDURE `sp_quanLyLayKho`(
	IN maNVQL VARCHAR(10)
)
BEGIN

	SELECT maKhoHang
	FROM KhoHang
    WHERE KhoHang.quanLy = maNVQL;

END $$

DELIMITER ;

-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------

-- lay danh sach hang hoa

DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_getHangHoa` $$
CREATE PROCEDURE `sp_getHangHoa`(
	IN maKho VARCHAR(10)
)
BEGIN

	SELECT *
	FROM HangHoa
    WHERE HangHoa.maKhoHang = maKho;

END $$

DELIMITER ;

-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------
-- lay danh sach nhan vien cua chu kho

DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_getQlChoChuKho` $$
CREATE PROCEDURE `sp_getQlChoChuKho`(
	IN maChuKho VARCHAR(10)
)
BEGIN

	SELECT * 
	FROM QuanLy JOIN NhanVien ON QuanLy.maNhanVien = NhanVien.maNhanVien
							JOIN NguoiDung ON NhanVien.maNguoiDung = NguoiDung.maNguoiDung
                            JOIN KhoHang ON KhoHang.quanLy = QuanLy.maNhanVien
    WHERE QuanLy.maChuKhoHang = maChuKho;

END $$

DELIMITER ;

-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------

-- lay danh sach nhan vien cua quan ly

DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_getNvChoQuanLy` $$
CREATE PROCEDURE `sp_getNvChoQuanLy`(
	IN maQuanLy VARCHAR(10)
)
BEGIN

	SELECT *
	FROM NhanVienKho JOIN NhanVien ON NhanVienKho.maNhanVien = NhanVien.maNhanVien
				JOIN NguoiDung ON NguoiDung.maNguoiDung = NhanVien.maNguoiDung
                JOIN KhoHang ON NhanVienKho.maKhoHang = KhoHang.maKhoHang
    WHERE NhanVienKho.maQuanLy = maQuanLy;

END $$

DELIMITER ;

-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------

-- cap nhat trang thai cua hang hoa

DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_updateSatusHangHoaNhap` $$
CREATE PROCEDURE `sp_updateSatusHangHoaNhap`(
	IN maHangHoa VARCHAR(10),
    IN trangThai TEXT,
    IN ngayHetHan DATE,
    IN ngayNhap DATE,
    IN ghiChu TEXT
)
BEGIN

	UPDATE HangHoa
    SET HangHoa.trangThai = trangThai,
        HangHoa.ngayHetHan = ngayHetHan,
        HangHoa.ngayNhap = ngayNhap,
        HangHoa.ghiChu = ghiChu
	WHERE HangHoa.maHangHoa = maHangHoa;

END $$

DELIMITER ;

-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------

-- cap nhat trang thai cua hang hoa

DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_updateSatusHangHoaXuat` $$
CREATE PROCEDURE `sp_updateSatusHangHoaXuat`(
	IN maHangHoa VARCHAR(10),
    IN trangThai TEXT,
    IN ghiChu TEXT
)
BEGIN

	UPDATE HangHoa
    SET HangHoa.trangThai = trangThai,
        HangHoa.ghiChu = ghiChu
	WHERE HangHoa.maHangHoa = maHangHoa;

END $$

DELIMITER ;

-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------


-- cap nhat trang thai cua hang hoa

DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_updateSatusDonHang` $$
CREATE PROCEDURE `sp_updateSatusDonHang`(
	IN maDonHang VARCHAR(10),
    IN trangThai TEXT
)
BEGIN

	UPDATE DonHang
    SET DonHang.trangThai = trangThai
	WHERE DonHang.maDonHang = maDonHang;

END $$

DELIMITER ;

-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------
-- kiem tra tai khoan da ton tai chua

DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_layNguoiDungBangUserName` $$
CREATE PROCEDURE `sp_layNguoiDungBangUserName`(
	IN userName TEXT
)
BEGIN
	SELECT * FROM NguoiDung WHERE NguoiDung.tenTaiKhoan = userName;
END $$

DELIMITER ;

-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------
-- ---------------------------------------------------------------------
