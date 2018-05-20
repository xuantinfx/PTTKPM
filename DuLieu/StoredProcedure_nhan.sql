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

-- xemDsDonHangXuat
DELIMITER //
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
CREATE PROCEDURE xemKhoTheoIdChu(IN ma_Chu_Kho VARCHAR(10))
	BEGIN
		SELECT * FROM KhoHang WHERE chuKho = ma_Chu_Kho;
	END //
DELIMITER ;
                      