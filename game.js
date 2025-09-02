var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour = buttonColours[nextSequence()];

var gamePattern = [];

gamePattern.push(randomChosenColour);

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    return randomNumber;
}

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
	this.prepend("<audio><source src='./sounds/"+randomChosenColour+".mp3' type='audio/mp3'/></audio>");
	this[0].firstChild.play();
};

$(document).on("keypress", function(event){
	if (event.originalEvent.key === "a"){
		$("."+randomChosenColour).flash();
	}
});

