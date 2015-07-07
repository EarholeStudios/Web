$(document).ready(function () {
  if (!$('body').hasClass('index')) return;

  /**
   * Setup
   */
  var samples    = window.samples || []
  ,   soundtrack = window.soundtrack || [];

  samples = samples.map(function (sound) {
    return '/assets/sounds/samples/' + sound;
  });

  soundtrack = soundtrack.map(function (sound) {
    return '/assets/sounds/soundtrack/' + sound;
  });


  $(function() {
  	var objectCounter = 0;
  	var autoPopulate = null;
  	var hintInterval = '';

  	var firstClick = true,
  		eightBitSounds = {},
  		eightBitFiles = samples,
  		loops = {},
  		backgroundLoops = soundtrack,
  		firstLoop = Math.floor(Math.random()*backgroundLoops.length);

  	for(var i in eightBitFiles) {
  		var soundFile = eightBitFiles[i];
  		eightBitSounds[i] = new buzz.sound(soundFile, {
  			formats: ["ogg", "mp3"]
  		});
  	}

  	for(var i in backgroundLoops) {
  		var soundFile = backgroundLoops[i];
  		loops[i] = new buzz.sound(soundFile, {
  			formats: ["ogg", "mp3"],
  			loop: true
  		});
  	}

  	$('.playground').on('mouseover', function(event){
  		var stucture = '<div class="object" id="'+objectCounter+'"></div>';
  		$('body').append(stucture);
  		$('#'+objectCounter).dot(event.pageX,event.pageY,false,true);
  		objectCounter++;
  	});

  	$('.playground').on('click', function(event){
  		$('#close-board').fadeIn();
  		$('#board').show();
  		if(firstClick) {
  			clearInterval(hintInterval);
  			loops[firstLoop].play();
  			autoPopulate = setInterval(function(){
  				for(i=0;i<Math.floor(Math.random()*20+5);i++) {
  					var stucture = '<div class="object" id="'+objectCounter+'"></div>';
  					$('.playground').append(stucture);
  					$('#'+objectCounter).dot(Math.floor(Math.random()*2000), Math.floor(Math.random()*2000));
  					objectCounter++;
  				}

  				eightBitSounds[Math.floor(Math.random()*eightBitFiles.length)].play();
  			}, 2000);

  			firstClick = false;
  		}
  		for(i=0;i<Math.floor(Math.random()*20+5);i++) {
  			var stucture = '<div class="object" id="'+objectCounter+'"></div>';
  			$('.playground').append(stucture);
  			$('#'+objectCounter).dot(event.pageX, event.pageY);
  			objectCounter++;
  		}

  		eightBitSounds[Math.floor(Math.random()*eightBitFiles.length)].play();
  	});


  	$('.playground').on('click', function(event){

  		for(i=0;i<Math.floor(Math.random()*20+5);i++) {
  			var stucture = '<div class="object" id="'+objectCounter+'"></div>';
  			$('.playground').append(stucture);
  			$('#'+objectCounter).dot(event.pageX, event.pageY);
  			objectCounter++;
  		}
  		eightBitSounds[Math.floor(Math.random()*eightBitFiles.length)].play();
  	});

  	$('#close-board').on('click', function(event){
  		for(i=0;i<20;i++) {
  			var stucture = '<div class="object" id="'+objectCounter+'"></div>';
  			$('body').append(stucture);
  			$('#'+objectCounter).dot(event.pageX, event.pageY,true);
  			objectCounter++;
  		}

  		clearInterval(autoPopulate);

  		$(this).hide();
  		$('#board').fadeOut('slow');
  		loops[firstLoop].stop();
  		setTimeout(function(){
  			$('.object').remove();
  		}, 7000);

  		firstClick = true;
  		firstLoop = Math.floor(Math.random()*backgroundLoops.length);

  		eightBitSounds[0].play();
  	});

  	hintInterval = setInterval(function() {
  		var stucture = '<div class="object" id="'+objectCounter+'"></div>';
  		$('.playground').append(stucture);
  		$('#'+objectCounter).dot(Math.floor(Math.random()*100+60),Math.floor(Math.random()*100+60),false,true);
  		objectCounter++;
  	}, 3000);
  });
});
