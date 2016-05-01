Core.add(function(){

	var // declarations
	running = false,
	accumulator, lastTimestamp, frequency;

	var // settings
	updateFrequency = 60;

	var init = function(){
		accumulator = 0;
		frequency = 1000 / updateFrequency;
		lastTimestamp = timestamp();
	};

	// animation loop
	var animate = function(){
		if(running){
			requestAnimationFrame(animate);
			var now = timestamp();
			var elapsed = now - lastTimestamp;
			lastTimestamp = now;

			accumulator += elapsed;

			while (accumulator >= frequency){
				accumulator -= frequency;
				update(frequency);
			}

			render(elapsed);
		}
	};

	// render function
	var render = function(){
		var modules = Core.listModules();
		for(var i = 0; i < modules.length; i++){
			if(modules[i].render){ modules[i].render() }
		}
	};

	var update = function(dt){
		var modules = Core.listModules();
		for(var i = 0; i < modules.length; i++){
			if(modules[i].update){ modules[i].update(dt) }
		}
	};

	var start = function(){
		running = true;
		animate();
	};

	var stop = function(){
		running = false;
	};

	var timestamp = function(){
		var nowExists = window.performance && window.performance.now;
		return nowExists ? window.performance.now() : new Date().getTime();
	};

	init();

	start();

	return {
		id: 'loop',
		start: start,
		stop: stop,
		toggle: function(){
			running ? stop() : start();
		},
	};

});