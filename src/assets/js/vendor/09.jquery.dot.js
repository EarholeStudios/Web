(function($) {
	$.fn.dot = function(xVal,yVal,close,hint) {

		var dotSettings = $.extend({
			id : this,
			durationVal : Math.floor(Math.random()*7+1),
			repeatVal : Math.floor(Math.random()*5+1),
			soundLoop : Math.floor(Math.random()*2),
			color : [
				'#333333',
				'#666666',
				'#121212',
				'#cf3737',
				'#e65757',
				'#ff2929',
				'#e55d5d',
				'#6f2b2b'
			],
			sizeVal : Math.floor(Math.random()*200+1),
			action : function(num,dur,rep,sound) {
				switch(num) {
					case 0 :
						// PULSE
						//console.log("pulse: duration-"+dur+"s, number of repeats-"+rep+", does sound loop-"+sound);

						function completeFunction() {
							dotSettings.destroyAction(Math.floor(Math.random()*2));
						}

						var tl = new TimelineMax({repeat: rep, onComplete:completeFunction});
						tl.to(dotSettings.id, dur, {width:20, height:20, x: dotSettings.sizeVal/2, y: dotSettings.sizeVal/2}).to(dotSettings.id, dur, {width:dotSettings.sizeVal, height:dotSettings.sizeVal, x: 0, y: 0});

					break;
					case 1 :
						// CURVES RIGHT
						//console.log("curves: duration-"+dur+"s, number of repeats-"+rep+", does sound loop-"+sound);

						function completeFunction() {
							dotSettings.destroyAction(Math.floor(Math.random()*2));
						}

						TweenMax.to(dotSettings.id, dur, {bezier:[{x:Math.floor(Math.random()*500), y:Math.floor(Math.random()*500)}, {x:Math.floor(Math.random()*5000), y:Math.floor(Math.random()*5000)}/*,  {x:Math.floor(Math.random()*500), y:Math.floor(Math.random()*500)} */], ease:Power1.easeInOut, onComplete:completeFunction});


					break;
					case 2 :
						// CURVES LEFT
						//console.log("curves: duration-"+dur+"s, number of repeats-"+rep+", does sound loop-"+sound);

						function completeFunction() {
							dotSettings.destroyAction(Math.floor(Math.random()*2));
						}

						TweenMax.to(dotSettings.id, dur, {bezier:[{x:Math.floor(Math.random()*-500), y:Math.floor(Math.random()*-500)}, {x:Math.floor(Math.random()*-5000), y:Math.floor(Math.random()*-5000)}/*,  {x:Math.floor(Math.random()*500), y:Math.floor(Math.random()*500)} */], ease:Power1.easeInOut, onComplete:completeFunction});


					break;
					case 3 :
						// RUNAWAY
						//console.log("runaway: duration-"+dur+"s, number of repeats-"+rep+", does sound loop-"+sound);

						function completeFunction() {
							dotSettings.destroyAction(Math.floor(Math.random()*2));
						}

						var tl = new TimelineMax({repeat: rep, onComplete:completeFunction});
						tl.to(dotSettings.id, dur, {width:20, height:20}).to(dotSettings.id, dur, {width:dotSettings.sizeVal, height:dotSettings.sizeVal});

					break;
					case 4 :
						// CIRCLE
						var val1 = Math.floor(Math.random()*500),
							val2 = Math.floor(Math.random()*500),
							val3 = Math.floor(Math.random()*500);

						function completeFunction() {
							dotSettings.destroyAction(Math.floor(Math.random()*2));
						}

						TweenMax.to(dotSettings.id, dur, {bezier:[{x:val1, y:val2}, {x:val3, y:0}, {x:0, y:0}], ease:Linear.easeNone, repeat: rep, onComplete:completeFunction});


					break;
				}
			},
			destroyAction : function(num) {
				switch(num) {
					case 0 :
						// Grow and Fade Out
						//console.log("Grow and Fade Out");

						dotSettings.id.remove();

					break;
					case 1 :
						// Shrink and Fade Out
						//console.log("Shrink and Fade Out");

						dotSettings.id.remove();

					break;
				}
			}

		}, xVal,yVal,close);

		function init() {

			var bool = Math.floor(Math.random()*2);
			if(bool == 0) {
				dotSettings.id.css({
					'border-style' : 'solid',
					'border-color' : dotSettings.color[Math.floor(Math.random()*8)],
					'border-width' : Math.floor(Math.random()*10),
					'width' : dotSettings.sizeVal,
					'height' : dotSettings.sizeVal,
					'top' : yVal,
					'left' : xVal,
					'opacity' : '0.'+ Math.floor(Math.random()*9+1)
				});
			} else {
				dotSettings.id.css({
					'background-color' : dotSettings.color[Math.floor(Math.random()*8)],
					'width' : dotSettings.sizeVal,
					'height' : dotSettings.sizeVal,
					'top' : yVal,
					'left' : xVal,
					'opacity' : '0.'+ Math.floor(Math.random()*9+1)

				});
			}

			if(close) {
				dotSettings.action(2,dotSettings.durationVal,dotSettings.repeatVal,dotSettings.soundLoop); //Math.floor(Math.random()*4)
			} if(hint) {
				dotSettings.action(3,2,0,dotSettings.soundLoop);
			} else {
				dotSettings.action(Math.floor(Math.random()*5),dotSettings.durationVal,dotSettings.repeatVal,dotSettings.soundLoop); //Math.floor(Math.random()*4)
			}

		}

		return init();

	};
}(jQuery));
