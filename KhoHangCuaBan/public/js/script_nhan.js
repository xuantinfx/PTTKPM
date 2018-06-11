let STT = 1;

function addTableRow() {
    $('.modal-body tbody').append($('.modal-body tr')[1].outerHTML);
    STT++;
    $('.modal-body tbody tr:last-child td:first-child').text(STT);
}

function deleteTableRow() {
    // console.log($('.modal-body tr:last-child'));
    if ($('.modal-body tbody tr').length != 1) {
        //trừ đi tổng tiền khi nhập đơn hàng
        let tdThanhTien = $('.modal-body tbody tr:last-child td:last-child');
        if (tdThanhTien) {
            let thanhTien_old = parseInt(tdThanhTien.find('input').val());
            let spanTongTien = $('#spanTongTien');
            let tongTien_old = parseInt(spanTongTien.text());
            let tongTien_new = tongTien_old - thanhTien_old;
            spanTongTien.text(tongTien_new);
        }
        //xóa dòng
        $('.modal-body tbody tr:last-child').remove();
        STT--;
    }

}


/********************************** ĐƠN HÀNG XUẤT **********************************/
//Nút thêm đơn hàng xuất
var dsNgayNhap, dsNgayHetHan, dsSoLuong;
$('#btnThemDonHangXuat').click(function () {
    console.log('đã click');
    //lấy tên người dùng
    $.get('/nguoi-dung/lay-thong-tin-trong-session', function (data) {
        $('#inputNguoiLapDon').val(data.tenNguoiDung);
    })
    //lấy ngày hiện hành
    $('#inputNgayHienHanh').val(new Date().toLocaleDateString('vi-VN'));
    //lấy danh sách mặt hàng và cho vào <select></select>
    $.get('/don-hang-xuat/lay-option-ds-mat-hang-da-nhap', (data) => {
        console.log(data);
        if (data != 'false') {
            //gắn dsOption vào select>
            $('.modal-body select').html(data.dsOption);
            //set các global variables tương ứng
            dsNgayNhap = data.dsNgayNhap;
            dsNgayHetHan = data.dsNgayHetHan;;
            dsSoLuong = data.dsSoLuong;
        }
    })
})
//Khi có sự thay đổi option trong select, phải quan sát từ tbody để đảm bảo quan sát dc cả các element thêm mới
$('tbody').on('change', 'select', function (e) {
    //lấy index bị thay đổi
    let select = $(this);
    //node[0]: lấy javascript object thay vì jquery object 
    let selectedIndex = select[0].selectedIndex - 1;

    //set lại ngày nhập, ngày hết hạn và số lượng input tối đa
    let tdNgayNhap = $(this).closest('td').next();
    tdNgayNhap.text(new Date(dsNgayNhap[selectedIndex]).toLocaleDateString('vi-VN'));

    let tdNgayHetHan = tdNgayNhap.next();
    tdNgayHetHan.text(new Date(dsNgayHetHan[selectedIndex]).toLocaleDateString('vi-VN'));

    let inputSoLuong = tdNgayHetHan.next().find('input');
    inputSoLuong.attr('max', dsSoLuong[selectedIndex]);
})

$('#themDonHangXuatForm').submit(function (event) {
    //chặn cái default behavior của form lại
    event.preventDefault();
    $.post(`/don-hang-xuat/them`, $('#themDonHangXuatForm').serialize(), (data) => {
        if (data != 'true') alert('Thêm đơn hàng xuất thất bại');
        else {
            alert('Thêm đơn hàng xuất thành công');
            location.reload();
        }
    });
})

/********************************** ĐƠN HÀNG NHẬP **********************************/
//Nút thêm đơn hàng nhập
$('#btnThemDonHangNhap').click(function () {
    console.log('đã click');
    //lấy tên người dùng
    $.get('/nguoi-dung/lay-thong-tin-trong-session', function (data) {
        $('#inputNguoiLapDon').val(data.tenNguoiDung);
    })
    //lấy ngày hiện hành
    $('#inputNgayHienHanh').val(new Date().toLocaleDateString('vi-VN'));
})

//Khi đơn giá hoặc số lượng thay đổi, tính lại thành tiền và tổng tiền
$('tbody').on('change', 'input[type="number"]', function () {
    let tdThanhTien = $(this).closest('td').nextAll().last();
    let thanhTien_old = parseInt(tdThanhTien.find('input').val());
    let soLuong = tdThanhTien.siblings()[2].getElementsByTagName('input')[0].value;
    let donGia = tdThanhTien.siblings()[5].getElementsByTagName('input')[0].value;
    //cập nhật thành tiền
    tdThanhTien.find('input').val(parseInt(soLuong) * parseInt(donGia));
    let thanhTien_new = parseInt(tdThanhTien.find('input').val());
    //cập nhật tổng tiền
    let spanTongTien = $('#spanTongTien');
    let tongTien_old = parseInt(spanTongTien.text());
    let tongTien_new = tongTien_old + thanhTien_new - thanhTien_old;
    spanTongTien.text(tongTien_new);
})

$('#themDonHangNhapForm').submit(function (event) {
    //chặn cái default behavior của form lại
    event.preventDefault();
    $.post(`/don-hang-nhap/them`, $('#themDonHangNhapForm').serialize(), (data) => {
        if (data != 'true') alert('Thêm đơn hàng nhập thất bại');
        else {
            alert('Thêm đơn hàng nhập thành công');
            location.reload();
        }
    });
})