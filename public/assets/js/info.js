import { xnum, ynum } from './static/constants.js';
import { zoneColors } from './static/zones.js';
import { cells } from './grid.js';
import { goats } from './animation.js';

function getCloseCompanions(cell) {
    var y = Math.floor(cell.id/xnum);
    var x = cell.id - y*xnum;
    var companions = [];
    for(var i=-4; i<5; i++){
        for(var j=-4; j<5; j++){
            if(cells[(y+j)*xnum+x+i]) {
                if(cells[(y+j)*xnum+x+i].plant && cell.plant)  {
                    if(cell.plant.companions.some(c => c === cells[(y+j)*xnum+x+i].plant.name)) 
                        {
                            $(`#${(y+j)*xnum+x+i}`).css({'background-color': 'lightblue'});
                            if(!(companions.some(d => d.plant.name === cells[(y+j)*xnum+x+i].plant.name)))
                                companions.push(cells[(y+j)*xnum+x+i])
                        }
                }
            }
        }
    }
    return companions;
}

function revertCompanions() {
    for(var i=0; i<xnum; i++){
        for(var j=0; j<ynum; j++){
            var color = zoneColors[cells[j*xnum + i].zone - 1];
            $(`#${j*xnum + i}`).css({'background-color': color});                
        }
    }
    return [];
}

function showSpeech (agent, offset) {
    hideSpeech();
    var $speechPanel =  $('<div/>', {
        class: 'speechpanel',
    })
    .css({'top': offset-$(window).scrollTop()})
    .mouseleave(function() { hideSpeech()})
    .appendTo('#container')
    .html(agent.narrative)

    $speechPanel.scrollTop($($speechPanel)[0].scrollHeight);
}

function hideSpeech () {
    $('.speechpanel').remove();
}

function showInfo (cellID) {
    hideSpeech();
    var cell = cells[cellID];
    var companions = $('.infopanel').is(":visible") ? revertCompanions() : getCloseCompanions(cell) 
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
    .html(cell.substrate.name + "   " + "[<font color= "+ cell.substrate.color +">" + cell.substrate.symbol + "</font>]" + "<br>" +
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
        //.mouseleave(function() { hideSpeech()})
        .html(cell.plant.name + "   " + "[<font color= "+ cell.plant.color +">" + cell.plant.symbol + "</font>]" + "<br>" +
            "<p class='artext' lang='ar'>" + cell.plant.arabic + "</p>" + "<br>" +
            "<i>" + cell.plant.latin + "</i>" + "</br>" + "a kind of " + cell.plant.type)
      
        if(cell.plant.notes !== '') $symbolInfo.append("</br> </br>" + cell.plant.notes)
      
        if(companions.length !== 0) {
            $symbolInfo.append("</br> </br> nearby companions: </br>")
            for(var i=0; i<companions.length; i++){
                var $companion = $('<span/>', {
                    id: companions[i].id,
                    class: 'companion',
                    click: (function(){  $('.infopanel').toggle(), showInfo(this.id) } ),
                }).html(companions[i].plant.name +"</br>")

                $symbolInfo.append($companion)
            }
        }
      }

    if(cell.occupant){
        var occupant = cell.occupant.parentArray[cell.occupant.id];

        var $occupantInfo = $('<div/>', {
            class: 'infobox',
        }).appendTo('.infopanel')

        var $symbolInfo =  $('<p/>', {
            class: 'symbolinfo',
        })
        .appendTo($occupantInfo)
        .mouseenter(function() { showSpeech(occupant, ($occupantInfo).offset().top)})
        //.mouseleave(function() { hideSpeech()})
        .html(cell.occupant.name + "   " + "[<font color= "+ cell.occupant.color +">" + cell.occupant.symbol + "</font>]" + "<br>" +
            "<p class='artext' lang='ar'>" + cell.occupant.arabic + "</p>" + "<br>" +
            "</br>" + "a kind of " + cell.occupant.type)

    }

}

export { showInfo };