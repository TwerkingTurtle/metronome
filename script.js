const taksound = new Audio("/tak.mp3");
var isplaying = false;
var metronome = null;

/*
// add sequencer!!

var seqname = document.getElementById("name").innerHTML;
var seqmeasure = document.getElementById("totalmeasure").innerHTML;
*/

var beatcount = 0;
var beatplus = 0;
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
        
        beatcount = 0;
        beatplus = 0;
        beatmeasures = 2;

        for (let dot of document.getElementsByClassName("dot")) { dot.style.backgroundColor = "#A8C69F"; }
        
    } else {

        isplaying = true;

        document.getElementById("player").innerHTML = "STOP";
        document.getElementById("player").style.backgroundColor = "#FF6B6B";
        document.getElementById("player").style.borderColor = "#FF9191";
        
        metronome = setInterval(function() {
            
            taksound.play();

            if ( beatcount < Number( document.getElementById("timesig").innerHTML.slice( 0, document.getElementById("timesig").innerHTML.indexOf("/") ) ) || beatplus % 2 == 1 ) {

                if ( beatcount != 0 ) { document.getElementById(beatcount).style.backgroundColor = "#A8C69F"; }

                override += 4 / Number( document.getElementById("beatsperbeat").innerHTML.replace("<br>", "") );

                if ( override >= 1 ) { override = 0; beatcount += 1; }
                
                if ( beatcount == 0 ) { beatcount += 1; override = 0; }

                beatplus++;

                document.getElementById(beatcount).style.backgroundColor = "#00171F";

                document.getElementById("beats").children[beatplus].scrollIntoView({ behavior: "smooth", block: "center" });

            } else {

                document.getElementById(beatcount).style.backgroundColor = "#A8C69F";

                beatcount = 1;
                beatplus = 1;
                override = 0;

                document.getElementById(beatcount).style.backgroundColor = "#00171F";
                
                document.getElementById("beats").children[beatcount - 1].scrollIntoView({ block: "center" });
                document.getElementById("beats").children[beatplus].scrollIntoView({ behavior: "smooth", block: "center" });

                beatmeasures += 1;

                document.getElementById("measures").innerHTML += `<text>${beatmeasures}</text>`;
                document.getElementById("measures").children[beatmeasures - 2].scrollIntoView({ behavior: "smooth", block: "center" });

            }

            /*

                SIMPLE TIME

                [ requires support for different toned beat sounds ]

                add support for breve beats             N
                add support for semibreve beats         N
                add support for minim beats             N

                add support for crotchet beats          Y
                add support for quaver beats            Y

                add support for triplet beats           N
                add support for semiquaver beats        N

            */

        }, 60000/Number(document.getElementById("bpmcount").innerHTML)/Number(document.getElementById("timesig").innerHTML.slice(document.getElementById("timesig").innerHTML.indexOf("/") + 1, document.getElementById("timesig").innerHTML.length))*4/Number( document.getElementById("beatsperbeat").innerHTML.replace("<br>", "") )*4);
            // 60s / bpm / type of beat * 4 / beat type * 4

    }

}

function makebabies() {

    document.getElementById("dots").innerHTML = "";
    document.getElementById("beats").innerHTML = "";

    for ( let i = 0; i < Number( document.getElementById("timesig").innerHTML.slice( 0, document.getElementById("timesig").innerHTML.indexOf("/") ) ); i++ ) {

        document.getElementById("dots").innerHTML += `<span class = "dot" id = "${i+1}"></span>`;

    }

    for ( let i = 0; i < Number( document.getElementById("timesig").innerHTML.slice( 0, document.getElementById("timesig").innerHTML.indexOf("/") ) ) + 1; i++ ) {

        // new implementation [ not working ]
        document.getElementById("beats").innerHTML += `<text style = "font-size: 20px;">${i}</text>`;
        if ( document.getElementById("beatsperbeat").innerHTML != 4 && i != 0 ) { document.getElementById("beats").innerHTML += `<text style = "font-size: 20px;">+</text>`; }

    }

}

// fix this shit
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
