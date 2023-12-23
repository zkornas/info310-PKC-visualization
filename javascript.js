var alicePrivateColor = document.getElementById('aliceColorPicker').value;
var bobPrivateColor = document.getElementById('bobColorPicker').value;
var publicColor = document.getElementById('publicColorPicker').value;

var alicePublicColor;
var bobPublicColor;

var aliceSharedSecretColor;
var bobSharedSecretColor;

console.log("Alice Private Default: ", alicePrivateColor);
console.log("Bob Private Default: ", bobPrivateColor);
console.log("Public Default: ", publicColor);

// select alice's private color
var aliceColorPicker = document.getElementById('aliceColorPicker');

aliceColorPicker.addEventListener('input', function () {
    var selectedColor = aliceColorPicker.value;

    alicePrivateColor = selectedColor;
    console.log("Alice's Selected Color:", alicePrivateColor);
});

// select bob's private color
var bobColorPicker = document.getElementById('bobColorPicker');

bobColorPicker.addEventListener('input', function () {
    var selectedColor = bobColorPicker.value;

    bobPrivateColor = selectedColor;
    console.log("Bob's Selected Color:", bobPrivateColor);
});

// public agreed on color
var publicColorPicker = document.getElementById('publicColorPicker');

publicColorPicker.addEventListener('input', function () {
    var selectedColor = publicColorPicker.value;

    publicColor = selectedColor;
    console.log("Public Color:", publicColor);
});

// generate alice public color
var generateAlicePublicColorButton = document.getElementById('generateAlicePublicColor');
var alicePublicColorDiv = document.getElementById('alicePublicColor');

generateAlicePublicColorButton.addEventListener('click', function () {

    // mix Alice's private color with the public color
    alicePublicColor = mixColorsWithRatio(alicePrivateColor, publicColor, 1, 1);
    alicePublicColorDiv.style.backgroundColor = alicePublicColor;
});

// mix alice's private color with bob's public color
var generateSharedSecretColorAliceButton = document.getElementById('generateSharedSecretColorAlice');
var sharedSecretColorAliceDiv = document.getElementById('aliceSharedPrivateColor');

generateSharedSecretColorAliceButton.addEventListener('click', function() {

    aliceSharedSecretColor = mixColorsWithRatio(alicePrivateColor, bobPublicColor, 1, 2);
    sharedSecretColorAliceDiv.style.backgroundColor = aliceSharedSecretColor;
});

// mix bob's private color with alice's public color
var generateSharedSecretColorBobButton = document.getElementById('generateSharedSecretColorBob');
var sharedSecretColorBobDiv = document.getElementById('bobSharedPrivateColor');

generateSharedSecretColorBobButton.addEventListener('click', function() {

    bobSharedSecretColor = mixColorsWithRatio(bobPrivateColor, alicePublicColor, 1, 2);
    sharedSecretColorBobDiv.style.backgroundColor = bobSharedSecretColor;
});

// generate bobs public color
var generateBobPublicColorButton = document.getElementById('generateBobPublicColor');
var bobPublicColorDiv = document.getElementById('bobPublicColor');

generateBobPublicColorButton.addEventListener('click', function() {
    bobPublicColor = mixColorsWithRatio(bobPrivateColor, publicColor, 1, 1);
    bobPublicColorDiv.style.backgroundColor = bobPublicColor;
})

function mixColorsWithRatio(color1, color2, ratio1, ratio2) {
    // convert hex to rgb
    var r1 = parseInt(color1.substring(1, 3), 16);
    var g1 = parseInt(color1.substring(3, 5), 16);
    var b1 = parseInt(color1.substring(5, 7), 16);

    var r2 = parseInt(color2.substring(1, 3), 16);
    var g2 = parseInt(color2.substring(3, 5), 16);
    var b2 = parseInt(color2.substring(5, 7), 16);

    // mix colors with ratio
    var mixedR = Math.round((r1 * ratio1 + r2 * ratio2) / (ratio1 + ratio2));
    var mixedG = Math.round((g1 * ratio1 + g2 * ratio2) / (ratio1 + ratio2));
    var mixedB = Math.round((b1 * ratio1 + b2 * ratio2) / (ratio1 + ratio2));

    var mixedColor = '#' + componentToHex(mixedR) + componentToHex(mixedG) + componentToHex(mixedB);

    return mixedColor;
}

// helper convert RGB to hex
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
}
