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
    document.getElementById('generateAlicePublicNumber'),
    document.getElementById('generateSharedSecretNumberAlice'),
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
    document.getElementById('generateBobPublicNumber'),
    document.getElementById('generateSharedSecretNumberBob'),
    document.getElementById('bobOnLaptop'),
    document.getElementById('bobNumbers'),
    true
)

var public = new numberConstructor(
    document.getElementById('publicNumberPicker'),
    document.getElementById('publicNumberPickerPrime'),
    Number(document.getElementById('publicNumberPicker').value),
    Number(document.getElementById('publicNumberPickerPrime').value),
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

function handleNumberPickerInput(numberObject) {
    var selectedNumber = parseInt(numberObject.picker.value, 10);
    numberObject.numberValue = selectedNumber;
}

function handleNumberPickerPrimeInput(numberObject) {
    var selectedNumber = parseInt(numberObject.primePicker.value, 10);
    numberObject.primeValue = selectedNumber;
}

function isPrime(num) {
    var sqrtnum=Math.floor(Math.sqrt(num));
    var prime = num != 1;
    for(var i=2; i<sqrtnum+1; i++) {
        if(num % i == 0) {
            prime = false;
            break;
        }
    }
    return prime;
}

function isGLessThanN() {
    if (public.numberValue < public.primeValue){
        gNumberWarning.style.display = "none";
    } else {
        gNumberWarning.style.display = "block";
    }
}


public.primePicker.addEventListener('input', function() {
    handleNumberPickerPrimeInput(public);
    if (isPrime(public.primeValue)) {
        primeWarning.style.display = "none";
    } else {
        primeWarning.style.display = "block";
    }
    isGLessThanN();
    alice.miniDivThree.innerText = public.primeValue;
    bob.miniDivThree.innerText = public.primeValue;
    alice.miniDivFour.innerText = public.primeValue;
    bob.miniDivFour.innerText = public.primeValue;
});

public.picker.addEventListener('input', function(){
    handleNumberPickerInput(public);
    isGLessThanN();
    alice.miniDivOne.innerText = public.numberValue;
    bob.miniDivOne.innerText = public.numberValue;
});

alice.picker.addEventListener('input', function(){
    handleNumberPickerInput(alice);
    alice.miniDivTwo.innerText = alice.numberValue;
    alice.miniDivFive.innerText = alice.numberValue;
    if (alice.numberValue < public.primeValue){
        alice.warning.style.display = "none";
    } else {
        alice.warning.style.display = "block";
    }
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

alice.generatePublicNumberButton.addEventListener('click', function() {
    alice.personalPublicNumber = Number((public.numberValue ** alice.numberValue) % public.primeValue);
    alice.personalPublicNumberDiv.innerText = alice.personalPublicNumber;
    alice.publicNumberInSharedSecretDiv.innerText = alice.personalPublicNumber;
    console.log(alice.personalPublicNumber)
});

bob.generatePublicNumberButton.addEventListener('click', function() {
    bob.personalPublicNumber = Number((public.numberValue ** bob.numberValue) % public.primeValue);
    bob.personalPublicNumberDiv.innerText = bob.personalPublicNumber;
    bob.publicNumberInSharedSecretDiv.innerText = bob.personalPublicNumber;
    console.log(bob.personalPublicNumber)
});

alice.generateSharedSecretButton.addEventListener('click', function(){
    alice.sharedSecretNumber = Number((bob.personalPublicNumber ** alice.numberValue) % public.primeValue);
    alice.sharedSecretNumberDiv.innerText = alice.sharedSecretNumber;
});

bob.generateSharedSecretButton.addEventListener('click', function(){
    bob.sharedSecretNumber = Number((alice.personalPublicNumber ** bob.numberValue) % public.primeValue);
    bob.sharedSecretNumberDiv.innerText = bob.sharedSecretNumber;
});

alice.showHideButton.addEventListener('click', function(){
    if (alice.isHidden == false) {
        alice.showHideButton.src = 'imgs/alice_neutral_laptop.PNG';
    } else {
        alice.showHideButton.src = 'imgs/alice_happy_laptop.PNG';
    }
    showHideNumberSection(alice);
});

bob.showHideButton.addEventListener('click', function(){
    if (bob.isHidden == false) {
        bob.showHideButton.src = 'imgs/bob_neutral_laptop.PNG';
    } else {
        bob.showHideButton.src = 'imgs/bob_happy_laptop.PNG';
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
    alice.picker.value = alice.numberValue;
    alice.miniDivTwo.innerText = alice.numberValue;
    alice.miniDivFive.innerText = alice.numberValue;
    await sleep(100);

    bob.numberValue = Math.floor(Math.random() * public.primeValue);
    bob.picker.value = bob.numberValue;
    bob.miniDivTwo.innerText = bob.numberValue;
    bob.miniDivFive.innerText = bob.numberValue;
    await sleep(100);
    
    alice.generatePublicNumberButton.click();
    await sleep(100);

    bob.generatePublicNumberButton.click();
    await sleep(100);

    alice.generateSharedSecretButton.click();
    bob.generateSharedSecretButton.click();
});

function getRandomPrime() {
    let randomNum;
    do {
        randomNum = Math.floor(Math.random() * 90) + 11;
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