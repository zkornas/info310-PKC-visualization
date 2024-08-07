function colorConstructor(picker, colorValue, miniDivOne, miniDivTwo, personalPublicColor, personalPublicColorDiv, publicColorInSharedSecretDiv, sharedSecretColor, sharedSecretColorDiv, generatePublicColorButton, generateSharedSecretButton, showHideButton, colorsDiv, isHidden) {
    this.picker = picker;
    this.colorValue = colorValue;
    this.miniDivOne = miniDivOne;
    this.miniDivTwo = miniDivTwo;

    miniDivOne.style.backgroundColor = colorValue;
    miniDivTwo.style.backgroundColor = colorValue;

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
    document.getElementById('publicColorAlice'),
    document.getElementById('publicColorBob')
)

function handleColorPickerInput(colorObject) {
   var selectedColor = colorObject.picker.value;
   colorObject.colorValue = selectedColor;
   colorObject.miniDivOne.style.background = selectedColor;
   colorObject.miniDivTwo.style.background = selectedColor;
   generatePublicColor(alice);
   generatePublicColor(bob);
   generateSharedSecretColor(alice, bob);
   generateSharedSecretColor(bob, alice);
};

generatePublicColor(alice);
generatePublicColor(bob);

generateSharedSecretColor(alice, bob);
generateSharedSecretColor(bob, alice);

alice.picker.addEventListener('input', function() {
    handleColorPickerInput(alice);
});

bob.picker.addEventListener('input', function() {
    handleColorPickerInput(bob);
});

public.picker.addEventListener('input', function() {
    handleColorPickerInput(public);
});

function generatePublicColor(colorObject) {
    colorObject.personalPublicColor = mixColorsWithRatio(colorObject.colorValue, public.colorValue, 1, 1);
    colorObject.personalPublicColorDiv.style.background = colorObject.personalPublicColor;
    colorObject.publicColorInSharedSecretDiv.style.background = colorObject.personalPublicColor;
    colorObject.personalPublicColorDiv.draggable = true;
    colorObject.personalPublicColorDiv.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', colorObject.personalPublicColor);
    });
};

function generateSharedSecretColor(primaryColorObject, secondaryColorObject) {
    primaryColorObject.sharedSecretColor = mixColorsWithRatio(primaryColorObject.colorValue, secondaryColorObject.personalPublicColor, 1, 2);
    primaryColorObject.sharedSecretColorDiv.style.backgroundColor = primaryColorObject.sharedSecretColor;
};

function mixColorsWithRatio(color1, color2, ratio1, ratio2) {
    var r1 = parseInt(color1.substring(1, 3), 16);
    var g1 = parseInt(color1.substring(3, 5), 16);
    var b1 = parseInt(color1.substring(5, 7), 16);

    var r2 = parseInt(color2.substring(1, 3), 16);
    var g2 = parseInt(color2.substring(3, 5), 16);
    var b2 = parseInt(color2.substring(5, 7), 16);

    var mixedR = Math.round((r1 * ratio1 + r2 * ratio2) / (ratio1 + ratio2));
    var mixedG = Math.round((g1 * ratio1 + g2 * ratio2) / (ratio1 + ratio2));
    var mixedB = Math.round((b1 * ratio1 + b2 * ratio2) / (ratio1 + ratio2));

    var mixedColor = '#' + componentToHex(mixedR) + componentToHex(mixedG) + componentToHex(mixedB);

    return mixedColor;
}

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
    const isHidden = !colorObject.isHidden;

    colorObject.colorsDiv.classList.toggle('blur', isHidden);
    colorObject.miniDivOne.classList.toggle('grey', isHidden);
    colorObject.isHidden = isHidden;
};

function startShakeAnimation(element) {
    element.classList.add('shake-animation');
    setTimeout(() => {
        element.classList.remove('shake-animation');
    }, 500);
}

var randomButton = document.getElementById('randomButton');

randomButton.addEventListener('click', async function() {
    startShakeAnimation(randomButton);
    startShakeAnimation(alice.showHideButton);
    startShakeAnimation(bob.showHideButton);
    startShakeAnimation(eve);
    
    randomColorGeneratorHelper(alice);
    randomColorGeneratorHelper(bob);
    randomColorGeneratorHelper(public);

    eveMixedColor = undefined;
    eveColorMixer.style.background = '#ffffff';

    generatePublicColor(alice);
    await sleep(100);

    generatePublicColor(bob);
    await sleep(100);

    generateSharedSecretColor(alice, bob);
    generateSharedSecretColor(bob, alice);
});

async function randomColorGeneratorHelper(colorObject) {
    colorObject.colorValue = getRandomHexColor();
    colorObject.picker.value = colorObject.colorValue;
    colorObject.miniDivOne.style.backgroundColor = colorObject.colorValue;
    colorObject.miniDivTwo.style.backgroundColor = colorObject.colorValue;
    await sleep(100);
};

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

var eve = document.getElementById('eve');
var eveMixedColor;

document.addEventListener('DOMContentLoaded', function () {
    var eveColorMixer = document.getElementById('eveColorMixer');

    public.picker.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', public.colorValue);
    });

    eveColorMixer.addEventListener('dragover', function (event) {
        event.preventDefault();
    });

    eveColorMixer.addEventListener('drop', async function (event) {
        event.preventDefault();

        var draggedColor = event.dataTransfer.getData('text/plain');

        if (eveMixedColor == undefined) {
            eveMixedColor = draggedColor;
            eveColorMixer.style.background = draggedColor;
        } else {
            var newMixedColor = mixColorsWithRatio(draggedColor, eveMixedColor, 1, 1);
            eveMixedColor = newMixedColor;
            eveColorMixer.style.background = newMixedColor;

            eve.src = 'imgs/eve_sad.PNG';
            await sleep(500);
            eve.src = 'imgs/eve_evil.PNG';
        }
    });
});

eve.addEventListener('click', function() {
   eveColorMixer.style.background = '#ffffff';
   eveMixedColor = undefined;
   startShakeAnimation(eve);
});