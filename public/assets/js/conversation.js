import { cells } from './grid.js';

function printSpeech() {
	var chosenAgent = false;
	var speech, randCellNumber, randCell;

	do{
		//get a random cell
		randCellNumber = Math.floor(Math.random()*60*110);
		randCell = cells[randCellNumber];

		if(randCell.occupant){
			if(randCell.occupant.speech) {
				chosenAgent = true
				speech = randCell.occupant.speech;
			}
		}
		else if(randCell.plant){
			if(randCell.plant.speech) {
				chosenAgent = true
				speech = randCell.plant.speech;
			}
		}
		else if(randCell.substrate.speech){
			chosenAgent = true;
			speech = randCell.substrate.speech;
		}

		//see if it has speech associated with it
	} while(chosenAgent === false);

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
		cells[cellNumber].plant.speech =  "oo err";
	}

	else {
		cells[cellNumber].substrate.speech =  "careful with those hooves";
	}

	$('#' + cellNumber).css({'background-color': 'red'})
}


export { animalVisit, printSpeech };