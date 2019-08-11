import { cells } from './grid.js';

function showInfo (cellID) {
    var cell = cells[cellID];
    $('.infopanel').children().remove()
    $('.infopanel').toggle()
    
    $('.infopanel').html("<p style='padding:20px'> in " + cell.zoneName + "...</p>")

    var $substrateInfo =  $('<div/>', {
        class: 'infobox',
    }).appendTo('.infopanel')
    
    var $symbolInfo =  $('<p/>', {
        class: 'symbolinfo',
    })
    .appendTo($substrateInfo)
    .html(cell.substrate.name + "   " + "[" + cell.substrate.symbol + "]" + "<br>" +
     "<p class='artext' lang='ar'>" + cell.substrate.arabic + "</p>" + "<br>" +
        "a kind of " + cell.substrate.type)

    if(cell.plant){
        var $plantInfo = $('<div/>', {
            class: 'infobox',
        }).appendTo('.infopanel')

        var $symbolInfo =  $('<p/>', {
                class: 'symbolinfo',
        })
        .appendTo($plantInfo)
        .html(cell.plant.name + "   " + "[" + cell.plant.symbol + "]" + "<br>" +
            "<p class='artext' lang='ar'>" + cell.plant.arabic + "</p>" + "<br>" +
            "<i>" + cell.plant.latin + "</i>" + "</br>" + "a kind of " + cell.plant.type)
      
        if(cell.plant.notes !== '') $symbolInfo.append("</br> </br>" + cell.plant.notes)
      }

    if(cell.occupant){
        var $occupantInfo = $('<div/>', {
            class: 'infobox',
        }).appendTo('.infopanel')

        var $symbolInfo =  $('<p/>', {
                class: 'symbolinfo',
        })
        .appendTo($occupantInfo)
        .html(cell.occupant.name + "   " + "[" + cell.occupant.symbol + "]" + "<br>" +
            "<p class='artext' lang='ar'>" + cell.occupant.arabic + "</p>" + "<br>" +
            "</br>" + "a kind of " + cell.occupant.type)

    }

}

export { showInfo };