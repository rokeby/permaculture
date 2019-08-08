function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function goatEvent() {
	console.log('GOOOAAAATS')
}

function reset() {
	console.log('gd morning friends')
}

function eachHour() {
	console.log('an hour!!')
}

function eachMinute() {
	console.log('a minute!!')
}

function eachSecond() {
	$('.water').each( function() {
		var wave = $( this ).html() === "~" ? '≈' : "~"
		$( this ).html(wave);
	})	
}

//queries the time every second, runs regular events
async function runMainLoop(){

	while(true){
		var today = new Date();

		if(today.getSeconds() === 0){
			eachMinute();
		}

		if(today.getMinutes() === 0){
			eachHour();
		}

		if(today.getHours() === 0){
			reset();
		}

		eachSecond();
		await sleep(1000);

	}
}



export default {goatEvent, runMainLoop};