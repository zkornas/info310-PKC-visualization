function numberConstructor(picker, primePicker, numberValue, primeValue, warning, miniDivOne, miniDivTwo, miniDivThree, miniDivFour, miniDivFive, personalPublicNumber, personalPublicNumberDiv, publicNumberInSharedSecretDiv, sharedSecretNumber, sharedSecretNumberDiv, generatePublicNumberButton, generateSharedSecretButton, showHideButton, numbersDiv, isHidden) {
    this.picker = picker;
    this.primePicker = primePicker;
    this.numberValue = numberValue;
    this.primeValue = primeValue;
    this.warning = warning;
    this.miniDivOne = miniDivOne;
    this.miniDivTwo = miniDivTwo;
    this.miniDivThree = miniDivThree;
    this.miniDivFour = miniDivFour;
    this.miniDivFive = miniDivFive;

    this.personalPublicNumber = personalPublicNumber;
    this.personalPublicNumberDiv = personalPublicNumberDiv;
    this.publicNumberInSharedSecretDiv = publicNumberInSharedSecretDiv;
    this.sharedSecretNumber = sharedSecretNumber;
    this.sharedSecretNumberDiv = sharedSecretNumberDiv;
    this.generatePublicNumberButton = generatePublicNumberButton;
    this.generateSharedSecretButton = generateSharedSecretButton;
    this.showHideButton = showHideButton;
    this.numbersDiv = numbersDiv;
    this.isHidden = isHidden;
};

var alice = new numberConstructor(
    document.getElementById('aliceNumberPicker'),
    undefined,
    Number(document.getElementById('aliceNumberPicker').value),
    undefined,
    document.getElementById('alicePrivateWarning'),
    document.getElementById('aliceGNumber'),
    document.getElementById('alicePrivateNumberInPublicNumber'),
    document.getElementById('aliceNNumber'),
    document.getElementById('nNumberInAliceSecret'),
    document.getElementById('alicePrivateNumberInSharedSecret'),
    undefined,
    document.getElementById('alicePublicNumber'),
    document.getElementById('alicePublicNumberInSharedSecret'),
    undefined,
    document.getElementById('aliceSharedPrivateNumber'),
    undefined,
    undefined,
    document.getElementById('aliceOnLaptop'),
    document.getElementById('aliceNumbers'),
    true
)

var bob = new numberConstructor(
    document.getElementById('bobNumberPicker'),
    undefined,
    Number(document.getElementById('bobNumberPicker').value),
    undefined,
    document.getElementById('bobPrivateWarning'),
    document.getElementById('bobGNumber'),
    document.getElementById('bobPrivateNumberInPublicNumber'),
    document.getElementById('bobNNumber'),
    document.getElementById('nNumberInBobSecret'),
    document.getElementById('bobPrivateNumberInSharedSecret'),
    undefined,
    document.getElementById('bobPublicNumber'),
    document.getElementById('bobPublicNumberInSharedSecret'),
    undefined,
    document.getElementById('bobSharedPrivateNumber'),
    undefined,
    undefined,
    document.getElementById('bobOnLaptop'),
    document.getElementById('bobNumbers'),
    true
)

var public = new numberConstructor(
    document.getElementById('publicNumberPicker'),
    document.getElementById('publicNumberPickerPrime'),
    BigInt(document.getElementById('publicNumberPicker').value),
    BigInt(document.getElementById('publicNumberPickerPrime').value),
    undefined,
    document.getElementById('publicNumberAlice'),
    document.getElementById('publicNumberBob')
);

if (alice.numberValue < public.primeValue){
    alice.warning.style.display = "none";
} else {
    alice.warning.style.display = "block";
}

if (bob.numberValue < public.primeValue){
    bob.warning.style.display = "none";
} else {
    bob.warning.style.display = "block";
}

console.log("G: ", public.numberValue, " ", typeof public.numberValue);
console.log("N: ", public.primeValue, " ", typeof public.primeValue);

primeWarning = document.getElementById('primeNumberWarning');
if (isPrime(public.primeValue)) {
    primeWarning.style.display = "none";
} else {
    primeWarning.style.display = "block";
}

gNumberWarning = document.getElementById('gNumberWarning');
if (public.numberValue < public.primeValue){
    gNumberWarning.style.display = "none";
} else {
    gNumberWarning.style.display = "block";
}

console.log(bob.numberValue);

function handleNumberPickerInput(numberObject) {
    var selectedNumber = parseInt(numberObject.picker.value, 10);
    numberObject.numberValue = selectedNumber;
    console.log('number: ', numberObject.numberValue)
    if (numberObject.numberValue < public.primeValue){
        numberObject.warning.style.display = "none";
        numberObject.miniDivOne.innerText = public.numberValue;
        numberObject.miniDivThree.innerText = public.primeValue;
        numberObject.miniDivFour.innerText = public.primeValue;
        numberObject.picker.value = numberObject.numberValue;
        numberObject.miniDivTwo.innerText = numberObject.numberValue;
        numberObject.miniDivFive.innerText = numberObject.numberValue;
        generatePublicNumber(alice);
        generatePublicNumber(bob);
        generateSharedSecretNumber(alice, bob);
        generateSharedSecretNumber(bob, alice);
    } else {
        numberObject.warning.style.display = "block";
    }
}

function handleGNumberPickerInput(numberObject){
    var selectedNumber = parseInt(numberObject.picker.value, 10);
    numberObject.numberValue = selectedNumber;
    if(isGLessThanN()){
        console.log(' Prime value: ', public.primeValue);
        if(isPrime(public.primeValue)){
            alice.miniDivOne.innerText = public.numberValue;
            bob.miniDivOne.innerText = public.numberValue;
            console.log('G is < than N');
            generatePublicNumber(alice);
            generatePublicNumber(bob);
            generateSharedSecretNumber(alice, bob);
            generateSharedSecretNumber(bob, alice);
        } else {
            console.log('NOT PRIME!')
        }
    }
}

generatePublicNumber(alice);
generatePublicNumber(bob);

generateSharedSecretNumber(alice, bob);
generateSharedSecretNumber(bob, alice);

alice.miniDivOne.innerText = public.numberValue;
alice.miniDivThree.innerText = public.primeValue;
alice.miniDivFour.innerText = public.primeValue;
bob.miniDivOne.innerText = public.numberValue;
bob.miniDivThree.innerText = public.primeValue;
bob.miniDivFour.innerText = public.primeValue;

alice.picker.value = alice.numberValue;
alice.miniDivTwo.innerText = alice.numberValue;
alice.miniDivFive.innerText = alice.numberValue;

bob.picker.value = bob.numberValue;
bob.miniDivTwo.innerText = bob.numberValue;
bob.miniDivFive.innerText = bob.numberValue;

function handleNumberPickerPrimeInput(numberObject) {
    var selectedNumber = parseInt(numberObject.primePicker.value, 10);
    numberObject.primeValue = selectedNumber;
    if(isGLessThanN()){
        alice.miniDivOne.innerText = public.numberValue;
        bob.miniDivOne.innerText = public.numberValue;
        console.log('calculating public numbers...')
        generatePublicNumber(alice);
        generatePublicNumber(bob);
        generateSharedSecretNumber(alice, bob);
        generateSharedSecretNumber(bob, alice);
    }
    console.log('Prime number N: ', public.primeValue);
}

function isPrime(num) {
    number = Number(num);
    var sqrtnum=Math.floor(Math.sqrt(number));
    var prime = number != 1;
    for(var i=2; i<sqrtnum+1; i++) {
        if(number % i == 0) {
            prime = false;
            break;
        }
    }
    return prime;
}

function isGLessThanN() {
    if (public.numberValue < public.primeValue){
        gNumberWarning.style.display = "none";
        return true;
    } else {
        gNumberWarning.style.display = "block";
        return false;
    }
}


public.primePicker.addEventListener('input', function() {
    var selectedNumber = parseInt(public.primePicker.value, 10);
    public.primeValue = selectedNumber;
    if (isPrime(selectedNumber)) {
        handleNumberPickerPrimeInput(public)
        primeWarning.style.display = "none";
        alice.miniDivThree.innerText = public.primeValue;
        bob.miniDivThree.innerText = public.primeValue;
        alice.miniDivFour.innerText = public.primeValue;
        bob.miniDivFour.innerText = public.primeValue;
        if (alice.numberValue < public.primeValue){
            alice.warning.style.display = "none";
        } else {
            alice.warning.style.display = "block";
        }

        if (bob.numberValue < public.primeValue){
            bob.warning.style.display = "none";
        } else {
            bob.warning.style.display = "block";
        }
    } else {
        console.log('Not prime!');
        primeWarning.style.display = "block";
    }
    isGLessThanN();
});

public.picker.addEventListener('input', function(){
    handleGNumberPickerInput(public);
    isGLessThanN();
});

alice.picker.addEventListener('input', function(){
    handleNumberPickerInput(alice);
});

bob.picker.addEventListener('input', function(){
    handleNumberPickerInput(bob);
    bob.miniDivTwo.innerText = bob.numberValue;
    bob.miniDivFive.innerText = bob.numberValue;
    if (bob.numberValue < public.primeValue){
        bob.warning.style.display = "none";
    } else {
        bob.warning.style.display = "block";
    }
});

function generatePublicNumber(numberObject) {
    numberObject.personalPublicNumber = BigInt((BigInt(public.numberValue) ** BigInt(numberObject.numberValue)) % BigInt(public.primeValue));
    numberObject.personalPublicNumberDiv.innerText = numberObject.personalPublicNumber;
    numberObject.publicNumberInSharedSecretDiv.innerText = numberObject.personalPublicNumber;
    console.log(numberObject.personalPublicNumber)
};

function generateSharedSecretNumber(primaryNumberObject, secondaryNumberObject) {
    primaryNumberObject.sharedSecretNumber = BigInt((BigInt(secondaryNumberObject.personalPublicNumber) ** BigInt(primaryNumberObject.numberValue)) % BigInt(public.primeValue));
    primaryNumberObject.sharedSecretNumberDiv.innerText = primaryNumberObject.sharedSecretNumber;
};

alice.showHideButton.addEventListener('click', function(){
    if (alice.isHidden == false) {
        alice.showHideButton.src = 'imgs/alice_neutral_laptop.PNG';
        alice.miniDivTwo.classList.toggle('blur');
    } else {
        alice.showHideButton.src = 'imgs/alice_happy_laptop.PNG';
        alice.miniDivTwo.classList.toggle('blur');
    }
    showHideNumberSection(alice);
});

bob.showHideButton.addEventListener('click', function(){
    if (bob.isHidden == false) {
        bob.showHideButton.src = 'imgs/bob_neutral_laptop.PNG';
        bob.miniDivTwo.classList.toggle('blur');
    } else {
        bob.showHideButton.src = 'imgs/bob_happy_laptop.PNG';
        bob.miniDivTwo.classList.toggle('blur');
    }
    showHideNumberSection(bob);
});

function showHideNumberSection(numberObject) {
    const isHidden = !numberObject.isHidden;

    numberObject.numbersDiv.classList.toggle('blur', isHidden);
    numberObject.isHidden = isHidden;
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

    bob.warning.style.display = "none";
    alice.warning.style.display = "none";
    primeWarning.style.display = "none";
    gNumberWarning.style.display = "none";


    public.primeValue = getRandomPrime()
    public.primePicker.value = public.primeValue;
    await sleep(100);

    public.numberValue = Math.floor(Math.random() * public.primeValue);
    public.picker.value = public.numberValue;
    await sleep(100);

    alice.miniDivOne.innerText = public.numberValue;
    bob.miniDivOne.innerText = public.numberValue;
    alice.miniDivThree.innerText = public.primeValue;
    bob.miniDivThree.innerText = public.primeValue;
    alice.miniDivFour.innerText = public.primeValue;
    bob.miniDivFour.innerText = public.primeValue;

    alice.numberValue = Math.floor(Math.random() * public.primeValue);
    console.log("Alice number: ", alice.numberValue);
    alice.picker.value = alice.numberValue;
    alice.miniDivTwo.innerText = alice.numberValue;
    alice.miniDivFive.innerText = alice.numberValue;
    await sleep(100);

    bob.numberValue = Math.floor(Math.random() * public.primeValue);
    console.log("Bob number: ", bob.numberValue);
    bob.picker.value = bob.numberValue;
    bob.miniDivTwo.innerText = bob.numberValue;
    bob.miniDivFive.innerText = bob.numberValue;
    await sleep(100);
    
    generatePublicNumber(alice);
    await sleep(100);

    generatePublicNumber(bob);
    await sleep(100);

    generateSharedSecretNumber(alice, bob);
    generateSharedSecretNumber(bob, alice);
});

function getRandomPrime() {
    let randomNum;
    do {
        randomNum = Math.floor(Math.random() * 9990) + 11;
    } while (!isPrime(randomNum));
    return randomNum;
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
};

var eve = document.getElementById('eve');

eve.addEventListener('click', function() {
   startShakeAnimation(eve);
});