import cells from './grid.js';

function printSpeech() {
	var chosenAgent = false;
	var speech;
	var randCellNumber = Math.floor(Math.random()*60*110);
	var randCell = cells[randCellNumber]

	do{
		//get a random cell
		
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

function animalVisit(animal, cell) {

	animal.speech = "hello hello";
	cell.occupant.speech = animal.speech;

	if(cell.plant){
		cell.plant.speech = "oo err";
	}

	else {
		cell.substrate.speech ="careful with those hooves";
	}
}

export default { animalVisit, printSpeech };