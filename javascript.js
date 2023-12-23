var alicePrivateColor = document.getElementById('aliceColorPicker').value;
var bobPrivateColor = document.getElementById('bobColorPicker').value;
var publicColor = document.getElementById('publicColorPicker').value;

var alicePrivateColorMiniDiv = document.getElementById('alicePrivateColorInPublicColor');
alicePrivateColorMiniDiv.style.background = alicePrivateColor;

var bobPrivateColorMiniDiv = document.getElementById('bobPrivateColorInPublicColor');
bobPrivateColorMiniDiv.style.background = bobPrivateColor;

var publicColorMiniDivAlice = document.getElementById('publicColorAlice');
var publicColorMiniDivBob = document.getElementById('publicColorBob');
publicColorMiniDivAlice.style.background = publicColor;
publicColorMiniDivBob.style.background = publicColor;

var alicePublicColor;
var bobPublicColor;

var aliceSharedSecretColor;
var bobSharedSecretColor;

var bobPrivateColorInSharedSecret = document.getElementById('bobPrivateColorInSharedSecret');
bobPrivateColorInSharedSecret.style.background = bobPrivateColor;

var alicePublicColorInSharedSecret = document.getElementById('alicePublicColorInSharedSecret');

var alicePrivateColorInSharedSecret = document.getElementById('alicePrivateColorInSharedSecret');
alicePrivateColorInSharedSecret.style.background = alicePrivateColor;

var bobPublicColorInSharedSecret = document.getElementById('bobPublicColorInSharedSecret');

console.log("Alice Private Default: ", alicePrivateColor);
console.log("Bob Private Default: ", bobPrivateColor);
console.log("Public Default: ", publicColor);

// select alice's private color
var aliceColorPicker = document.getElementById('aliceColorPicker');

aliceColorPicker.addEventListener('input', function () {
    var selectedColor = aliceColorPicker.value;

    alicePrivateColor = selectedColor;
    alicePrivateColorMiniDiv.style.background = selectedColor;
    alicePrivateColorInSharedSecret.style.background = selectedColor;
    console.log("Alice's Selected Color:", alicePrivateColor);
});

// select bob's private color
var bobColorPicker = document.getElementById('bobColorPicker');

bobColorPicker.addEventListener('input', function () {
    var selectedColor = bobColorPicker.value;

    bobPrivateColor = selectedColor;
    bobPrivateColorMiniDiv.style.background = selectedColor;
    bobPrivateColorInSharedSecret.style.background = selectedColor;
    console.log("Bob's Selected Color:", bobPrivateColor);
});

// public agreed on color
var publicColorPicker = document.getElementById('publicColorPicker');

publicColorPicker.addEventListener('input', function () {
    var selectedColor = publicColorPicker.value;

    publicColor = selectedColor;
    publicColorMiniDivAlice.style.background = selectedColor;
    publicColorMiniDivBob.style.background = selectedColor;
    console.log("Public Color:", publicColor);
});

// generate alice public color
var generateAlicePublicColorButton = document.getElementById('generateAlicePublicColor');
var alicePublicColorDiv = document.getElementById('alicePublicColor');

generateAlicePublicColorButton.addEventListener('click', function () {

    // mix Alice's private color with the public color
    alicePublicColor = mixColorsWithRatio(alicePrivateColor, publicColor, 1, 1);
    alicePublicColorDiv.style.backgroundColor = alicePublicColor;
    alicePublicColorInSharedSecret.style.background = alicePublicColor;
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
    bobPublicColorInSharedSecret.style.background = bobPublicColor;
});

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

var aliceOnLaptopButton = document.getElementById('aliceOnLaptop');
var aliceColorsDiv = document.getElementById('aliceColors');
var alicePublicColorEquationDiv = document.getElementById('alicePublicColorEquation');

aliceOnLaptopButton.addEventListener('click', function() {
if (aliceOnLaptopButton.src.includes('alice_happy_laptop.png')){
    aliceOnLaptopButton.src = 'imgs/alice_neutral_laptop.png';
    console.log('Alice is neutral');
    aliceColorsDiv.classList.add('blur');
    alicePrivateColorMiniDiv.classList.add('grey');
} else {
    aliceOnLaptopButton.src = 'imgs/alice_happy_laptop.png';
    console.log('Alice is happy');
    aliceColorsDiv.classList.remove('blur');
    alicePrivateColorMiniDiv.classList.remove('grey');
}
});

var bobOnLaptopButton = document.getElementById('bobOnLaptop');
var bobColorsDiv = document.getElementById('bobColors');
var bobPublicColorEquationDiv = document.getElementById('bobPublicColorEquation');

bobOnLaptopButton.addEventListener('click', function() {
if (bobOnLaptopButton.src.includes('bob_happy_laptop.png')){
    bobOnLaptopButton.src = 'imgs/bob_neutral_laptop.png';
    console.log('Bob is neutral');
    bobColorsDiv.classList.add('blur');
    bobPrivateColorMiniDiv.classList.add('grey');
} else {
    bobOnLaptopButton.src = 'imgs/bob_happy_laptop.png';
    console.log('bob is happy');
    bobColorsDiv.classList.remove('blur');
    bobPrivateColorMiniDiv.classList.remove('grey');
}
});