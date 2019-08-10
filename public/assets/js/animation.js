import { cells } from './grid.js';
import animals from './static/animals.js';
import { Animal } from './static/classes.js';
import { xnum, ynum } from './static/constants.js'
import { printSpeech, animalVisit } from './conversation.js';

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
		regrowCell(animals[i].y*xnum+animals[i].x);

		var nextX, nextY, newCellNumber;
		var nextStep = false;

		do {
			nextX = animals[i].x + Math.floor(Math.random()*3)-1;
			nextY = animals[i].y + Math.floor(Math.random()*2)-1;

			newCellNumber = nextY*xnum + nextX;

			if(newCellNumber > ynum*xnum || newCellNumber < 0)  nextStep = true
			else if(!cells[newCellNumber].occupant) nextStep = true

		} while (nextStep === false)

		animals[i].x = nextX;
		animals[i].y = nextY;

		//if goat goes offscreen
		if(newCellNumber > ynum*xnum || newCellNumber < 0)
			animals.splice(i, 1);

		else{
			cells[newCellNumber].occupant = animals[i];
			$('#'+newCellNumber).html(animals[i].symbol).css({'color': animals[i].color})
			animalVisit(newCellNumber);
		}
	}
}

async function goatEvent() {
	console.log('goat time');
	//select a spawn cell from the bottom row
	var cellNumber = (ynum-1)*xnum + Math.floor(Math.random()*90);
	var spawnCell = cells[cellNumber];

	var numGoats = Math.round(Math.random()*20)+10;
	var goatX = cellNumber - (ynum-1)*xnum;
	var goatY = ynum-1;

	var goats = [];
	//populate cells within 20 squares of the spawn cell with goats
	var goatShades = animals.goat.shades;

	for(var i=0; i<numGoats; i++){
			var x = goatX + Math.floor(Math.random()*15);
			var y = goatY - Math.floor(Math.random()*5);
			var cellNumber = y*xnum+x;

			var shade = goatShades[Math.floor(Math.random()*(goatShades.length))];
			var goat = new Animal(x, y, "damascus goat", animals.goat.arabic, 
				animals.goat.type, animals.goat.personality, animals.goat.symbol, shade, animals.goat.speech);

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

	console.log('goat zero we have reached goat zero', goats.length)
}

function reset() {
	console.log('gd morning friends')
}

function eachHour() {
	console.log('an hour!!')
}

function eachMinute() {
	goatEvent();
}

function eachTenSeconds() {
	//find some animals/plant's speech and print it
	printSpeech();

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

		if(today.getSeconds()%10 === 0){
			eachTenSeconds();
		}

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