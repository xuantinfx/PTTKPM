
function addTableRow() {
    $('.modal-body tbody').append($('.modal-body tr')[1].outerHTML);
}

function deleteTableRow() {
    // console.log($('.modal-body tr:last-child'));
    if ($('.modal-body tbody tr').length != 1) $('.modal-body tbody tr:last-child').remove();
}

//Nút thêm đơn hàng xuất
var dsNgayNhap, dsNgayHetHan, dsSoLuong;
$('#btnThemDonHangXuat').click(function(){
    console.log('đã click');
    //lấy tên người dùng
    $.get('/nguoi-dung/lay-thong-tin-trong-session', function(data){
        $('#inputNguoiLapDon').val(data.tenNguoiDung);
    })
    //lấy ngày hiện hành
    $('#inputNgayHienHanh').val(new Date().toLocaleDateString('vi-VN'));
    //lấy danh sách mặt hàng và cho vào <select></select>
    $.get('/don-hang-xuat/lay-option-ds-mat-hang-da-nhap', (data) => {
        console.log(data);
        if(data != 'false'){
            //gắn dsOption vào select>
            $('.modal-body select').html(data.dsOption);
            //set các global variables tương ứng
            dsNgayNhap = data.dsNgayNhap;
            dsNgayHetHan = data.dsNgayHetHan;;
            dsSoLuong = data.dsSoLuong;
        }
    })
})
//Khi có sự thay đổi option trong select
$('tbody').on('change', 'select', function (e) {
    //lấy index bị thay đổi
    let select = $(this);
    let selectedIndex = select[0].selectedIndex - 1;

    //set lại ngày nhập, ngày hết hạn và số lượng input tối đa
    let tdNgayNhap = $(this).closest('td').next();
    tdNgayNhap.text(new Date(dsNgayNhap[selectedIndex]).toLocaleDateString('vi-VN'));

    let tdNgayHetHan = tdNgayNhap.next();
    tdNgayHetHan.text(new Date(dsNgayHetHan[selectedIndex]).toLocaleDateString('vi-VN'));
    
    let inputSoLuong = tdNgayHetHan.next().find('input');
    inputSoLuong.attr('max', dsSoLuong[selectedIndex]);
})