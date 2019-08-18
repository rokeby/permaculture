import { zones, zoneNames } from './static/zones.js';
import plantNames from './static/plants.js';
import substrateNames from './static/substrates.js';
import { xnum, ynum } from './static/constants.js';
import {Cell, Plant, Substrate, Speech} from './static/classes.js';
import { runMainLoop } from './animation.js';
import { showInfo } from './info.js';
var cells = new Array(xnum*ynum);

function getEntries(array, type, val) {
  return array.filter(function (el) {
    return el[type] === val;
  });
}

function rollDice() {
    var rand = Math.random();
    var level;

    if(rand < 0.8) level = 'high';
    else if(rand < 0.95) level = 'med';
    else level = 'low';

    return level;
}

function setDepth(zone) {
    var depth = (4-zone)/3*Math.random();
    var level;

    if(depth < 0.5) level = 'shallow';
    else if(depth < 0.8) level = 'med';
    else level = 'deep';

    return level;
}

function getFlowers(plant) {
    var today = new Date();
    plant.flower = true;

    //month +1 as zero index
    var flowering = plant.flowering.some(x => x === today.getMonth() + 1 );
    return flowering;
}

function getFruits(plant) {
    var today = new Date();
    plant.fruit = true;

    //month +1 as zero index
    var fruiting = plant.fruiting.some(x => x === today.getMonth() + 1 );
    return fruiting;
}

function getSubstrate(zone) {
    var entries = [];

    do{
        var level = rollDice();
        entries = getEntries(substrateNames, zone, level);
    }while (entries.length === 0)

    var substrateType = entries[Math.floor(Math.random()*(entries.length))];

    var speech = new Speech(substrateType, substrateType, substrateType.speech, Date.now());

    //set substrate depth: random but as a function of zone
    var depth = setDepth(zone);

    var substrate = new Substrate(substrateType.name, substrateType.arabic, substrateType.type, substrateType.personality, 
        substrateType.fertility, depth, substrateType.symbol, substrateType.color, speech )

    return substrate;
}

function getPlant(zone) {
    do{
        var level = rollDice();
        var entries = getEntries(plantNames, zone, level);
    } while (entries.length === 0)
    var plantType = entries[Math.floor(Math.random()*(entries.length))];
    //here create new plant

    var speech = new Speech(plantType, plantType, plantType.speech, Date.now());

    var plant = new Plant(plantType.name, plantType.arabic, plantType.type, plantType.soil, plantType.water, plantType.temp, 
        plantType.personality, speech, plantType.symbol, plantType.color, plantType.flowering, plantType.flowercolor)

    if(plantType.notes) plant.notes = plantType.notes;
    if(plantType.latin) plant.latin = plantType.latin;

    return plant;
}

var generateGrid = new Promise( function(resolve, reject){
    //subdivide the document into 10x10 squares to use as co-ordinate system
    var squareSize = 18;
    var leftMargin = ($(document).width() - Math.floor($(document).width()/squareSize)*squareSize)/2;
    var topMargin = ($(document).height() - Math.floor($(document).height()/squareSize)*squareSize)/2;

    for(var j=0; j<ynum; j++){
        for(var i=0; i<xnum; i++){
            var zone = zones[j*xnum + i];
            var plant;
            var substrate = getSubstrate(zone);
            var symbol = substrate.symbol;
            var color = substrate.color;

            var zoneName = zoneNames[zone]
            var id = j*xnum+i;
            var cell = new Cell(id, zoneName, substrate);

            var divClass = "square zone" + zone + " " + cellObjects.substrate.name.replace(/\s/g, '');

            if(Math.random() < substrate.fertility && zone !== 5){
                plant = getPlant(zone);
                symbol = plant.symbol;
                divClass = divClass + " " + plant.name.replace(/\s/g, '');
                
                cell.plant = plant;

                var flower = getFlowers(plant);

                color = flower ? plant.flowercolor : plant.color;
            }

            $('<div/>', {
                id: i+xnum*j,
                class: divClass,
                click: (function(){ showInfo(this.id) } )
            }).css({
            'width': squareSize,
            'height': squareSize,
            'left':squareSize*i+leftMargin+'px',
            'top':squareSize*j+topMargin+'px',
            'color': color,
            'position':'absolute',
            'text-align' : 'center',
            }).html(symbol)
            .appendTo( '#container' );
        
        cells[j*xnum + i] = cell;
        }
    }

    resolve('generated grid!!'); 
})

generateGrid.then(function(value) {
    runMainLoop();
});

export { cells, getEntries };