function convertToVND(uv) {
  if (Math.floor(uv) === 0) {
    return "-";
  }

  var price = Math.floor(uv);
  var priceString = "";
  var count = 0;

  while (price > 0) {
    var number = price % 10;
    price = Math.floor(price / 10);
    count = count + 1;

    priceString = number + priceString;

    if (count === 3 && price > 0) {
      priceString = "." + priceString;
      count = 0;
    }
  }

  return priceString + " đ";
}

export default {
  convertToVND
};
