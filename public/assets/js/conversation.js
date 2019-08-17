import { cells, getEntries } from './grid.js';
import { goats } from './animation.js';
import { Speech } from './static/classes.js';
import { typeMapping } from './static/messages.js';

function getMessageType (sender, receiver) {
	//filters for message type from the sender type, and to the receiver type
	var fromSender = getEntries(typeMapping, "senderType", sender);
	var toReceiver = getEntries(fromSender, "receiverType", receiver);
	var messageType = toReceiver[0].messageType;

	return messageType;
}

function printSpeech() {
	var message, symbol;
	var randCellNumber = Math.floor(Math.random()*60*110);
	var randCell = cells[randCellNumber];

	//get a random cell
	if(randCell.occupant){
		message = randCell.occupant.speech[randCell.occupant.speech.length-1].message;
		symbol = randCell.occupant.symbol;
	}

	else if(randCell.plant){
		message = randCell.plant.speech[randCell.plant.speech.length-1].message;
		symbol = randCell.plant.symbol;
	}
	else {
		message = randCell.substrate.speech[randCell.substrate.speech.length-1].message;
		symbol = randCell.substrate.symbol;
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
			left: cellPos.left,
			top: cellPos.top-20,
		})
		.html('['+symbol+'] '+message)
		.appendTo('#container')

}

function animalVisit(cellNumber) {
	var senderID = cells[cellNumber].occupant.id;
	var sender = goats[senderID];
	var receiver = cells[cellNumber].plant ? cells[cellNumber].plant : cells[cellNumber].substrate;

	var message = getMessageType(sender.type, receiver.type);

	var speech = new Speech(sender.name, receiver.name, sender.type, receiver.type, message, Date.now() );
	receiver.speech.push(speech);
	sender.speech.push(speech);

}


export { animalVisit, printSpeech };