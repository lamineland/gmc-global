document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

  var colorBox = document.getElementById("color-box");
  var btn = document.getElementById("change-color-btn");

  btn.addEventListener("click", function() {
    var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    colorBox.style.backgroundColor = randomColor;
    console.log("Color changed to: " + randomColor);
  });
});