// Constructor for making a new color object. We will have three: Alice, Bob, and Public
function colorConstructor(picker, colorValue, colorValueLabel, miniDivOne, miniDivTwo, personalPublicColor, personalPublicColorDiv, publicColorInSharedSecretDiv, sharedSecretColor, sharedSecretColorDiv, generatePublicColorButton, generateSharedSecretButton, showHideButton, colorsDiv, isHidden) {
    this.picker = picker;
    this.colorValue = colorValue;
    this.colorValueLabel = colorValueLabel;
    this.miniDivOne = miniDivOne;
    this.miniDivTwo = miniDivTwo;

    miniDivOne.style.backgroundColor = colorValue;
    miniDivTwo.style.backgroundColor = colorValue;
    colorValueLabel.textContent = colorValue;

    // These will only be defined for Alice and Bob.
    this.personalPublicColor = personalPublicColor;
    this.personalPublicColorDiv = personalPublicColorDiv;
    this.publicColorInSharedSecretDiv = publicColorInSharedSecretDiv;
    this.sharedSecretColor = sharedSecretColor;
    this.sharedSecretColorDiv = sharedSecretColorDiv;
    this.generatePublicColorButton = generatePublicColorButton;
    this.generateSharedSecretButton = generateSharedSecretButton;
    this.showHideButton = showHideButton;
    this.colorsDiv = colorsDiv;
    this.isHidden = isHidden;
};

var alice = new colorConstructor(
    document.getElementById('aliceColorPicker'),
    document.getElementById('aliceColorPicker').value,
    document.getElementById('aliceColorPickerValue'),
    document.getElementById('alicePrivateColorInPublicColor'),
    document.getElementById('alicePrivateColorInSharedSecret'),
    undefined,
    document.getElementById('alicePublicColor'),
    document.getElementById('alicePublicColorInSharedSecret'),
    undefined,
    document.getElementById('aliceSharedPrivateColor'),
    document.getElementById('generateAlicePublicColor'),
    document.getElementById('generateSharedSecretColorAlice'),
    document.getElementById('aliceOnLaptop'),
    document.getElementById('aliceColors'),
    true
)

var bob = new colorConstructor(
    document.getElementById('bobColorPicker'),
    document.getElementById('bobColorPicker').value,
    document.getElementById('bobColorPickerValue'),
    document.getElementById('bobPrivateColorInPublicColor'),
    document.getElementById('bobPrivateColorInSharedSecret'),
    undefined,
    document.getElementById('bobPublicColor'),
    document.getElementById('bobPublicColorInSharedSecret'),
    undefined,
    document.getElementById('bobSharedPrivateColor'),
    document.getElementById('generateBobPublicColor'),
    document.getElementById('generateSharedSecretColorBob'),
    document.getElementById('bobOnLaptop'),
    document.getElementById('bobColors'),
    true
)

var public = new colorConstructor(
    document.getElementById('publicColorPicker'),
    document.getElementById('publicColorPicker').value,
    document.getElementById('publicColorPickerValue'),
    document.getElementById('publicColorAlice'),
    document.getElementById('publicColorBob')
)

function handleColorPickerInput(colorObject) {
   var selectedColor = colorObject.picker.value;
   colorObject.colorValue = selectedColor;
   colorObject.miniDivOne.style.background = selectedColor;
   colorObject.miniDivTwo.style.background = selectedColor;
   colorObject.colorValueLabel.textContent = selectedColor;
};

alice.picker.addEventListener('input', function() {
    handleColorPickerInput(alice);
});

bob.picker.addEventListener('input', function() {
    handleColorPickerInput(bob);
});

public.picker.addEventListener('input', function() {
    handleColorPickerInput(public);
});

alice.generatePublicColorButton.addEventListener('click', function() {
    generatePublicColor(alice);
})

bob.generatePublicColorButton.addEventListener('click', function() {
    generatePublicColor(bob);
});

function generatePublicColor(colorObject) {
    colorObject.personalPublicColor = mixColorsWithRatio(colorObject.colorValue, public.colorValue, 1, 1);
    colorObject.personalPublicColorDiv.style.background = colorObject.personalPublicColor;
    colorObject.publicColorInSharedSecretDiv.style.background = colorObject.personalPublicColor;
};

alice.generateSharedSecretButton.addEventListener('click', function() {
    alice.sharedSecretColor = mixColorsWithRatio(alice.colorValue, bob.personalPublicColor, 1, 2);
    alice.sharedSecretColorDiv.style.backgroundColor = alice.sharedSecretColor;
});

bob.generateSharedSecretButton.addEventListener('click', function() {
    bob.sharedSecretColor = mixColorsWithRatio(bob.colorValue, alice.personalPublicColor, 1, 2);
    bob.sharedSecretColorDiv.style.backgroundColor = bob.sharedSecretColor;
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

alice.showHideButton.addEventListener('click', function(){
    if (alice.isHidden == false) {
        alice.showHideButton.src = 'imgs/alice_neutral_laptop.PNG';
    } else {
        alice.showHideButton.src = 'imgs/alice_happy_laptop.PNG';
    }
    showHideColorSection(alice);
});

bob.showHideButton.addEventListener('click', function(){
    if (bob.isHidden == false) {
        bob.showHideButton.src = 'imgs/bob_neutral_laptop.PNG';
    } else {
        bob.showHideButton.src = 'imgs/bob_happy_laptop.PNG';
    }
    showHideColorSection(bob);
});

function showHideColorSection(colorObject) {
    if (colorObject.isHidden == false) {
        colorObject.colorsDiv.classList.add('blur');
        colorObject.miniDivOne.classList.add('grey');
        colorObject.isHidden = true;
    } else {
        colorObject.colorsDiv.classList.remove('blur');
        colorObject.miniDivOne.classList.remove('grey');
        colorObject.isHidden = false;
    }
};

var randomButton = document.getElementById('randomButton');

randomButton.addEventListener('click', async function() {
    randomButton.classList.add('shake-animation');
    
    alice.colorValue = getRandomHexColor();
    alice.picker.value = alice.colorValue;
    alice.miniDivOne.style.backgroundColor = alice.colorValue;
    alice.miniDivTwo.style.backgroundColor = alice.colorValue;
    alice.colorValueLabel.textContent = alice.colorValue;
    await sleep(100);

    bob.colorValue = getRandomHexColor();
    bob.picker.value = bob.colorValue;
    bob.miniDivOne.style.backgroundColor = bob.colorValue;
    bob.miniDivTwo.style.backgroundColor = bob.colorValue;
    bob.colorValueLabel.textContent = bob.colorValue;
    await sleep(100);

    public.colorValue = getRandomHexColor();
    public.picker.value = public.colorValue;
    public.miniDivOne.style.backgroundColor = public.colorValue;
    public.miniDivTwo.style.backgroundColor = public.colorValue;
    public.colorValueLabel.textContent = public.colorValue;
    await sleep(100);

    alice.generatePublicColorButton.click();
    await sleep(100);

    bob.generatePublicColorButton.click();
    await sleep(100);

    alice.generateSharedSecretButton.click();
    bob.generateSharedSecretButton.click();

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

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
};