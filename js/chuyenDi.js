function ChuyenDi(
  loaiXe,
  soKm,
  thoiGianCho,
  giaNguong_1,
  giaNguong_2,
  giaNguong_3,
  giaCho
) {
  // Attributes
  this.loaiXe = loaiXe;
  this.soKm = soKm;
  this.thoiGianCho = thoiGianCho;
  this.giaNguong_1 = giaNguong_1;
  this.giaNguong_2 = giaNguong_2;
  this.giaNguong_3 = giaNguong_3;
  this.giaCho = giaCho;
  this.tenXe = "";
  this.tienCho = 0;
  this.tongTien = 0;

  // Methods
  this.tinhTien = function () {
    this.soKm = parseFloat(this.soKm);
    this.thoiGianCho = parseFloat(this.thoiGianCho);

    //Dưới 1km
    if (this.soKm <= nguong_1) {
      this.tongTien += this.soKm * this.giaNguong_1;
    } else if (this.soKm > nguong_1 && this.soKm <= nguong_2) {
      this.tongTien +=
        nguong_1 * this.giaNguong_1 + (this.soKm - nguong_1) * this.giaNguong_2;
    } else {
      this.tongTien +=
        nguong_1 * this.giaNguong_1 +
        (nguong_2 - nguong_1) * this.giaNguong_2 +
        (this.soKm - nguong_2) * this.giaNguong_3;
    }
    this.tienCho = this.thoiGianCho * this.giaCho;
    this.layTenXe();
    this.tongTien += this.tienCho;

    return this.tongTien;
  };

  this.layTenXe = function () {
    switch (this.loaiXe) {
      case "uberX":
        return (this.tenXe = "Uber X");
        break;
      case "uberSuv":
        return (this.tenXe = "Uber SUV");
        break;
      case "uberBlack":
        return (this.tenXe = "Uber Black");
        break;
      default:
        break;
    }
  };
}
