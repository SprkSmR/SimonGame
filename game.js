var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour = buttonColours[nextSequence()];

var gamePattern = [];

gamePattern.push(randomChosenColour);

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    return randomNumber;
}

$.fn.flash = function(times, duration) {
	var T = this;
  	times = times || 3;
 	duration = duration || 200;
        for ( var i=0; i < times; i++ ) {     	
			(function() {      		
				setTimeout(function() {
					T.fadeOut(duration, function() { 		    							
						T.fadeIn(duration);
					});
				}, i*duration*2+50);
			})
		(i);     
	} 
};