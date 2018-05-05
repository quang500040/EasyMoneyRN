function randomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function randomColorPicked() {
  var myArray = [
    "#DCCCCE",
    "#233949",
    "#BEBEBE",
    "#ADCAD4",
    "#926A5F",
    "#BAC7D8"
  ];
  return myArray[Math.floor(Math.random() * myArray.length)];
}

export default { randomColor, randomColorPicked };
// module.exports = {
//   randomColor: randomColor
// };
