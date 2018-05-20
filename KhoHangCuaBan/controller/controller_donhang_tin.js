const trangThaiDonHang = {
    ChuaHoanThanh: 'Chưa hoàn thành',
    DaHoanThanh: 'Đã hoàn thành'
}

module.exports.getDonHangNhap = (req, res, next) => {
    res.render('donhangnhap',{donHangNhap: true});
}