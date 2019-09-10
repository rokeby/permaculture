import { xnum, ynum } from './static/constants.js';
import { zoneColors } from './static/zones.js';
import { cells } from './grid.js';
import { goats } from './animation.js';

function getCloseCompanions(cell) {
    var y = Math.floor(cell.id/xnum);
    var x = cell.id - y*xnum;
    $(`#${cell.id}`).css({'background-color': 'orange'});
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
}

function showSpeech (agent) {
    if ( $('.speechpanel').is(":visible") ){
        hideSpeech();
    }

    else{
        var $speechPanel =  $('<div/>', {
            class: 'speechpanel',
        })
        .appendTo('#container')
        .html(agent.narrative)

        $speechPanel.scrollTop($($speechPanel)[0].scrollHeight);
    }
}

function hideSpeech () {
    $('.speechpanel').remove();
}

function showInfo (cellID) {
    hideSpeech();
    var cell = cells[cellID];
    revertCompanions();
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
    .html(cell.substrate.name + "   " + "[<font color= "+ cell.substrate.color +">" + cell.substrate.symbol + "</font>]" + "<br>" +
     "<p class='artext' lang='ar'>" + cell.substrate.arabic + "</p>" + "<br>" +
        "a kind of " + cell.substrate.type + "</br> </br>")

    $('<span/>', {
        class: 'companion',
        click: (function(){   showSpeech(cell.substrate) }),
    }).appendTo($symbolInfo)
    .html("show narrative")

    if(cell.plant && $('.infopanel').is(":visible")){
        var companions = getCloseCompanions(cell);
        var $plantInfo = $('<div/>', {
            class: 'infobox',
        }).appendTo('.infopanel')

        var $symbolInfo =  $('<p/>', {
            class: 'symbolinfo',
        })
        .appendTo($plantInfo)
        .html(cell.plant.name + "   " + "[<font color= "+ cell.plant.color +">" + cell.plant.symbol + "</font>]" + "<br>" +
            "<p class='artext' lang='ar'>" + cell.plant.arabic + "</p>" + "<br>" +
            "<i>" + cell.plant.latin + "</i>" + "</br>" + "a kind of " + cell.plant.type + "</br></br>")
      
        if(cell.plant.notes !== '') $symbolInfo.append(cell.plant.notes + "</br> </br>" )

        $('<span/>', {
            class: 'companion',
            click: (function(){ showSpeech(cell.plant) } ),
        }).appendTo($symbolInfo)
        .html("show narrative")
      
        if(companions.length !== 0) {
            $symbolInfo.append("</br> </br> nearby companions: </br>")
            for(var i=0; i<companions.length; i++){
                var $companion = $('<span/>', {
                    //this is soooo bad and hacky but you can't give things cell ids without all kinds
                    //of bad stuff happening so this is the solution xoxo
                    id: 'comp'+companions[i].id,
                    class: 'companion',
                    click: (function(){   $('.infopanel').toggle(), showInfo(this.id.substring(4)) } ),
                }).html(companions[i].plant.name +"</br>")
                .mouseenter(function(friend) { 
                    hideSpeech();
                    $(`#${this.id.substring(4)}`).css({'background-color': 'orange'});
                    })
                .mouseleave(function() { 
                    $(`#${this.id.substring(4)}`).css({'background-color': 'lightblue'})
                    })

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
        .html(cell.occupant.name + "   " + "[<font color= "+ cell.occupant.color +">" + cell.occupant.symbol + "</font>]" + "<br>" +
            "<p class='artext' lang='ar'>" + cell.occupant.arabic + "</p>" + "<br>" +
            "</br>" + "a kind of " + cell.occupant.type + "</br></br>")

        $('<span/>', {
            class: 'companion',
            click: (function(){   showSpeech(occupant) } ),
        }).appendTo($symbolInfo)
        .html("show narrative")
    }

}

export { showInfo };