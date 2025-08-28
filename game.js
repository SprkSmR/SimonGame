var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour = buttonColours[nextSequence()];

var gamePattern = [];

gamePattern.push(randomChosenColour);

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    return randomNumber;
}