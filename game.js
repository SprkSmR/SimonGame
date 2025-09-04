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

var checkStart = true;
var level = 0;
var playerClicks = 0;
var playerInteract = false;
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userChosenPattern = [];
var tries = 3;

$(document).on("keypress", function(event){
	if (event.originalEvent.key === "a" && checkStart){
		checkStart = false; 
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
	$("h1").text("Level " + (level+1));
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

function gameOver(){
	tries = 3;
	checkStart = true;
	level = 0;
	$("h1").text("Press A Key to Start");
}

function checkAnswer(){
	console.log(userChosenPattern);
	console.log(gamePattern);
	var delay = 0;
	if (userChosenPattern.toString() === gamePattern.toString()){
		level++;
		if (level >= 5){
			delay = 2000;
			$("h1").text("You won the game!");
			$("body").addClass("game-won").flash();
			setTimeout(function(){
				$("body").removeClass("game-won");
			}, delay);
		}
		else{
			$("h1").text("You got it correct!");
		}
	} 
	else{
		delay=200;
		tries--;
		playSound("wrong");
		$("body").addClass("game-over");
		if (tries <= 0){
			$("h1").text("Sorry! You are out of luck, game over!");
		}
		else{
			$("h1").text("You got it wrong! Try again. "+(tries)+ " attempts remaining");
		}
		setTimeout(function(){
			$("body").removeClass("game-over");
		}, delay);
	}

	setTimeout(function(){
		if (tries <= 0 || level >= 5){
			gameOver();
			return
		}
		else{
			nextSequence();
		}
	}, 1500+delay);
}