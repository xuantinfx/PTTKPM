//xác thực người dùng đã đăng nhập hay chưa
//middleware luôn được đính kèm đầu tiên vào mỗi route
exports.daDangNhap = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    else res.redirect('/dang-nhap');
}

exports.chuaDangNhap = function (req, res, next) {
    if (!req.isAuthenticated()) return next();
    else res.redirect('/dashboard');
}

//xác thực là chủ kho, sử dụng trong các route dành riêng cho chủ kho
exports.laChuKho = function (req, res, next) {
    if (req.user.maChuKho) return next();
    else res.redirect('/dashboard');
}

//xác thực là quản lí, sử dụng trong các route dành riêng cho chủ kho/quản lí
exports.laQuanLy = function (req, res, next) {
    if (req.user.maChuKho || req.user.maQuanLy) return next();
    else res.redirect('/dashboard');
}

//xác thực là nhân viên kho, sử dụng trong các route dành riêng cho chủ kho/quản lí/nhân viên kho
exports.laNhanVienKho = function (req, res, next) {
    if (req.user.maChuKho || req.user.maQuanLy || req.user.maNhanVienKho) return next();
    else res.redirect('/dashboard');
}