// Get's element and value for the color pickers for Alice, Bob, and Public.
var aliceColorPicker = document.getElementById('aliceColorPicker');
var alicePrivateColor = aliceColorPicker.value;

var bobColorPicker = document.getElementById('bobColorPicker');
var bobPrivateColor = bobColorPicker.value;

var publicColorPicker = document.getElementById('publicColorPicker');
var publicColor = publicColorPicker.value;

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

// Function for handeling user-selected color for Bob and Alice's private colors
// Parameters
//      colorPicker: The actual color picker element
//      name: 'alice', 'bob', or 'public' so that we know which color variable to update
//      miniDiv: The mini-div that shows Bob/Alice's private color in the equation to make their public color
//      inSharedSecret: The mini-div that shows Alice/Bob's private color in the equationto make the shared secret color

function handleColorPickerInput(colorPicker, name, miniDiv, inSharedSecret) {
    var selectedColor = colorPicker.value;

    if (name == 'alice') {
        alicePrivateColor = selectedColor;
    } else if (name == 'bob') {
        bobPrivateColor = selectedColor;
    } else {
        publicColor = selectedColor;
    }
    miniDiv.style.background = selectedColor;
    inSharedSecret.style.background = selectedColor;
}

// Event Listener for when the user selects Alice's private color
aliceColorPicker.addEventListener('input', function () {
    handleColorPickerInput(aliceColorPicker, 'alice', alicePrivateColorMiniDiv, alicePrivateColorInSharedSecret);
    console.log('Alice private color: ', alicePrivateColor);
});

// Event Listener for when the user selects Bob's private color
bobColorPicker.addEventListener('input', function () {
    handleColorPickerInput(bobColorPicker, 'bob', bobPrivateColorMiniDiv, bobPrivateColorInSharedSecret);
    console.log('Bob private color: ', bobPrivateColor);
});

// Event Listener for when the user selects public color
publicColorPicker.addEventListener('input', function () {
    handleColorPickerInput(publicColorPicker, 'public', publicColorMiniDivAlice, publicColorMiniDivBob);
});

// generate alice public color
var generateAlicePublicColorButton = document.getElementById('generateAlicePublicColor');
var alicePublicColorDiv = document.getElementById('alicePublicColor');

generateAlicePublicColorButton.addEventListener('click', function () {
    generatePublicColor(alicePublicColor, alicePrivateColor, alicePublicColorDiv, alicePublicColorInSharedSecret);
});

// generate bobs public color
var generateBobPublicColorButton = document.getElementById('generateBobPublicColor');
var bobPublicColorDiv = document.getElementById('bobPublicColor');

generateBobPublicColorButton.addEventListener('click', function() {
    generatePublicColor(bobPublicColor, bobPrivateColor, bobPublicColorDiv, bobPublicColorInSharedSecret);
});

// Function to generate Alice/Bob's public color by mixing their private color with the public color
// Parameters
//      personalPublicColor: The individual's personal public color that can be used by anyone. 
//                           Is assigned a value after calling mixColorsWithRatio function.
//      privateColor: The individual's private color.
//      publicColorDiv: The div element that will display the public color.
//      personalPublicColorInSharedSecret: The div element that display's the individual's public color
//                                         in the equation used to generate the shared secret color.
function generatePublicColor(personalPublicColor, privateColor, publicColorDiv, personalPublicColorInSharedSecret) {
    personalPublicColor = mixColorsWithRatio(privateColor, publicColor, 1, 1);
    publicColorDiv.style.backgroundColor = personalPublicColor;
    personalPublicColorInSharedSecret.style.background = personalPublicColor;
};

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
if (aliceOnLaptopButton.src.includes('alice_happy_laptop.PNG')){
    aliceOnLaptopButton.src = 'imgs/alice_neutral_laptop.PNG';
    aliceColorsDiv.classList.add('blur');
    alicePrivateColorMiniDiv.classList.add('grey');
} else {
    aliceOnLaptopButton.src = 'imgs/alice_happy_laptop.PNG';
    aliceColorsDiv.classList.remove('blur');
    alicePrivateColorMiniDiv.classList.remove('grey');
}
});

var bobOnLaptopButton = document.getElementById('bobOnLaptop');
var bobColorsDiv = document.getElementById('bobColors');
var bobPublicColorEquationDiv = document.getElementById('bobPublicColorEquation');

bobOnLaptopButton.addEventListener('click', function() {
if (bobOnLaptopButton.src.includes('bob_happy_laptop.PNG')){
    bobOnLaptopButton.src = 'imgs/bob_neutral_laptop.PNG';
    bobColorsDiv.classList.add('blur');
    bobPrivateColorMiniDiv.classList.add('grey');
} else {
    bobOnLaptopButton.src = 'imgs/bob_happy_laptop.PNG';
    bobColorsDiv.classList.remove('blur');
    bobPrivateColorMiniDiv.classList.remove('grey');
}
});

var randomButton = document.getElementById('randomButton');

randomButton.addEventListener('click', function() {
    randomButton.classList.add('shake-animation');
    
    alicePrivateColor = getRandomHexColor();
    aliceColorPicker.value = alicePrivateColor;
    alicePrivateColorMiniDiv.style.background = alicePrivateColor;
    alicePrivateColorInSharedSecret.style.background = alicePrivateColor;
    
    bobPrivateColor = getRandomHexColor();
    bobColorPicker.value = bobPrivateColor;
    bobPrivateColorMiniDiv.style.background = bobPrivateColor;
    bobPrivateColorInSharedSecret.style.background = bobPrivateColor;

    publicColor = getRandomHexColor();
    publicColorPicker.value = publicColor;
    publicColorMiniDivAlice.style.background = publicColor;
    publicColorMiniDivBob.style.background = publicColor;

    generateAlicePublicColorButton.click();
    generateBobPublicColorButton.click();
    generateSharedSecretColorAliceButton.click();
    generateSharedSecretColorBobButton.click();

    setTimeout(() => {
        randomButton.classList.remove('shake-animation');
    }, 500);
});

// helper function to randomly generate hex color
function getRandomHexColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }