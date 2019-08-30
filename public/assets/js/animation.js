import { cells, animals } from './grid.js';
import animalNames from './static/animals.js';
import { Animal, Speech } from './static/classes.js';
import { xnum, ynum } from './static/constants.js'
import { printSpeech, ambientSpeech, animalVisit } from './conversation.js';
var goatZero = true;
var goats = [];

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


//for noodling animals
function moveAnimals(animals) {
	for(var i=0; i<animals.length; i++){
		if(animals[i]){
			regrowCell(animals[i].y*xnum+animals[i].x);

			var nextX, nextY, newCellNumber;
			var nextStep = false;

			do {
				nextX = (animals[i].x + Math.floor(Math.random()*3)-1)%xnum;
				nextY = (animals[i].y + Math.floor(Math.random()*3)-1)%ynum;

				newCellNumber = nextY*xnum + nextX;

				if(cells[newCellNumber])
				{
					if(!cells[newCellNumber].occupant && animals[i].zones.some(zone => cells[newCellNumber].zone === zone)) nextStep = true;
				}

			} while (nextStep === false)

			animals[i].x = nextX;
			animals[i].y = nextY;

			//test
			if(newCellNumber > ynum*xnum || newCellNumber < 0)
				console.log('the mod thing isnt working');

			else{
				cells[newCellNumber].occupant = animals[i];
				$('#'+newCellNumber).html(animals[i].symbol).css({'color': animals[i].color})
					//if (Math.random() < 0.05) animalVisit(newCellNumber); //1 in 20 chance of conversation
			}
		}
	}
}

//moves animals (e.g. goats) as a flock
function moveFlock(flock) {

	if(flock.every(element => element === undefined)) goatZero = true;

	for(var i=0; i<flock.length; i++){
		if(flock[i]){
			regrowCell(flock[i].y*xnum+flock[i].x);

			var nextX, nextY, newCellNumber;
			var nextStep = false;

			do {
				nextX = flock[i].x + Math.floor(Math.random()*3)-1;
				nextY = flock[i].y + Math.floor(Math.random()*2)-1;

				newCellNumber = nextY*xnum + nextX;

				if(!cells[newCellNumber]) nextStep = true;  //can wander off
				else if(!cells[newCellNumber].occupants && flock[i].zones.some(zone => cells[newCellNumber].zone === zone)) 
					nextStep = true;

			} while (nextStep === false)

			flock[i].x = nextX;
			flock[i].y = nextY;

			//if goat goes offscreen
			if(newCellNumber > ynum*xnum || newCellNumber < 0)
				delete flock[i];

			else{
				cells[newCellNumber].occupant = flock[i];
				$('#'+newCellNumber).html(flock[i].symbol).css({'color': flock[i].color})
				
				if (Math.random() < 0.1) animalVisit(newCellNumber); //1 in 10 chance of conversation
			}
		}
	}
}

async function goatEvent() {
	goatZero = false;
	goats = [];
	console.log('goat time');
	//select a spawn cell from the bottom row
	var cellNumber = (ynum-1)*xnum + Math.floor(Math.random()*90);
	var spawnCell = cells[cellNumber];

	var numGoats = Math.round(Math.random()*20)+10;
	var goatX = cellNumber - (ynum-1)*xnum;
	var goatY = ynum-1;

	//populate cells within 20 squares of the spawn cell with goats
	var goatShades = animalNames.goat.shades;

	for(var i=0; i<numGoats; i++){
			var x = goatX + Math.floor(Math.random()*15);
			var y = goatY - Math.floor(Math.random()*5);
			var cellNumber = y*xnum+x;

   			var speech = new Speech(animalNames.goat, animalNames.goat, animalNames.goat.speech, Date.now());


			var shade = goatShades[Math.floor(Math.random()*(goatShades.length))];
			var goat = new Animal(i, goats, x, y, animalNames.goat.name, animalNames.goat.arabic, animalNames.goat.zones,
				animalNames.goat.type, animalNames.goat.personality, animalNames.goat.symbol, shade, speech);

			goats.push(goat);
			cells[cellNumber].occupant = goat;

			$('#'+cellNumber).css({
				'color': shade
			}).html(animalNames.goat.symbol)
	}

	do{
		moveFlock(goats);
		await sleep(1000);
	} while(goatZero === false);
}

function reset() {
	console.log('gd morning friends');
}

function eachHour() {
	console.log('an hour!!')
}

function eachMinute() {
	if(goatZero) goatEvent();
}

function eachTenSeconds() {
	//find some animalNames/plant's speech and print it
	printSpeech();
}

function eachSecond() {
	$('.water').each( function() {
		var wave = $( this ).html() === "~" ? '≈' : "~"
		$( this ).html(wave);
	})
	
	moveAnimals(animals);
	for(var i=0; i<100; i++){
		ambientSpeech();
	}
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

		if(today.getMinutes() === 0 && today.getSeconds() === 0){
			eachHour();
		}

		if(today.getHours() === 0 && today.getMinutes() === 0 && today.getSeconds() === 0){
			reset();
		}

		eachSecond();
		await sleep(1000);

	}
}

export {goats, goatEvent, runMainLoop};