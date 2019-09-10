import { addThought } from './narrative.js'
import { cells } from './grid.js'
import { xnum, ynum } from './static/constants.js'

function checkCompanions(plant) {
	return 'no friends here!'
}

function getTempLevel(temperature) {
	var celsius = (temperature - 32)/1.8;
	if(celsius > 30) return "hot"
	else if (celsius > 26) return "warm"
	else if (celsius > 22) return "med"
	else return "cool"
}

function checkPlantComfort(cell, temperature) {
	var tempLevel = getTempLevel(temperature)
	//temp
	if(cell.plant.temp === "hot")
		if(tempLevel === "warm") return "ooo, a little bit chilly"
		else if(tempLevel === "med" || tempLevel === 'cool') return "I am very! cold!"
	else if(cell.plant.temp === "warm")
		if(tempLevel === "hot") return "u know i'm a little hot right now"
		else if(tempLevel === "med") return "is anyone else a bit chilly today?"
		else if (tempLevel === 'cool') return "I am very! cold!"
	else if(cell.plant.temp === "med") 
		if(tempLevel === "hot") return "wowow it's hot I am h o t"
		else if(tempLevel === "warm") return "it's pretty hot today! phew!"
		else if (tempLevel === 'cool') return "oo, bit chilly today"
	else (cell.plant.temp === "cool")
		if(tempLevel === "hot" || tempLevel === "warm") return "omg it's too hot I am roasting!!"
		else if(tempLevel === "med") return "ugh stilllll too hot"

	//soil depth
	if(cell.plant.soil === 'deep')
		if(cell.substrate.depth === 'shallow' || cell.substrate.depth === 'med') return 'this soil is too shallow! ';

	else if(cell.plant.soil === 'med')		
		if(cell.substrate.depth === 'shallow') return 'this soil is too shallow! ';

	return false;
}

function expressComfort() {
	return "mm, all is good"
}

function expressDiscomfort(discomfort) {
	return discomfort
}


function haveThoughts(weatherData) {
	var temperature = weatherData.currently.temperature;

	//pick a random cell, and if it has a plant, see if it is comfortable
	var randCellNumber = Math.floor(Math.random()*ynum*xnum);
	var randCell = cells[randCellNumber];
	var thinker, thought;

	if(randCell.plant){
		thinker = randCell.plant;
		var discomfort = checkPlantComfort(randCell, temperature);
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