import { cells, getEntries } from './grid.js';
import { goats } from './animation.js';
import { Speech } from './static/classes.js';
import { xnum, ynum } from './static/constants.js';
import { typeMapping, messageMapping } from './static/messages.js';

function getMessageType (sender, receiver) {
	//filters for message type from the sender type, and to the receiver type
	var fromSender = getEntries(typeMapping, "senderType", sender);
	var toReceiver = getEntries(fromSender, "receiverType", receiver);
	var messageType = toReceiver[0].messageType;

	return messageType;
}

function getMessage (type, personality) {
	console.log(type, personality);
	var messageArr = messageMapping[type][personality];
	var message = messageArr[Math.floor(Math.random()*messageArr.length)];
	return message;
}


function conversation(sender, receiver) {
	var messageType = getMessageType(sender.type, receiver.type);
	var responseType = getMessageType(receiver.type, sender.type);
	var message = getMessage(messageType, sender.personality);
	var response = getMessage(responseType, receiver.personality);

	var messageSpeech = new Speech(sender, receiver, message, Date.now() );
	var responseSpeech = new Speech(receiver, sender, response, Date.now() );

// /	receiver.speech.push(messageSpeech);
	receiver.speech.push(responseSpeech);
	sender.speech.push(messageSpeech);
//	sender.speech.push(responseSpeech);

	console.log(message, response);
}

function getReceiver(cellNumber, sender) {
	var chosenCell = false;
	var randX, randY;
	var x = cellNumber%xnum;
	var y = Math.floor(cellNumber/xnum);

	//pick a cell in the surrounding 9x9 area
	do {
		randX = x + Math.round(Math.random()*9)-4;
		randY = y + Math.round(Math.random()*9)-4;

		//check in bounds
		if(cells[randY*xnum + randX]){
			chosenCell = true;
		}

	} while(chosenCell === false)

	return cells[randY*xnum + randX];
}

function ambientSpeech() {
	var sender;
	var randCellNumber = Math.floor(Math.random()*ynum*xnum);
	var randCell = cells[randCellNumber];

	//get a random cell
	if(randCell.occupant){
		sender = randCell.occupant;
	}
	else if(randCell.plant){
		sender = randCell.plant;
	}
	else {
		sender = randCell.substrate;
	}

	var receiverCell = getReceiver(randCellNumber, sender);
	var receiver = receiverCell.plant ? receiverCell.plant : receiverCell.substrate;

	conversation(sender, receiver);


	//comment out for now: ambient speach printing
	// var senderCellPos = $("#"+randCellNumber).position();
	// var receiverCellPos = $("#"+receiverCell.id).position();

	// //$('.speechbox').remove()
	// //put speech above cell
	// $('<div/>', {
	// 		class: "speechbox",
	// 	})
	// 	.css({
	// 		left: senderCellPos.left,
	// 		top: senderCellPos.top-20,
	// 	})
	// 	.html('['+sender.symbol+'] '+ sender.speech[sender.speech.length-1].message)
	// 	.appendTo('#container')

	// $('<div/>', {
	// 		class: "speechbox",
	// 	})
	// 	.css({
	// 		left: receiverCellPos.left,
	// 		top: receiverCellPos.top-20,
	// 	})
	// 	.html('['+receiver.symbol+'] '+ receiver.speech[receiver.speech.length-1].message)
	// 	.appendTo('#container')

}

function printSpeech() {
	var message, symbol;
	var randCellNumber = Math.floor(Math.random()*ynum*xnum);
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

	conversation(sender, receiver);

}


export { animalVisit, printSpeech, ambientSpeech, conversation };