const taksound = new Audio("/tak.mp3");
var isplaying = false;
var metronome = null;

/*
var seqname = document.getElementById("name").innerHTML;
var seqmeasure = document.getElementById("totalmeasure").innerHTML;
*/

var beat = 0;
var override = 0;
var beatmeasures = 2;
let womp = document.getElementById("measures").childElementCount;

function playTakSound() {

    makebabies();
    
    if(isplaying) {

        clearInterval(metronome);

        document.getElementById("beats").children[1].scrollIntoView({ behavior: "smooth", block: "center" });
        document.getElementById("beats").scrollLeft -= 1000;

        document.getElementById("measures").innerHTML = `<text>1</text>\n<text>2</text>`;

        document.getElementById("measures").children[1].scrollIntoView({ behavior: "smooth", block: "center" });
        document.getElementById("measures").scrollLeft -= 115;

        isplaying = false;

        document.getElementById("player").innerHTML = "PLAY";
        document.getElementById("player").style.backgroundColor = "#2176FF";
        document.getElementById("player").style.borderColor = "#3993DD";
        
        beat = 0;
        beatmeasures = 2;

        for (let dot of document.getElementsByClassName("dot")) { dot.style.backgroundColor = "#A8C69F"; }
        
    } else {

        isplaying = true;

        document.getElementById("player").innerHTML = "STOP";
        document.getElementById("player").style.backgroundColor = "#FF6B6B";
        document.getElementById("player").style.borderColor = "#FF9191";
        
        metronome = setInterval(function() {
            
            taksound.play();

            if ( beat < Number( document.getElementById("timesig").innerHTML.slice( 0, document.getElementById("timesig").innerHTML.indexOf("/") ) ) ) {

                if ( beat != 0 ) { document.getElementById(beat).style.backgroundColor = "#A8C69F"; }
                
                override += 4 / Number( document.getElementById("beatsperbeat").innerHTML );

                if ( override == 1 ) { override = 0; beat += 1; }
                
                document.getElementById(beat).style.backgroundColor = "#00171F";

                document.getElementById("beats").children[beat].scrollIntoView({ behavior: "smooth", block: "center" });

            } else {

                document.getElementById(beat).style.backgroundColor = "#A8C69F";
                beat = 1;
                document.getElementById(beat).style.backgroundColor = "#00171F";
                
                document.getElementById("beats").children[beat - 1].scrollIntoView({ block: "center" });
                document.getElementById("beats").children[beat].scrollIntoView({ behavior: "smooth", block: "center" });
            
                beatmeasures += 1;

                document.getElementById("measures").innerHTML += `<text>${beatmeasures}</text>`;
                document.getElementById("measures").children[beatmeasures - 2].scrollIntoView({ behavior: "smooth", block: "center" });

            }

            // updated timer to adjust for beatsperbeat [ override ]                Y
            // edit dot to flash on the same beatnote [ e.g. quavers ]              Y
            // implement feature for 1 + 2 + counting instead of rigid 1 2 3 4      Y
            // when sequencer                                                       N
            // when saving sharing editing                                          N
        
        }, 60000/Number(document.getElementById("bpmcount").innerHTML)/Number(document.getElementById("timesig").innerHTML.slice(document.getElementById("timesig").innerHTML.indexOf("/") + 1, document.getElementById("timesig").innerHTML.length))*document.getElementById("beatsperbeat").innerHTML)/4*Number(document.getElementById("beatsperbeat").innerHTML);

    }

}

function makebabies() {

    document.getElementById("dots").innerHTML = "";
    document.getElementById("beats").innerHTML = "";

    for ( let i = 0; i < Number( document.getElementById("timesig").innerHTML.slice( 0, document.getElementById("timesig").innerHTML.indexOf("/") ) ); i++ ) {

        document.getElementById("dots").innerHTML += `<span class = "dot" id = "${i+1}"></span>`;

    }

    for ( let i = 0; i < Number( document.getElementById("timesig").innerHTML.slice( 0, document.getElementById("timesig").innerHTML.indexOf("/") ) ) + 1; i++ ) {

        document.getElementById("beats").innerHTML += `<text style = "font-size: 20px;">${i}</text>`;
        if ( document.getElementById("beatsperbeat").innerHTML != 4 ) { document.getElementById("beats").innerHTML += `<text style = "font-size: 20px;">+</text>`; }

    }

}

var bpmcount = document.getElementById("bpmcount").innerHTML;

switch (true) {

    case bpmcount < 25:

        document.getElementById("bpmname").innerHTML = "Larghissimo";
        break;

    case bpmcount >= 25 && bpmcount < 40:

        document.getElementById("bpmname").innerHTML = "Grave";
        break;

    case bpmcount >= 40 && bpmcount < 60:

        document.getElementById("bpmname").innerHTML = "Lento";
        break;

    case bpmcount >= 60 && bpmcount < 80:

        document.getElementById("bpmname").innerHTML = "Andante";
        break;
    
    case bpmcount >= 80 && bpmcount < 100:

        document.getElementById("bpmname").innerHTML = "Moderato";
        break;
    
    case bpmcount >= 100 && bpmcount < 120:

        document.getElementById("bpmname").innerHTML = "Allegretto";
        break;

    case bpmcount >= 120 && bpmcount < 150:

        document.getElementById("bpmname").innerHTML = "Allegro";
        break;

    case bpmcount >= 150 && bpmcount < 180:

        document.getElementById("bpmname").innerHTML = "Vivace";
        break;

    case bpmcount >= 190 && bpmcount < 200:

        document.getElementById("bpmname").innerHTML = "Presto";
        break;
    
    case bpmcount => 200:

        document.getElementById("bpmname").innerHTML = "Prestissimo";
        break;

    default:
    
        break;

}
