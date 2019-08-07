import zones from './static/zones.js'

function generateGrid(){
    //subdivide the document into 10x10 squares to use as co-ordinate system
    var squareSize = 17;
    var leftMargin = ($(document).width() - Math.floor($(document).width()/squareSize)*squareSize)/2;
    var topMargin = ($(document).height() - Math.floor($(document).height()/squareSize)*squareSize)/2;

    var xnum = 110;
    var ynum = 60;

    for(var j=0; j<ynum; j++){
        for(var i=0; i<xnum; i++){
            var color;
            if(zones.zones[j*xnum + i] === 1){
                color='red';
            }

            else if(zones.zones[j*xnum + i] === 2){
                color='blue';
            }

            else color='yellow';

            $('<div/>', {
                id: i+xnum*j,
                class: "gridElement"
            }).css({
            'width': squareSize,
            'height': squareSize,
            'left':squareSize*i+leftMargin+'px',
            'top':squareSize*j+topMargin+'px',
            'color': color,
            'position':'absolute',
            }).html('җ')
            .appendTo( '#container' );
        }
    }
}

generateGrid();