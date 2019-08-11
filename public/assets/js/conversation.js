import { cells } from './grid.js';

function printSpeech() {
	var speech;
	var randCellNumber = Math.floor(Math.random()*60*110);
	var randCell = cells[randCellNumber];

	//get a random cell
	if(randCell.occupant){
		speech = randCell.occupant.speech[randCell.occupant.speech.length-1];
	}

	else if(randCell.plant){
		speech = randCell.plant.speech[randCell.plant.speech.length-1];
	}
	else {
		speech = randCell.substrate.speech[randCell.substrate.speech.length-1];
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
		.html(speech)
		.appendTo('#container')

}

function animalVisit(cellNumber) {

	if(cells[cellNumber].plant){
		cells[cellNumber].plant.speech.push("oo err");
	}

	else {
		cells[cellNumber].substrate.speech.push("careful with those hooves");
	}
}


export { animalVisit, printSpeech };