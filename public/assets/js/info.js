import { cells } from './grid.js';

function showSpeech (agent, offset) {
    console.log('hovering', agent, offset);
    var $speechPanel =  $('<div/>', {
        class: 'speechpanel',
    })
    .css({'top': offset})
    .html(agent.speech[0].message)
    .appendTo('#container')
}

function hideSpeech () {
    console.log('goodbye');
    $('.speechpanel').remove();
}

function showInfo (cellID) {
    var cell = cells[cellID];
    $('.infopanel').children().remove()
    $('.infopanel').toggle()
    
    $('.infopanel').html("<p style='padding:20px'> in " + cell.zoneName + "...</p>")

    var $substrateInfo =  $('<div/>', {
        class: 'infobox',
    })
    .appendTo('.infopanel')
    
    var $symbolInfo =  $('<p/>', {
        class: 'symbolinfo',
    })
    .appendTo($substrateInfo)
    .mouseenter(function() { showSpeech(cell.substrate, ($substrateInfo).offset().top)})
    .mouseleave(function() { hideSpeech()})
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
        .mouseenter(function() { showSpeech(cell.plant, ($plantInfo).offset().top)})
        .mouseleave(function() { hideSpeech()})
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
        .mouseenter(function() { showSpeech(cell.occupant, ($occupantInfo).offset().top)})
        .mouseleave(function() { hideSpeech()})
        .html(cell.occupant.name + "   " + "[" + cell.occupant.symbol + "]" + "<br>" +
            "<p class='artext' lang='ar'>" + cell.occupant.arabic + "</p>" + "<br>" +
            "</br>" + "a kind of " + cell.occupant.type)

    }

}

export { showInfo };