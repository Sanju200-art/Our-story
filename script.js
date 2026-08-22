/* =========================================
   OUR STORY ❤️
   COMPLETE SCRIPT
========================================= */


/* =========================================
   GET ELEMENTS
========================================= */

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById("musicButton");

const readyButton =
    document.getElementById("readyButton");

const continue1 =
    document.getElementById("continue1");

const continue2 =
    document.getElementById("continue2");

const continue3 =
    document.getElementById("continue3");


const screen1 =
    document.getElementById("screen1");

const screen2 =
    document.getElementById("screen2");

const screen3 =
    document.getElementById("screen3");

const screen4 =
    document.getElementById("screen4");

const screen5 =
    document.getElementById("screen5");


/* =========================================
   CHANGE SCREEN
========================================= */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(function(item) {

            item.classList.remove("active");

        });


    screen.classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}


/* =========================================
   MUSIC
========================================= */

let musicStarted = false;


function startMusic() {

    music.play()
        .then(function() {

            musicStarted = true;

            musicButton.innerHTML =
                "🎵 Music Playing ❤️";

        })
        .catch(function() {

            musicButton.innerHTML =
                "🎵 Tap Again for Music";

        });

}


/* MUSIC BUTTON */

musicButton.addEventListener(
    "click",
    function() {

        startMusic();

    }
);


/* =========================================
   ARE YOU READY
========================================= */

readyButton.addEventListener(
    "click",
    function() {

        /*
           The browser allows music
           after this user interaction.
        */

        startMusic();

        showScreen(screen2);

    }
);


/* =========================================
   8 OCTOBER
   → FIRST DATE
========================================= */

continue1.addEventListener(
    "click",
    function() {

        startMusic();

        showScreen(screen3);

    }
);


/* =========================================
   FIRST DATE
   → 2 NOVEMBER
========================================= */

continue2.addEventListener(
    "click",
    function() {

        startMusic();

        showScreen(screen4);

    }
);


/* =========================================
   2 NOVEMBER
   → NEXT PHASE
========================================= */

continue3.addEventListener(
    "click",
    function() {

        startMusic();

        showScreen(screen5);

    }
);
