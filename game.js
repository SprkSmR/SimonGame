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

var CHECKSTART = true;
var level = 0;
var playerClicks = 0;
var playerInteract = false;
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userChosenPattern = [];

$(document).on("keypress", function(event){
	if (event.originalEvent.key === "a" && CHECKSTART){
		CHECKSTART = false; 
		nextSequence();
	}
});

$(".btn").click(function(event) {
	if (!playerInteract){
		return;
	}

	var userChosenColor = event.target.id;
	playSound(userChosenColor);
	animatePress(userChosenColor);
	userChosenPattern.push(userChosenColor);
	playerClicks++;

	if (playerClicks > level){
		checkAnswer();
		playerInteract = false;
	} 
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
	$("h1").text("Level " + level+1);
	gamePattern = [];
	userChosenPattern = [];
	for (var i=0; i < level+1; i++){
		(function(iter){
			setTimeout(function(){
				var randomNumber = Math.floor(Math.random()*4);
				var randomChosenColour = buttonColours[randomNumber];
				gamePattern.push(randomChosenColour);
				$("."+randomChosenColour).flash();
				playSound(randomChosenColour);
				if (iter >= level){
					playerInteract = true;
					playerClicks = 0;
				}
			}, iter*2000);
		})(i);
	}
}

function checkAnswer(){
	console.log(userChosenPattern);
	console.log(gamePattern);
	if (userChosenPattern.toString() === gamePattern.toString()){
		level++;
		$("h1").text("You got it correct!");
	} 
	else{
		$("h1").text("You got it wrong! Try again");
	}

	setTimeout(function(){
		nextSequence();
	}, 1500);
}