import cells from './grid.js';
import animals from './static/animals.js';


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function regrowCell(cellNumber){
	var cell = cells[cellNumber];

	$('#'+cellNumber).html(cell.substrate.symbol).css({'color': cell.substrate.color})

	if(cell.plant){
		$('#'+cellNumber).html(cell.plant.symbol).css({'color': cell.plant.color})
	}

	cell.occupant = false;
}


function moveAnimals(animals) {

	for(var i=0; i<animals.length; i++){
		regrowCell(animals[i].y*110+animals[i].x);

		var nextX, nextY, newCellNumber;
		var nextStep = false;

		do {
			nextX = animals[i].x + Math.floor(Math.random()*3)-1;
			nextY = animals[i].y + Math.floor(Math.random()*2)-1;

			newCellNumber = nextY*110 + nextX;

			if(newCellNumber > 60*110 || newCellNumber < 0)  nextStep = true
			else if(!cells[newCellNumber].occupant) nextStep = true

		} while (nextStep === false)

		animals[i].x = nextX;
		animals[i].y = nextY;

		//if goat goes offscreen
		if(newCellNumber > 60*110 || newCellNumber < 0)
			animals.splice(i, 1);

		else{
			cells[newCellNumber].occupant = animals[i];
			$('#'+newCellNumber).html(animals[i].symbol).css({'color': animals[i].color})
		}

	}
}

async function goatEvent() {
	console.log('goat time');
	//select a spawn cell from the bottom row
	var cellNumber = 59*110 + Math.floor(Math.random()*90);
	var spawnCell = cells[cellNumber];

	var numGoats = Math.round(Math.random()*20)+10;
	var goatX = cellNumber - 59*110;
	var goatY = 59;

	var goats = [];
	//populate cells within 20 squares of the spawn cell with goats
	var goatShades = animals.goat.shades;

	for(var i=0; i<numGoats; i++){
			var goat = {};
			var x = goatX + Math.floor(Math.random()*15);
			var y = goatY - Math.floor(Math.random()*5);
			var cellNumber = y*110+x;

			var shade = goatShades[Math.floor(Math.random()*(goatShades.length))];
			goat.x = x;
			goat.y = y;
			goat.color = shade;	
			goat.symbol = animals.goat.symbol;
			goat.name = "goat";
			goats.push(goat);

			cells[cellNumber].occupant = goat;

			$('#'+cellNumber).css({
				'color': shade
			}).html(animals.goat.symbol)
	}

	do{
		moveAnimals(goats);
		await sleep(1000);
	} while(goats.length > 0);
}

function reset() {
	console.log('gd morning friends')
}

function eachHour() {
	console.log('an hour!!')
	goatEvent();
}

function eachMinute() {

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