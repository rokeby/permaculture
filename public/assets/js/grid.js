function generateGrid(){
    //subdivide the document into 10x10 squares to use as co-ordinate system
    squareSize = 17;

    // xnum = Math.floor($(document).width()/squareSize)
    // ynum = Math.floor($(document).height()/squareSize)

    // console.log('xnum ', xnum, 'ynum  ', ynum)
    leftMargin = ($(document).width() - Math.floor($(document).width()/squareSize)*squareSize)/2;
    topMargin = ($(document).height() - Math.floor($(document).height()/squareSize)*squareSize)/2;

    xnum = 110;
    ynum = 60;

    for(j=0; j<ynum; j++){
        for(i=0; i<xnum; i++){
            $('<div/>', {
                id: i+xnum*j,
                class: "gridElement"
            }).css({
            'width': squareSize,
            'height': squareSize,
            'left':squareSize*i+leftMargin+'px',
            'top':squareSize*j+topMargin+'px',
            'position':'fixed',
            }).html('җ')
            .appendTo( 'body' );
        }
    }
    gridSquares = xnum*ynum;
    console.log(gridSquares);
}

generateGrid();