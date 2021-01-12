// 1 - 20 - ...
var nguong_1 = 1;
var nguong_2 = 20;

// Giá xe
var uberX_nguong_1 = 8000;
var uberX_nguong_2 = 12000;
var uberX_nguong_3 = 10000;
var uberX_cho = 2000;

var uberSuv_nguong_1 = 9000;
var uberSuv_nguong_2 = 14000;
var uberSuv_nguong_3 = 12000;
var uberSuv_cho = 3000;

var uberBlack_nguong_1 = 10000;
var uberBlack_nguong_2 = 16000;
var uberBlack_nguong_3 = 14000;
var uberBlack_cho = 4000;

var validation = new Validation();

var chuyenDi;

function getEle(id) {
  return document.getElementById(id);
}

function check(loaiXe, soKm, thoiGianCho) {
  var isValid = true;

  // kiểm tra loại xe
  isValid &= validation.kiemTraLoaiXe(loaiXe, "(*) Vui lòng chọn loại xe");
  if (!isValid) return false;

  // kiem tra nhap vao khoang cach
  isValid &=
    validation.kiemTraRong(soKm, "(*) Vui lòng nhập vào khoảng cách") &&
    validation.kiemTraSoHopLe(soKm, "(*) Vui lòng nhập khoảng cách chính xác");
  if (!isValid) return false;

  // kiem tra thoi gian cho
  isValid &=
    validation.kiemTraRong(
      thoiGianCho,
      "(*) Vui lòng nhập vào thời gian chờ"
    ) &&
    validation.kiemTraSoHopLe(
      thoiGianCho,
      "(*) Vui lòng nhập thời gian chờ chính xác"
    );
  if (!isValid) return false;

  return true;
}

/**
 * Bấm nút tính tiền
 */
getEle("tinhTien").addEventListener("click", function () {
  // chọn loại xe
  var loaiXe = "";
  var selector = document.getElementsByName("selector");
  for (var i = 0; i < selector.length; i++) {
    if (selector[i].checked) {
      loaiXe = selector[i].id;
    }
  }
  // khoang cach
  var soKm = getEle("soKm").value;
  var thoiGianCho = getEle("thoiGianCho").value;

  // check Validation
  if (!check(loaiXe, soKm, thoiGianCho)) {
    return;
  }

  // Chọn ngưỡng sau khi check xong
  var giaNguong_1 = 0;
  var giaNguong_2 = 0;
  var giaNguong_3 = 0;
  var giaCho = 0;
  switch (loaiXe) {
    case "uberX":
      giaNguong_1 = uberX_nguong_1;
      giaNguong_2 = uberX_nguong_2;
      giaNguong_3 = uberX_nguong_3;
      giaCho = uberX_cho;
      break;
    case "uberSuv":
      giaNguong_1 = uberSuv_nguong_1;
      giaNguong_2 = uberSuv_nguong_2;
      giaNguong_3 = uberSuv_nguong_3;
      giaCho = uberSuv_cho;
      break;
    case "uberBlack":
      giaNguong_1 = uberBlack_nguong_1;
      giaNguong_2 = uberBlack_nguong_2;
      giaNguong_3 = uberBlack_nguong_3;
      giaCho = uberBlack_cho;
      break;
    default:
      break;
  }

  // gán vào Object chuyenDi
  chuyenDi = new ChuyenDi(
    loaiXe,
    soKm,
    thoiGianCho,
    giaNguong_1,
    giaNguong_2,
    giaNguong_3,
    giaCho
  );

  // In ra màn hình
  chuyenDi.tinhTien();
  getEle("divThanhTien").style.display = "block";
  getEle("xuatTien").innerHTML = chuyenDi.tongTien;
});

/**
 * In hóa đơn ra màn hình
 *
 */

getEle("inHoaDon").addEventListener("click", function () {
  var table = getEle("hoaDon");
  var content = "";
  var thanhTien = 0;
  if (chuyenDi.soKm <= nguong_1) {
    thanhTien = chuyenDi.soKm * chuyenDi.giaNguong_1;
    content += `
            <tr>
                <td>${chuyenDi.tenXe}</td>
                <td>${chuyenDi.soKm} km</td>
                <td>${chuyenDi.giaNguong_1}</td>
                <td>${thanhTien}</td>
            </tr>
        `;
  } else if (chuyenDi.soKm > nguong_1 && chuyenDi.soKm <= nguong_2) {
    var tong1 = nguong_1 * chuyenDi.giaNguong_1;
    var tong2 = (chuyenDi.soKm - nguong_1) * chuyenDi.giaNguong_2;
    thanhTien = tong1 + tong2;
    content += `
                <tr>
                    <td>${chuyenDi.tenXe}</td>
                    <td>${nguong_1} km</td>
                    <td>${chuyenDi.giaNguong_1}</td>
                    <td>${tong1}</td>
                </tr>
                <tr>
                    <td>${chuyenDi.tenXe}</td>
                    <td>${chuyenDi.soKm - nguong_1} km</td>
                    <td>${chuyenDi.giaNguong_2}</td>
                    <td>${tong2}</td>
                </tr>
            `;
  } else {
    var tong1 = nguong_1 * chuyenDi.giaNguong_1;
    var tong2 = (nguong_2 - nguong_1) * chuyenDi.giaNguong_2;
    var tong3 = (chuyenDi.soKm - nguong_2) * chuyenDi.giaNguong_3;
    thanhTien = tong1 + tong2 + tong3;
    content += `
                <tr>
                    <td>${chuyenDi.tenXe}</td>
                    <td>${nguong_1} km</td>
                    <td>${chuyenDi.giaNguong_1}</td>
                    <td>${tong1}</td>
                </tr>
                <tr>
                    <td>${chuyenDi.tenXe}</td>
                    <td>${nguong_2 - nguong_1} km</td>
                    <td>${chuyenDi.giaNguong_2}</td>
                    <td>${tong2}</td>
                </tr>
                <tr>
                    <td>${chuyenDi.tenXe}</td>
                    <td>${chuyenDi.soKm - nguong_2} km</td>
                    <td>${chuyenDi.giaNguong_3}</td>
                    <td>${tong3}</td>
                </tr>
            `;
  }

  content += `
              <tr>
                  <td>Thời gian chờ</td>
                  <td>${chuyenDi.thoiGianCho}</td>
                  <td>${chuyenDi.giaCho}</td>
                  <td>${chuyenDi.tienCho}</td>
              </tr>
          `;
  thanhTien += chuyenDi.tienCho;

  content += `
              <tr  class="table-success">
                  <td colspan="3">Total</td>
                  <td>${thanhTien}</td>
              </tr>
              `;

  table.innerHTML = content;
  getEle("in").click();
});
