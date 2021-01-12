function Validation() {
  this.kiemTraRong = function (input, mess) {
    if (input !== "") {
      return true;
    }
    alert(mess);
    return false;
  };

  this.kiemTraLoaiXe = function (input, mess) {
    if (input !== "") {
      return true;
    }
    alert(mess);
    return false;
  };

  this.kiemTraSoHopLe = function (input, mess) {
    if (parseFloat(input) > 0) {
      return true;
    }
    alert(mess);
    return false;
  };
}
