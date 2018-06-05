select * from DonHang join DonXuat on DonXuat.maDonHang = DonHang.maDonHang
					join ChiTietDonXuat on DonXuat.maDonHang = ChiTietDonXuat.maDonHang
                    
                    
where DonHang.trangThai = 'Đã hoàn thành';

select * from DonHang join DonNhap on DonNhap.maDonHang = DonHang.maDonHang
					join ChiTietDonNhap on DonNhap.maDonHang = ChiTietDonNhap.maDonHang
                    
                    
where DonHang.trangThai = 'Đã hoàn thành'
order by maHangHoa desc;

select * from HangHoa;

update HangHoa set soLuong = soLuong - 31 where maHangHoa = '0';