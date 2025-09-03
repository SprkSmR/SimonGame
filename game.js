//Defines a new function over the generic jQuery prototype, which adds the functionality of flashing. Can pass parameters or be left blank to use defaults.
$.fn.flash = function(times, duration) {
	var T = this;
  	times = times || 3;
 	duration = duration || 200;
        for ( var i=0; i < times; i++ ) {     	
			(function(iter) {      		
				setTimeout(function() {
					T.fadeOut(duration, function() {		
						T.fadeIn(duration);
					});
				}, iter*duration*2+50);
			})
		(i);
	}
};

var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour = buttonColours[nextSequence()];

var gamePattern = [];
var userChosenPattern = [];

gamePattern.push(randomChosenColour);

$(document).on("keypress", function(event){
	if (event.originalEvent.key === "a"){
		$("."+randomChosenColour).flash();
		playSound(randomChosenColour);
	}
});

$(".btn").click(function(event) {
	var userChosenColor = event.target.id;
	playSound(userChosenColor);
	animatePress(userChosenColor);
	userChosenPattern.push(userChosenColor);
});

function playSound(name) {
	new Audio("./sounds/"+name+".mp3").play();
}

function animatePress(currentColour){
	$("."+currentColour).addClass("pressed");
	setTimeout(function(){
		$("."+currentColour).removeClass("pressed");
	}, 100);
}

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    return randomNumber;
}