import { cells } from './grid.js';
import { Speech } from './static/classes.js';

function printSpeech() {
	var message;
	var randCellNumber = Math.floor(Math.random()*60*110);
	var randCell = cells[randCellNumber];

	//get a random cell
	if(randCell.occupant){
		message = randCell.occupant.speech[randCell.occupant.speech.length-1].message;
	}

	else if(randCell.plant){
		message = randCell.plant.speech[randCell.plant.speech.length-1].message;
	}
	else {
		message = randCell.substrate.speech[randCell.substrate.speech.length-1].message;
	}

	var cellPos = $("#"+randCellNumber).position();

	// console.log('rand cell is', randCell)
	// $("#"+randCellNumber).css({'background-color': 'pink'})

	$('.speechbox').remove()
	//put speech above cell
	var $speechBox = $('<div/>', {
			class: "speechbox",
		})
		.css({
			left: cellPos.left-10,
			top: cellPos.top-10,
		})
		.html(message)
		.appendTo('#container')

}

function animalVisit(cellNumber) {
	var sender = cells[cellNumber].occupant;
	var receiver = cells[cellNumber].plant ? cells[cellNumber].plant : cells[cellNumber].substrate;
	var message = cells[cellNumber].plant ? "oo err" : "careful with those hooves";

	var speech = new Speech(sender.name, receiver.name, sender.type, receiver.type, message, Date.now() );
	receiver.speech.push(speech);
	sender.speech.push(speech);

}


export { animalVisit, printSpeech };