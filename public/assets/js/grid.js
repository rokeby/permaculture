import zones from './static/zones.js';
import plants from './static/plants.js';
import substrates from './static/substrates.js';
var cells = new Array(110*60);

function getEntries(array, type, val) {
  return array.filter(function (el) {
    return el[type] === val;
  });
}

function rollDice() {
    var rand = Math.random();
    var level;

    if(rand < 0.6) level = 'high';
    else if(rand < 0.9) level = 'med';
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

function getSubstrate(zone) {
    var level = rollDice();
    var entries = getEntries(substrates, zone, level);
    var substrate = entries[Math.floor(Math.random()*(entries.length))];
    
    //set substrate depth: random but as a function of zone
    substrate.depth = setDepth(zone);
    return substrate;
}

function getPlant(zone) {
    var level = rollDice();
    var entries = getEntries(plants, zone, level);
    var plant = entries[Math.floor(Math.random()*(entries.length))];

    return plant;
}

function generateGrid(){
    //subdivide the document into 10x10 squares to use as co-ordinate system
    var squareSize = 17;
    var leftMargin = ($(document).width() - Math.floor($(document).width()/squareSize)*squareSize)/2;
    var topMargin = ($(document).height() - Math.floor($(document).height()/squareSize)*squareSize)/2;

    var xnum = 110;
    var ynum = 60;

    for(var j=0; j<ynum; j++){
        for(var i=0; i<xnum; i++){
            var zone = zones.zones[j*xnum + i];
            var plant;
            var substrate = getSubstrate(zone);
            var symbol = substrate.symbol;
            var color = substrate.color;

            var cellObjects = [];
            cellObjects.push(substrate);

            var divClass = "square " + substrate.name.replace(/\s/g, '');

            if(Math.random() < substrate.fertility){
                plant = getPlant(zone);
                symbol = plant.symbol;
                color = plant.color;
                divClass = divClass + " " + plant.name.replace(/\s/g, '');
                
                cellObjects.push(plant);
            }

            $('<div/>', {
                id: i+xnum*j,
                class: divClass,
                click: (function(){ console.log(cells[this.id])} )
            }).css({
            'width': squareSize,
            'height': squareSize,
            'left':squareSize*i+leftMargin+'px',
            'top':squareSize*j+topMargin+'px',
            'color': color,
            'position':'absolute',
            }).html(symbol)
            .appendTo( '#container' );
        
        cells[j*xnum + i] = cellObjects;
        }
    }
}

generateGrid();