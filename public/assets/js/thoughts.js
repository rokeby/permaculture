import { addThought } from './narrative.js'
import { cells } from './grid.js'
import { xnum, ynum } from './static/constants.js'

function checkCompanions(plant) {
	return 'no friends here!'
}

// for now, just do soil depth
function checkPlantComfort(cell) {
	return false;
}

function expressComfort() {
	return "mm, all is good"
}

function expressDiscomfort(discomfort) {
	return "not good"
}


function haveThoughts() {
	//first pass -- pick a random cell, and if it has a plant, see if it is comfortable
	var randCellNumber = Math.floor(Math.random()*ynum*xnum);
	var randCell = cells[randCellNumber];
	var thinker, thought;

	if(randCell.plant){
		thinker = randCell.plant;
		var discomfort = checkPlantComfort(randCell);
		if(!discomfort) thought = checkCompanions(randCell.plant);
		else thought = expressDiscomfort(discomfort);
	}

	else {
		thinker = randCell.substrate;
		thought = expressComfort();
		// var discomfort = checkComfort(randCell.substrate);
		// if(!discomfort) thought = expressComfort();	
		// else thought = expressDiscomfort(discomfort);		
	}

	addThought(thinker, thought)
}

export { haveThoughts };