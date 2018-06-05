CREATE DATABASE khohangcuaban;

-- tuy chay database nao ma se sua USE db nao

USE khohangcuaban;

CREATE TABLE NguoiDung (
	maNguoiDung VARCHAR(10),
    hoTen TEXT,
    cmnd TEXT,
    sdt TEXT,
    email TEXT,
    tenTaiKhoan TEXT,
    matKhau TEXT,
    laTaiKhoanMoi TEXT,
    PRIMARY KEY(maNguoiDung)
);

CREATE TABLE ChuKhoHang (
	maNguoiDung VARCHAR(10),
    PRIMARY KEY(maNguoiDung),
    FOREIGN KEY (maNguoiDung) REFERENCES NguoiDung(maNguoiDung)
);

CREATE TABLE NhanVien (
	maNhanVien VARCHAR(10),
    maNguoiDung VARCHAR(10),
    PRIMARY KEY (maNhanVien),
    FOREIGN KEY (maNguoiDung) REFERENCES NguoiDung(maNguoiDung)
);

CREATE TABLE QuanLy (
	maNhanVien VARCHAR(10),
    maChuKhoHang VARCHAR(10),
    PRIMARY KEY (maNhanVien),
    FOREIGN KEY (maNhanVien) REFERENCES NhanVien(maNhanVien),
    FOREIGN KEY (maChuKhoHang) REFERENCES ChuKhoHang(maNguoiDung)
);

CREATE TABLE KhoHang (
		maKhoHang VARCHAR(10),
        tenKhoHang TEXT,
        diaChi TEXT,
        chuKho VARCHAR(10),
        quanLy VARCHAR(10),
        moTa TEXT,
        PRIMARY KEY (maKhoHang),
        FOREIGN KEY (chuKho) REFERENCES ChuKhoHang(maNguoiDung),
        FOREIGN KEY (quanLy) REFERENCES QuanLy(maNhanVien)
);



CREATE TABLE NhanVienKho (
	maNhanVien VARCHAR(10),
    maQuanLy VARCHAR(10),
    maKhoHang VARCHAR(10),
    PRIMARY KEY(maNhanVien),
    FOREIGN KEY(maNhanVien)  REFERENCES NhanVien(maNhanVien),
    FOREIGN KEY(maQuanLy) REFERENCES QuanLy(maNhanVien),
    FOREIGN KEY (maKhoHang) REFERENCES KhoHang(maKhoHang)
);

CREATE TABLE DonHang(
	maDonHang VARCHAR(10),
    maKhoHang VARCHAR(10),
    ngayLapDon DATE,
    nguoiLapDon VARCHAR(10),
    trangThai TEXT,
    PRIMARY KEY (maDonHang),
    FOREIGN KEY (maKhoHang) REFERENCES KhoHang(maKhoHang),
	FOREIGN KEY (nguoiLapDon) REFERENCES QuanLy(maNhanVien)
);

CREATE TABLE DonNhap(
	maDonHang VARCHAR(10),
    ngayNhap DATE,
    PRIMARY KEY (maDonHang),
    FOREIGN KEY (maDonHang) REFERENCES DonHang(maDonHang)
);

CREATE TABLE DonXuat(
	maDonHang VARCHAR(10),
    ngayXuat DATE,
    PRIMARY KEY (maDonHang),
    FOREIGN KEY (maDonHang) REFERENCES DonHang(maDonHang)
);

-- tao bang hang hoa
CREATE TABLE HangHoa(
	maHangHoa VARCHAR(10),
    tenHangHoa TEXT,
    maKhoHang VARCHAR(10),
    soLuong INT unsigned,
    ngayNhap DATE,
    ngayHetHan DATE,
    donGia INT,
    donVi TEXT,
    ghiChu TEXT,
    trangThai TEXT,
    PRIMARY KEY(maHangHoa),
    FOREIGN KEY (maKhoHang) REFERENCES KhoHang(maKhoHang)
);

CREATE TABLE ChiTietDonNhap(
	maDonHang VARCHAR(10),
    maHangHoa VARCHAR(10),
    soLuong INT,
    PRIMARY KEY(maDonHang, maHangHoa),
    FOREIGN KEY (maDonHang) REFERENCES DonNhap(maDonHang),
    FOREIGN KEY (maHangHoa) REFERENCES HangHoa(maHangHoa)
);

CREATE TABLE ChiTietDonXuat(
	maDonHang VARCHAR(10),
    maHangHoa VARCHAR(10),
    soLuong TEXT,
    PRIMARY KEY(maDonHang, maHangHoa),
    FOREIGN KEY (maDonHang) REFERENCES DonXuat(maDonHang),
    FOREIGN KEY (maHangHoa) REFERENCES HangHoa(maHangHoa)
)