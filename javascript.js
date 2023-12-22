// alice color
var aliceColorPicker = document.getElementById('aliceColorPicker');
var aliceSelectedColorDiv = document.getElementById('aliceSelectedColor');

aliceColorPicker.addEventListener('input', function () {
    var selectedColor = aliceColorPicker.value;
    aliceSelectedColorDiv.style.backgroundColor = selectedColor;

    // var for alice's private color
    var aliceSavedColor = selectedColor;
    console.log("Alice's Selected Color:", aliceSavedColor);
});

// bob color
var bobColorPicker = document.getElementById('bobColorPicker');
var bobSelectedColorDiv = document.getElementById('bobSelectedColor');

bobColorPicker.addEventListener('input', function () {
    var selectedColor = bobColorPicker.value;
    bobSelectedColorDiv.style.backgroundColor = selectedColor;

    // var for bob's private color
    var bobPrivateColor = selectedColor;
    console.log("Bob's Selected Color:", bobPrivateColor);
});

// public agreed color
var publicColorPicker = document.getElementById('publicColorPicker');
var publicSelectedColorDiv = document.getElementById('publicSelectedColor');

publicColorPicker.addEventListener('input', function(){
    var selectedColor = publicColorPicker.value;
    publicSelectedColorDiv.style.backgroundColor = selectedColor;

    // var for public color
    var publicColor = selectedColor;
    console.log("Public Color:", publicColor);
});


